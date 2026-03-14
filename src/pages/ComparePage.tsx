import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { getTechBySlug, technologies, Technology } from "@/data/technologies";
import { useCompare } from "@/hooks/useCompare";
import { TechCard } from "@/components/TechCard";
import { ArrowLeft, GitCompare, Info, LayoutGrid } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ComparePage = () => {
  const [searchParams] = useSearchParams();
  const techSlugs = searchParams.get("techs")?.split(",").filter(Boolean) || [];
  const { items } = useCompare();
  const navigate = useNavigate();

  const techsToCompare: Technology[] = techSlugs.length > 0
    ? techSlugs.map(s => getTechBySlug(s)).filter((t): t is Technology => !!t)
    : items;

  if (techsToCompare.length < 2) {
    return (
      <div className="space-y-12 animate-fade-in pb-20">
        <PageHero 
          icon={GitCompare}
          badge="Architectural Comparison"
          description="Multi-dimensional technical evaluation of candidate assets."
          theme="blue"
          className="py-6 md:py-8"
        >
          <Button variant="outline" onClick={() => navigate("/")} className="rounded-xl border-white/10 h-11 px-6 font-black text-[10px] uppercase tracking-widest text-[#210c6e] hover:bg-slate-50">
            <LayoutGrid className="mr-2 h-4 w-4" /> Reset Directory
          </Button>
        </PageHero>

        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <div className="space-y-1">
              <h2 className="text-xl font-black tracking-tightest uppercase italic">Top Candidates</h2>
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Recommended baseline technologies</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {technologies.slice(0, 8).map((tech, i) => (
              <TechCard key={tech.id} tech={tech} index={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const fields = [
    { label: "Classification", render: (t: Technology) => t.type },
    { label: "First Release", render: (t: Technology) => String(t.releaseYear) },
    { label: "Asset Owner", render: (t: Technology) => t.creator },
    { label: "Stable Build", render: (t: Technology) => t.currentVersion || "—" },
    { label: "Runtime Path", render: (t: Technology) => t.language || "—" },
    { label: "Proprietaries", render: (t: Technology) => (t.features || []).join(", ") || "—" },
    { label: "Advantages", icon: "text-emerald-500", render: (t: Technology) => (t.advantages || []).join(", ") || "—" },
    { label: "Risk Factors", icon: "text-rose-500", render: (t: Technology) => (t.disadvantages || []).join(", ") || "—" },
    { label: "Target Profile", render: (t: Technology) => (t.useCases || []).join(", ") || "—" },
    { label: "Adoption Hub", render: (t: Technology) => t.communitySize || "—" },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PageHero 
        icon={GitCompare}
        badge="Architectural Comparison"
        description="Multi-dimensional technical evaluation of candidate assets."
        theme="blue"
        className="py-4 md:py-5"
      />

      <div className="flex justify-end">
        <Button variant="outline" onClick={() => navigate(-1)} className="rounded-xl border-border/40 h-11 px-6 font-black text-[10px] uppercase tracking-widest">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>

      <div className="rounded-[2rem] overflow-hidden border border-border/40 bg-white/50 dark:bg-slate-950/20 shadow-soft">
        <div className="overflow-x-auto overflow-y-hidden custom-scrollbar">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-border/40">
                <th className="text-left p-6 font-black text-slate-300 text-[9px] uppercase tracking-[0.3em] min-w-[200px]">
                  Dimensionality
                </th>
                {techsToCompare.map(tech => (
                  <th key={tech.id} className="text-left p-6 min-w-[300px] border-l border-border/40">
                    <div className="flex flex-col gap-2">
                        <span className="text-lg font-black text-foreground uppercase tracking-tight">{tech.name}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary/60">{tech.type}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {fields.map((field, i) => (
                <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="p-6 font-black text-slate-300 text-[9px] uppercase tracking-widest bg-slate-50/10 flex items-center gap-2">
                    <Info className={cn("h-3 w-3 opacity-20", field.icon)} />
                    {field.label}
                  </td>
                  {techsToCompare.map(tech => (
                    <td key={tech.id} className="p-6 border-l border-border/20 text-[13px] font-medium text-foreground/70 leading-relaxed">
                      {field.render(tech)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
