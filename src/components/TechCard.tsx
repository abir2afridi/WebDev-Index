import { Technology, getCategoryById } from "@/data/technologies";
import { Link } from "react-router-dom";
import { useCompare } from "@/hooks/useCompare";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Heart, Check, ArrowRight, Bookmark, GitCompare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function TechCard({ tech, index = 0 }: { tech: Technology; index?: number }) {
  const { addItem, removeItem, isInCompare } = useCompare();
  const { toggleBookmark, toggleFavorite, isBookmarked, isFavorited } = useBookmarks();
  const inCompare = isInCompare(tech.id);
  const category = getCategoryById(tech.categoryId);
  const bookmarked = isBookmarked(tech.id);
  const favorited = isFavorited(tech.id);

  return (
    <div
      className="group relative flex flex-col rounded-xl border border-border bg-white dark:bg-[#1a1c1e] overflow-hidden transition-all duration-300 opacity-0 animate-fade-in hover:border-primary/50"
      style={{ animationDelay: `${index * 30}ms`, animationFillMode: "forwards" }}
    >
      {/* Action Buttons - Minimalist floating */}
      <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.preventDefault(); toggleFavorite(tech.id); }}
          className={cn(
            "p-1.5 rounded-lg transition-all",
            favorited ? "text-red-500" : "text-slate-300 hover:text-red-500"
          )}
        >
          <Heart className="size-4" fill={favorited ? "currentColor" : "none"} />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); toggleBookmark(tech.id); }}
          className={cn(
            "p-1.5 rounded-lg transition-all",
            bookmarked ? "text-primary" : "text-slate-300 hover:text-primary"
          )}
        >
          <Bookmark className="size-4" fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-5 flex flex-col h-full">
        {/* Header: Icon + Title Tight Integration */}
        <Link to={`/tech/${tech.slug}`} className="flex items-center gap-3 mb-4 group/link">
          <div className="shrink-0">
            {tech.logo ? (
              <img 
                src={tech.logo} 
                alt={tech.name} 
                className="size-11 object-contain transition-transform group-hover/link:scale-105" 
              />
            ) : (
              <div className="size-11 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-lg">
                <span className="font-black text-slate-700 dark:text-slate-400 text-lg">{tech.name[0]}</span>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-[19px] font-black tracking-tightest uppercase italic text-slate-900 dark:text-white truncate">
              {tech.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-black text-primary uppercase tracking-widest">{category?.shortName || category?.name}</span>
              <span className="size-1 rounded-full bg-slate-200" />
              <span className="text-[13px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-tighter">{tech.type}</span>
            </div>
          </div>
        </Link>

        {/* Description - High Visibility */}
        <p className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-5 line-clamp-2 leading-relaxed tracking-tight flex-1">
          {tech.shortDescription}
        </p>

        {/* Footer Actions - Optimized */}
        <div className="flex items-center gap-2 mt-auto">
          <Link to={`/tech/${tech.slug}`} className="flex-1">
            <Button 
              className="w-full h-9 rounded-lg bg-[#210c6e] hover:bg-[#210c6e]/90 text-white border-none font-black text-[11px] uppercase tracking-widest transition-all"
            >
              Analyze Detail
            </Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            onClick={() => inCompare ? removeItem(tech.id) : addItem(tech)}
            className={cn(
              "h-9 w-9 shrink-0 rounded-lg border-border",
              inCompare ? "bg-primary text-white border-primary" : "text-slate-400 hover:text-primary"
            )}
          >
            {inCompare ? <Check className="size-4" /> : <GitCompare className="size-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
