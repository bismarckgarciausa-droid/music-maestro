export type WorkType = "Single" | "Album track" | "EP track" | "Instrumental";

export interface Writer {
  name: string;
  /** null = share not yet assigned */
  share: number | null;
  ipi?: string;
  publisher?: string;
}

export interface Composition {
  writers: Writer[];
  publisher?: string;
  publisherShares?: { name: string; share: number }[];
  pro?: string;
  iswc?: string;
  registered: boolean;
  registrationHistory: { date: string; label: string }[];
}

export interface MasterOwner {
  name: string;
  share: number;
}

export interface Recording {
  artist: string;
  version: string;
  isrc?: string;
  audioAttached: boolean;
  masterOwners: MasterOwner[];
  distributed: boolean;
}

export interface Release {
  status: "Planned" | "Released" | "Not released";
  date?: string;
  upc?: string;
  distributor?: string;
  platforms: string[];
  metadataComplete: boolean;
}

export interface ActivityEntry {
  id: string;
  group: string;
  time: string;
  label: string;
}

export interface Work {
  id: string;
  cstId: string;
  title: string;
  primaryArtist: string;
  type: WorkType;
  composition?: Composition;
  recording?: Recording;
  release?: Release;
  activity: ActivityEntry[];
}

export type SectionKey = "identity" | "rights" | "registration" | "distribution";

export type IssueSeverity = "critical" | "high" | "medium";

export interface Issue {
  code: string;
  label: string;
  detail: string;
  severity: IssueSeverity;
  section: SectionKey;
  /** where to send the user to fix it */
  tab: "overview" | "composition" | "recording" | "release" | "rights" | "registration" | "distribution";
}

export interface SectionScore {
  key: SectionKey;
  label: string;
  score: number;
  checks: { label: string; ok: boolean }[];
}

export interface WorkHealth {
  score: number;
  sections: SectionScore[];
  issues: Issue[];
  nextAction: Issue | null;
}
