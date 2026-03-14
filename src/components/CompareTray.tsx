import { useCompare } from "@/hooks/useCompare";
import { Link } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";

export function CompareTray() {
  const { items, removeItem, clearAll, isOpen } = useCompare();

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-12 left-0 right-0 z-30 lg:left-60 animate-slide-up">
      <div className="mx-4 mb-2 bg-card border border-border rounded-lg p-3 flex items-center gap-3">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider shrink-0">Compare</span>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {items.map(tech => (
            <div key={tech.id} className="flex items-center gap-1.5 bg-secondary rounded-md px-2.5 py-1 text-xs text-secondary-foreground font-medium">
              <span className="truncate max-w-[100px]">{tech.name}</span>
              <button onClick={() => removeItem(tech.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {items.length < 3 && (
            <span className="text-[10px] text-muted-foreground/50 font-mono">+{3 - items.length} slot{3 - items.length > 1 ? "s" : ""}</span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground transition-colors">Clear</button>
          {items.length >= 2 && (
            <Link
              to={`/compare?techs=${items.map(t => t.slug).join(",")}`}
              className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-1"
            >
              Compare <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
