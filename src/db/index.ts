export const DB_ENABLED = import.meta.env.VITE_ENABLE_DB === "true";

// Minimal shape used in code paths we saw
type Toast = (o: {
  title: string;
  description?: string;
  variant?: "destructive" | "default";
}) => void;

export function requireDB(toast?: Toast) {
  if (DB_ENABLED) return;
  toast?.({
    title: "Database disabled",
    description: "Running in no-DB mode",
    variant: "destructive",
  });
  throw new Error("DB_DISABLED");
}
