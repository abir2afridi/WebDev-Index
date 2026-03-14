import { useParams, Link, useNavigate } from "react-router-dom";
import { getCategoryById } from "@/data/technologies";
import { useTechnologies } from "@/hooks/useTechnologies";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useCompare } from "@/hooks/useCompare";
import { useLanguage } from "@/hooks/useLanguage";
import { 
  Terminal,
  Bookmark,
  ArrowLeft,
  Copy,
  History,
  ArrowRight,
  Layers,
  Award,
  Zap,
  TriangleAlert,
  Users,
  GraduationCap,
  TrendingUp,
  Shield,
  ShieldCheck,
  ChevronRight,
  Globe,
  Github,
  BookOpen,
  FileText,
  Calendar,
  Cpu,
  Code2,
  Check,
  Plus,
  Box,
  Binary,
  GitBranch,
  ExternalLink,
  Target,
  LayoutGrid
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TechDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getTechBySlug } = useTechnologies();
  const tech = getTechBySlug(slug || "");
  const category = tech ? getCategoryById(tech.categoryId) : undefined;
  
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { addItem, removeItem, isInCompare } = useCompare();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (!tech) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <div className="size-20 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 flex items-center justify-center mb-6">
           <Terminal className="size-10 text-slate-300" />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-widest text-slate-500 italic">{t("tech.errorTitle")}</h1>
        <Button variant="link" onClick={() => navigate("/")} className="text-sm uppercase font-black text-primary mt-4">{t("tech.returnHome")}</Button>
      </div>
    );
  }

  const isBook = isBookmarked(tech.id);
  const inCompare = isInCompare(tech.id);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t("tech.sync"), {
       className: "font-black text-xs uppercase tracking-widest bg-slate-900 text-white border-none",
    });
  };

  const SpecItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-border/60">
      <div className="size-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-border/10">
        <Icon className="size-4 text-slate-600 dark:text-slate-400" />
      </div>
      <div className="min-w-0">
        <p className="text-[12px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-[0.2em] leading-none mb-1">{label}</p>
        <p className="text-[16px] font-black uppercase italic tracking-tight text-slate-900 dark:text-slate-100 truncate">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in relative pb-20">
      
      {/* ─── TECHNICAL HEADER ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/40">
        <div className="space-y-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-primary transition-all group/back"
          >
            <ArrowLeft className="size-3.5 group-hover/back:-translate-x-1 transition-transform" />
            {t("nav.back") || "Back"}
          </button>
          <div className="flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.3em] text-primary/80">
            <Link to="/" className="hover:text-primary transition-colors">{t("nav.overview")}</Link>
            <ChevronRight className="size-3 opacity-30" />
            <span className="text-slate-600 dark:text-slate-200">{tech.type}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-none">{tech.name}</h1>
            <Badge variant="secondary" className="w-fit bg-primary/10 text-primary border-primary/20 text-[13px] font-black px-3 py-1 uppercase tracking-widest">{tech.currentVersion || "LTS"}</Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {tech.officialWebsite && (
            <Button variant="outline" size="sm" asChild className="h-10 rounded-xl px-5 border-border/40 bg-white dark:bg-slate-950 text-[11px] font-black uppercase tracking-widest group/link">
              <a href={tech.officialWebsite} target="_blank" rel="noopener noreferrer">
                <Globe className="size-3.5 mr-2 text-primary group-hover/link:scale-110 transition-transform" />
                Official
              </a>
            </Button>
          )}
          {tech.githubUrl && (
            <Button variant="outline" size="sm" asChild className="h-10 rounded-xl px-5 border-border/40 bg-white dark:bg-slate-950 text-[11px] font-black uppercase tracking-widest group/link">
              <a href={tech.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="size-3.5 mr-2 text-primary group-hover/link:scale-110 transition-transform" />
                GitHub
              </a>
            </Button>
          )}
          {tech.documentationUrl && (
            <Button variant="outline" size="sm" asChild className="h-10 rounded-xl px-5 border-border/40 bg-white dark:bg-slate-950 text-[11px] font-black uppercase tracking-widest group/link">
              <a href={tech.documentationUrl} target="_blank" rel="noopener noreferrer">
                <BookOpen className="size-3.5 mr-2 text-primary group-hover/link:scale-110 transition-transform" />
                Docs
              </a>
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => inCompare ? removeItem(tech.id) : addItem(tech)}
            className={cn(
               "h-10 rounded-xl text-[11px] font-black uppercase tracking-widest px-5 transition-all",
               inCompare ? "bg-primary text-white border-primary" : "text-slate-600 dark:text-slate-400 hover:border-primary/40 bg-white dark:bg-slate-900"
            )}
          >
            {inCompare ? <Check className="mr-2 size-3.5" /> : <Layers className="mr-2 size-3.5" />}
            {inCompare ? "Active Analysis" : "Analyze"}
          </Button>
          <button 
            onClick={() => toggleBookmark(tech.id)}
            className={cn(
               "size-10 rounded-xl flex items-center justify-center border transition-all active:scale-90",
               isBook ? "bg-slate-900 dark:bg-slate-100 dark:text-slate-900 border-transparent text-white" : "bg-white dark:bg-slate-900 border-border/40 text-slate-500 dark:text-slate-400"
            )}
          >
            <Bookmark className="size-4" fill={isBook ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* ─── CORE INTEL GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Span: Technical Overview (3/4) */}
        <div className="lg:col-span-3 space-y-6">
           
           {/* Segment: Overview Card */}
           <div className="grid grid-cols-1 md:grid-cols-10 gap-4 p-5 rounded-xl bg-white dark:bg-[#0f1115] border border-border/40 shadow-sm relative group overflow-hidden">
             <div className="md:col-span-2 flex justify-center md:block">
               <div className="size-24 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-5 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-transform hover:scale-105">
                  {tech.logo ? (
                    <img src={tech.logo} alt={tech.name} className="size-16" />
                  ) : (
                    <span className="text-2xl font-black text-primary italic leading-none">{tech.name[0]}</span>
                  )}
               </div>
             </div>
              <div className="md:col-span-8 space-y-2.5">
                <div className="flex items-center gap-2">
                   <Badge variant="outline" className="border-border/40 text-[12px] font-black uppercase tracking-widest h-6 px-3 bg-slate-50/50 dark:bg-slate-800/50 text-slate-700 dark:text-white">{tech.type}</Badge>
                   <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Asset ID: {tech.id?.slice(0, 8)}</span>
                </div>
                <p className="text-[16px] md:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug uppercase italic tracking-tight">
                  {t(`tech.${tech.id}.desc`) !== `tech.${tech.id}.desc` ? t(`tech.${tech.id}.desc`) : tech.shortDescription}
                </p>
                <p className="text-[14px] md:text-[16px] font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic border-l border-primary/20 pl-4 py-1">
                  {t(`tech.${tech.id}.history`) !== `tech.${tech.id}.history` ? t(`tech.${tech.id}.history`) : tech.history}
                </p>
             </div>
           </div>

           {/* Segment: Capability Grid */}
           <div className="space-y-3">
               <div className="flex items-center gap-2 px-1">
                  <div className="h-0.5 w-4 bg-primary rounded-full" />
                  <h2 className="text-[13px] font-black uppercase tracking-[0.3em] text-slate-800 dark:text-slate-100">{t("tech.capabilities")}</h2>
               </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {tech.features?.slice(0, 6).map((feat, i) => (
                    <div key={i} className="p-5 rounded-xl bg-white dark:bg-[#0f1115] border border-border/40 flex flex-col gap-2 group hover:border-primary/40 transition-all">
                      <span className="text-[15px] font-black uppercase italic tracking-tight text-slate-900 dark:text-slate-100">{feat}</span>
                      <div className="flex items-center justify-between opacity-70 group-hover:opacity-100 transition-opacity">
                         <span className="text-[12px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest leading-none">Module-0{i+1}</span>
                         <Zap className="size-3 text-primary" />
                      </div>
                    </div>
                  ))}
              </div>
           </div>

            {/* Segment: Deployment Sequence (Installation) */}
            {tech.installation && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                   <div className="h-0.5 w-4 bg-primary rounded-full" />
                   <h2 className="text-[13px] font-black uppercase tracking-[0.3em] text-slate-800 dark:text-slate-100">{t("tech.deploymentSequence")}</h2>
                </div>
                <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-dashed border-primary/20 flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Terminal className="size-5 text-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[15px] font-bold text-slate-800 dark:text-slate-200 uppercase italic leading-relaxed">
                      {tech.installation}
                    </p>
                    <div className="flex items-center gap-2 opacity-80">
                      <div className="size-1 bg-primary rounded-full animate-pulse" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-slate-100">Environment Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

           {/* Segment: Deployment Patterns */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                 <div className="flex items-center gap-2 px-1">
                  <div className="h-0.5 w-4 bg-primary rounded-full" />
                  <h2 className="text-[13px] font-black uppercase tracking-[0.3em] text-slate-800 dark:text-slate-100">{t("tech.strategicVectors")}</h2>
               </div>
                  <div className="p-5 rounded-xl bg-white dark:bg-[#0f1115] border border-border/40 space-y-3 min-h-[140px]">
                    {tech.useCases?.map((use, i) => (
                      <div key={i} className="flex gap-3 items-start group">
                         <div className="size-1.5 rounded-full bg-primary/30 mt-1.5 shrink-0 group-hover:bg-primary" />
                         <span className="text-[13px] font-bold text-slate-800 dark:text-slate-300 uppercase tracking-tight italic leading-tight">{use}</span>
                      </div>
                    ))}
                  </div>
              </div>
              <div className="space-y-3">
                 <div className="flex items-center gap-2 px-1">
                  <div className="h-0.5 w-4 bg-primary rounded-full" />
                  <h2 className="text-[13px] font-black uppercase tracking-[0.3em] text-slate-800 dark:text-slate-100">{t("tech.globalAdopters")}</h2>
               </div>
                 <div className="p-5 rounded-xl bg-white dark:bg-[#0f1115] border border-border/40 min-h-[140px]">
                    <div className="flex flex-wrap gap-1.5">
                        {tech.companiesUsing?.map((c, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-border/40 text-[11px] font-black uppercase italic text-slate-500 dark:text-slate-400 hover:text-primary transition-all">
                            {c}
                          </span>
                        ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* Segment: Source Fragment (Code) */}
           {tech.codeExample && (
             <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                   <div className="flex items-center gap-2">
                      <div className="h-0.5 w-4 bg-primary rounded-full" />
                      <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-600 dark:text-slate-200">{t("tech.techSignature")}</h2>
                   </div>
                   <button onClick={() => copyToClipboard(tech.codeExample || "")} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:opacity-70 transition-all">
                      <Copy className="size-3.5" /> Sync
                   </button>
                </div>
                <div className="rounded-xl bg-[#0d1117] border border-white/5 p-5 md:p-6 font-mono text-[13px] overflow-hidden relative shadow-lg group/code">
                   <pre className="text-slate-300 overflow-x-auto scrollbar-hide py-1 leading-[1.5]">
                      <code>{tech.codeExample}</code>
                   </pre>
                </div>
             </div>
           )}
        </div>

        {/* Right Span: Specification Sidebar (1/4) */}
        <aside className="space-y-6">
                      {/* Specifications Card */}
            <div className="space-y-3">
               <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-600 dark:text-slate-200 px-1">{t("tech.specs")}</h2>
              <div className="grid gap-2">
                 <SpecItem icon={History} label={t("tech.creator")} value={tech.creator} />
                 <SpecItem icon={Calendar} label={t("tech.releaseYear")} value={tech.releaseYear.toString()} />
                 <SpecItem icon={Binary} label={t("tech.languageBase")} value={tech.language || "N/A"} />
                 <SpecItem icon={GitBranch} label={t("tech.latestVersion")} value={tech.currentVersion || "LTS"} />
              </div>
           </div>

            {/* Performance Board */}
             <div className="p-6 rounded-xl bg-slate-900 border border-white/5 text-white space-y-5 shadow-xl relative overflow-hidden group">
               <div className="grid grid-cols-2 gap-4 relative z-10">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">{t("tech.momentum")}</p>
                    <div className="flex items-baseline gap-2">
                       <span className="text-3xl font-black italic tracking-tighter">{tech.marketShare || "24%"}</span>
                       <Badge className="bg-emerald-500 text-white border-none text-[10px] h-5 px-2 tabular-nums">+{tech.growth || "12"}%</Badge>
                    </div>
                 </div>
                 <div className="space-y-1 border-l border-white/20 pl-4">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">{t("tech.communityDepth")}</p>
                    <span className="text-xl font-black italic tracking-tight block truncate uppercase text-white">{tech.communitySize || "Global"}</span>
                 </div>
               </div>
               <p className="text-[12px] font-bold text-slate-400 uppercase italic tracking-tight leading-relaxed">
                  Architectural asset exhibiting high developmental velocity within its respective domain.
               </p>
            </div>

           {/* SWOT Card */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#0f1115] border border-border/40 space-y-6">
               <div className="space-y-3">
                  <div className="flex items-center gap-2">
                     <div className="h-0.5 w-4 bg-emerald-500 rounded-full" />
                     <h3 className="text-[11px] font-black uppercase tracking-widest text-emerald-500">{t("tech.advantages")}</h3>
                  </div>
                  <div className="grid gap-2.5">
                    {tech.advantages?.slice(0, 4).map((a, i) => (
                      <div key={i} className="flex gap-2.5 items-start">
                        <Check className="size-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-[12px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tight italic leading-tight">{a}</span>
                      </div>
                    ))}
                  </div>
              </div>
              <div className="h-px bg-border/20" />
               <div className="space-y-3">
                  <div className="flex items-center gap-2">
                     <div className="h-0.5 w-4 bg-rose-500 rounded-full" />
                     <h3 className="text-[11px] font-black uppercase tracking-widest text-rose-500">{t("tech.constraints")}</h3>
                  </div>
                  <div className="grid gap-2.5">
                    {tech.disadvantages?.slice(0, 4).map((d, i) => (
                      <div key={i} className="flex gap-2.5 items-start">
                        <Plus className="size-3.5 text-rose-500 mt-0.5 shrink-0 rotate-45" />
                        <span className="text-[12px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tight italic leading-tight">{d}</span>
                      </div>
                    ))}
                  </div>
              </div>
           </div>

            {/* Learning Portal Vector Cards */}
            <div className="space-y-3">
               <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-600 dark:text-slate-200 px-1">{t("tech.learningVectors")}</h2>
              <div className="grid gap-2.5">
                 {tech.learningResources?.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border/60 hover:border-primary/40 hover:bg-white transition-all group shadow-sm">
                     <div className="flex items-center gap-3">
                     <div className="size-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-primary transition-all border border-border/10">
                        <GraduationCap className="size-4.5" />
                     </div>
                     <span className="text-[13px] font-black uppercase italic tracking-tight text-slate-800 dark:text-slate-100">{r.title}</span>
                  </div>
                  <ArrowRight className="size-4 text-slate-300 group-hover:text-primary transition-all group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
           </div>

           {/* Trust Authority Badge */}
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-4">
               <Shield className="size-5 text-primary" />
               <div className="space-y-0.5">
                 <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary block">{t("tech.officialBadge")}</span>
                 <span className="text-[11px] font-bold text-slate-400 dark:text-slate-300 uppercase">{t("tech.verifiedIntegrity")}</span>
               </div>
            </div>

        </aside>
      </div>
    </div>
  );
};

export default TechDetailPage;
