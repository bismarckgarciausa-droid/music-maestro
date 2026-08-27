import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { seedWorks } from "./data";
import type { Work } from "./types";

interface CatalogContextValue {
  works: Work[];
  getWork: (id: string) => Work | undefined;
  addWork: (work: Work) => void;
  updateWork: (id: string, updater: (work: Work) => Work) => void;
  logActivity: (id: string, label: string) => void;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [works, setWorks] = useState<Work[]>(seedWorks);

  const updateWork = useCallback((id: string, updater: (work: Work) => Work) => {
    setWorks((prev) => prev.map((w) => (w.id === id ? updater(w) : w)));
  }, []);

  const logActivity = useCallback((id: string, label: string) => {
    setWorks((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              activity: [
                {
                  id: `${id}-${Date.now()}`,
                  group: "Today",
                  time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
                  label,
                },
                ...w.activity,
              ],
            }
          : w,
      ),
    );
  }, []);

  const value = useMemo<CatalogContextValue>(
    () => ({
      works,
      getWork: (id) => works.find((w) => w.id === id),
      addWork: (work) => setWorks((prev) => [work, ...prev]),
      updateWork,
      logActivity,
    }),
    [works, updateWork, logActivity],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used inside CatalogProvider");
  return ctx;
}
