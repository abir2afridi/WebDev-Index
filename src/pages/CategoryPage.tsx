import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCategoryBySlug } from "@/data/technologies";
import { useTechnologies } from "@/hooks/useTechnologies";
import { TechCard } from "@/components/TechCard";
import { Search, ArrowLeft, Hash, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getTechsByCategory } = useTechnologies();
  const category = getCategoryBySlug(slug || "");
  const [sortBy, setSortBy] = useState<'name' | 'release' | 'growth'>('name');
  const navigate = useNavigate();

  const allTechs = useMemo(() => {
    if (!category) return [];
    return getTechsByCategory(category.id);
  }, [category, getTechsByCategory]);
  
  const filteredTechs = useMemo(() => {
    let result = [...allTechs];
    
    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'release') return (b.releaseYear || 0) - (a.releaseYear || 0);
      if (sortBy === 'growth') return (b.growth || 0) - (a.growth || 0);
      return 0;
    });

    return result;
  }, [allTechs, sortBy]);

  if (!category) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/5 flex items-center justify-center">
          <Hash className="h-8 w-8 text-destructive/40" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tightest uppercase italic">Missing Index</h1>
          <p className="text-muted-foreground/60 text-sm max-w-xs mx-auto font-medium">The requested category could not be verified in our current database.</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/")} className="rounded-xl px-6 h-11 font-black text-[10px] uppercase tracking-widest">
          <ArrowLeft className="mr-2 h-4 w-4" /> Reset Directory
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      {/* Refined Category Header */}
      <section className="relative py-12">
        <div className="flex flex-col md:flex-row gap-10 items-start justify-between">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-primary/70">
              <Layers className="h-3 w-3" />
              Categorical Domain
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black tracking-tightest leading-tight text-slate-900 dark:text-slate-100 italic uppercase">
                {category.name}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground/60 font-medium max-w-2xl leading-relaxed italic uppercase tracking-tight">
                {category.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-10 pt-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Registry Count</span>
                <div className="text-2xl font-black text-slate-900 dark:text-slate-100 tabular-nums uppercase">
                  {allTechs.length} <span className="text-[10px] text-slate-300">Units</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Coverage</span>
                <div className="text-2xl font-black text-slate-900 dark:text-slate-100 tabular-nums uppercase">
                  Global <span className="text-[10px] text-slate-300">Hub</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-3">
            <Button className="h-14 px-10 rounded-2xl bg-primary text-white font-black text-[11px] uppercase tracking-widest hover:translate-y-[-2px] transition-all shadow-xl shadow-primary/20">
              Contribute Data
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-12 rounded-xl border-border/40 font-black text-[10px] uppercase tracking-widest">
                Export
              </Button>
              <Button variant="outline" className="h-12 rounded-xl border-border/40 font-black text-[10px] uppercase tracking-widest">
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sort Controls Only - Premium Glass Bar */}
      <div className="sticky top-0 z-30 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 py-4 bg-white/60 dark:bg-slate-950/60 backdrop-blur-2xl border-y border-border/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Sort Intelligence</span>
          <div className="h-4 w-px bg-border/20 mx-2" />
          <div className="flex bg-slate-100/50 dark:bg-slate-900/50 p-1.5 rounded-xl border border-border/10">
            {['release', 'growth', 'name'].map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s as any)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  sortBy === s 
                    ? "bg-white dark:bg-slate-800 text-primary shadow-sm" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic">
          Showing <span className="text-primary italic">{filteredTechs.length}</span> verified results
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-8">
        {filteredTechs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
            <div className="size-20 rounded-[2rem] bg-slate-50 dark:bg-slate-900 flex items-center justify-center border border-border/40 text-slate-200">
              <Search className="size-10" />
            </div>
            <div className="space-y-1">
                <h3 className="text-xl font-black tracking-tightest uppercase italic">No Matches Found</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Please adjust your filtration parameters</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTechs.map((tech, i) => (
              <TechCard key={tech.id} tech={tech} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
