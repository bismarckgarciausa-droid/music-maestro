import type { Issue, SectionScore, Work, WorkHealth } from "./types";

const pct = (checks: { ok: boolean }[]) =>
  checks.length === 0 ? 0 : Math.round((checks.filter((c) => c.ok).length / checks.length) * 100);

export function splitsTotal(work: Work): number {
  if (!work.composition) return 0;
  return work.composition.writers.reduce((sum, w) => sum + (w.share ?? 0), 0);
}

export function masterTotal(work: Work): number {
  if (!work.recording) return 0;
  return work.recording.masterOwners.reduce((sum, o) => sum + o.share, 0);
}

export function evaluateWork(work: Work): WorkHealth {
  const comp = work.composition;
  const rec = work.recording;
  const rel = work.release;

  const identity: SectionScore = {
    key: "identity",
    label: "Identity",
    score: 0,
    checks: [
      { label: "Title", ok: Boolean(work.title) },
      { label: "Primary artist", ok: Boolean(work.primaryArtist) },
      { label: "Type", ok: Boolean(work.type) },
    ],
  };

  const rightsChecks = [
    { label: "Writers", ok: Boolean(comp && comp.writers.length > 0) },
    { label: "Splits", ok: Boolean(comp && splitsTotal(work) === 100) },
    { label: "Publisher", ok: Boolean(comp?.publisher) },
    { label: "Master ownership", ok: Boolean(rec && masterTotal(work) === 100) },
  ];
  const rights: SectionScore = { key: "rights", label: "Rights", score: 0, checks: rightsChecks };

  const registration: SectionScore = {
    key: "registration",
    label: "Registration",
    score: 0,
    checks: [
      { label: "PRO", ok: Boolean(comp?.pro) },
      { label: "ISWC", ok: Boolean(comp?.iswc) },
      { label: "IPI", ok: Boolean(comp?.writers.some((w) => w.ipi)) },
      { label: "Registration status", ok: Boolean(comp?.registered) },
    ],
  };

  const distribution: SectionScore = {
    key: "distribution",
    label: "Distribution",
    score: 0,
    checks: [
      { label: "ISRC", ok: Boolean(rec?.isrc) },
      { label: "UPC", ok: Boolean(rel?.upc) },
      { label: "Distributor", ok: Boolean(rel?.distributor) },
      { label: "Release status", ok: rel?.status === "Released" },
    ],
  };

  const sections = [identity, rights, registration, distribution].map((s) => ({
    ...s,
    score: pct(s.checks),
  }));

  const issues: Issue[] = [];
  const add = (i: Issue) => issues.push(i);

  if (comp && comp.writers.length === 0)
    add({
      code: "writers_missing",
      label: "Composition ownership incomplete",
      detail: "The composition exists but no writers have been added.",
      severity: "critical",
      section: "rights",
      tab: "composition",
    });

  if (comp && comp.writers.length > 0 && splitsTotal(work) !== 100)
    add({
      code: "splits_incomplete",
      label: "Splits are incomplete",
      detail: `Writer splits total ${splitsTotal(work)}%. The composition cannot be fully registered until ownership is confirmed.`,
      severity: "critical",
      section: "rights",
      tab: "composition",
    });

  if (rec && masterTotal(work) !== 100)
    add({
      code: "master_ownership",
      label: "Master ownership missing",
      detail: "The recording exists but ownership has not been confirmed.",
      severity: "critical",
      section: "rights",
      tab: "recording",
    });

  if (rec && !rec.isrc)
    add({
      code: "isrc_missing",
      label: rec.distributed ? "Distributed without ISRC" : "Missing ISRC",
      detail: rec.distributed
        ? "This recording is distributed but has no ISRC. Royalty data cannot be matched."
        : "The recording exists but has no ISRC.",
      severity: rec.distributed ? "critical" : "high",
      section: "distribution",
      tab: "recording",
    });

  if (comp && !comp.registered)
    add({
      code: "registration_missing",
      label: "Missing composition registration",
      detail:
        rec?.distributed
          ? "The song is already distributed, but its composition is not registered."
          : "The composition has not been registered with a PRO.",
      severity: "high",
      section: "registration",
      tab: "registration",
    });

  if (comp?.registered && !comp.iswc)
    add({
      code: "iswc_missing",
      label: "Registration incomplete",
      detail: "The composition is registered but no ISWC has been captured.",
      severity: "high",
      section: "registration",
      tab: "registration",
    });

  if (rel && !rec)
    add({
      code: "invalid_release",
      label: "Invalid release relationship",
      detail: "A release exists without a linked recording.",
      severity: "critical",
      section: "distribution",
      tab: "release",
    });

  if (rel && rel.status === "Released" && !rel.upc)
    add({
      code: "upc_missing",
      label: "Missing distribution metadata",
      detail: "The release is out but no UPC has been captured.",
      severity: "medium",
      section: "distribution",
      tab: "release",
    });

  if (rel && rel.status === "Released" && !rel.metadataComplete)
    add({
      code: "metadata_incomplete",
      label: "Missing distribution metadata",
      detail: "Release metadata is incomplete.",
      severity: "medium",
      section: "distribution",
      tab: "release",
    });

  if (!comp)
    add({
      code: "composition_missing",
      label: "No composition linked",
      detail: "This work has no composition. Publishing royalties cannot be claimed.",
      severity: "high",
      section: "rights",
      tab: "composition",
    });

  const order = { critical: 0, high: 1, medium: 2 } as const;
  issues.sort((a, b) => order[a.severity] - order[b.severity]);

  const score = Math.round(sections.reduce((sum, s) => sum + s.score, 0) / sections.length);

  return { score, sections, issues, nextAction: issues[0] ?? null };
}

export function workStatus(work: Work): "complete" | "attention" {
  return evaluateWork(work).issues.length === 0 ? "complete" : "attention";
}

export function catalogHealth(works: Work[]) {
  const evals = works.map(evaluateWork);
  const sectionAvg = (key: string) =>
    Math.round(
      evals.reduce((sum, e) => sum + (e.sections.find((s) => s.key === key)?.score ?? 0), 0) /
        Math.max(evals.length, 1),
    );
  return {
    overall: Math.round(evals.reduce((s, e) => s + e.score, 0) / Math.max(evals.length, 1)),
    identity: sectionAvg("identity"),
    rights: sectionAvg("rights"),
    registration: sectionAvg("registration"),
    distribution: sectionAvg("distribution"),
    issues: evals.flatMap((e) => e.issues),
  };
}
