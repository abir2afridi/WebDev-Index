import { useState } from "react";
import { Link } from "react-router-dom";
import { categories, technologies } from "@/data/technologies";
import { useTechnologies } from "@/hooks/useTechnologies";
import { ArrowRight, Globe, LayoutGrid, Database, Cpu, Activity, Shield, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LiveTicker } from "@/components/LiveTicker";
import { useLanguage } from "@/hooks/useLanguage";

const Index = () => {
  const { getTechsByCategory } = useTechnologies();
  const { t } = useLanguage();
  const totalTechs = technologies.length;

  const sortedCategories = categories
    .map(cat => ({ ...cat, count: getTechsByCategory(cat.id).length }));

  const populatedCategories = sortedCategories.filter(c => c.count > 0);

  return (
    <div className="space-y-16 animate-fade-in pb-32">
      
      {/* ─── SYSTEM HERO ─── */}
      <section className="relative py-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,var(--primary-light),transparent_70%)] opacity-10 pointer-events-none" />
        <div className="relative text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-border/40 text-[13px] font-black uppercase tracking-[0.4em] text-slate-700 dark:text-slate-200">
            <Activity className="size-4 text-primary" />
            Global Tech Intelligence Registry
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tightest leading-none text-slate-900 dark:text-white">
              Architectural <span className="text-primary">Intelligence</span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed uppercase tracking-tight italic px-10">
              Systematic categorization of core engineering assets, frameworks, and technological paradigms for modern infrastructure development.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
             <Link to="/ranking" className="group">
               <div className="h-11 px-8 rounded-lg bg-[#210c6e] hover:bg-[#210c6e]/90 text-white font-black text-[13px] uppercase tracking-widest shadow-xl shadow-primary/10 transition-all flex items-center justify-center">
                 Access Rankings <TrendingUp className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
               </div>
             </Link>
             <Link to="/roadmaps" className="group">
               <div className="h-11 px-8 rounded-lg bg-white dark:bg-slate-900 border border-border text-slate-900 dark:text-white font-black text-[13px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center">
                 Strategy View <ArrowRight className="ml-2 size-4" />
               </div>
             </Link>
          </div>
        </div>
      </section>

      <LiveTicker />

      {/* ─── DOMAIN GRID ─── */}
      <section className="space-y-12">
        <div className="flex items-center justify-between px-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2 px-1">
                <div className="h-0.5 w-4 bg-primary rounded-full" />
                <h2 className="text-[15px] font-black uppercase tracking-[0.4em] text-slate-900 dark:text-slate-100">{t("index.coreDomains")}</h2>
              </div>
              <p className="text-[13px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest pl-7">{t("index.techSectors")}</p>
            </div>
           <Badge variant="outline" className="h-9 px-6 border-border/40 text-[13px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-900/50">
             {categories.length} {t("sidebar.units")}
           </Badge>
        </div>
  
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {populatedCategories.map((cat) => (
            <Link key={cat.id} to={`/category/${cat.slug}`} className="group relative">
              <div className="relative h-full p-6 rounded-lg border border-border/60 bg-white dark:bg-[#111318] hover:border-primary/40 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 overflow-hidden">
                <div className="size-14 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-border/10 text-slate-500 group-hover:text-primary group-hover:bg-primary/5 transition-all flex items-center justify-center mb-6">
                  {cat.icon ? <img src={cat.icon} alt="" className="size-8 grayscale group-hover:grayscale-0 transition-all duration-500" /> : <LayoutGrid className="size-6" />}
                </div>
                <h3 className="text-[17px] font-black tracking-widest group-hover:text-primary transition-colors uppercase leading-tight mb-4 italic">{cat.name}</h3>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/10">
                   <span className="text-[13px] font-black text-slate-500 dark:text-slate-400 italic uppercase">{t("sidebar.units")}</span>
                   <span className="text-[18px] font-black text-primary italic tabular-nums">{cat.count}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
  
      {/* ─── GLOBAL REGISTRY ─── */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 py-6 border-b border-border/40">
            <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <div className="h-0.5 w-4 bg-primary rounded-full" />
                  <h2 className="text-[15px] font-black uppercase tracking-[0.4em] text-slate-900 dark:text-slate-100">{t("index.globalRegistry")}</h2>
                </div>
                <div className="flex items-center gap-3">
                   <span className="text-[13px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">{t("index.verifiedAssets")}</span>
                  <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
            </div>
          <div className="flex items-center gap-3">
             <Badge className="bg-primary text-white border-none text-[14px] font-black h-10 px-8 rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20">
                {totalTechs} {t("index.indexEntries")}
             </Badge>
          </div>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {technologies.map((tech) => (
            <Link key={tech.id} to={`/tech/${tech.slug}`}
              className="flex items-center gap-5 p-5 rounded-lg border border-border/40 bg-white dark:bg-[#0f1115] hover:bg-white dark:hover:bg-slate-900 transition-all hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1 group">
              
              <div className="size-12 flex items-center justify-center p-2 shrink-0 opacity-80 group-hover:opacity-100 transition-all bg-slate-50 dark:bg-slate-800 rounded-lg border border-border/10">
                {tech.logo ? (
                  <img src={tech.logo} alt={tech.name} className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                ) : (
                  <div className="size-full flex items-center justify-center font-black text-base text-slate-600 dark:text-slate-300 uppercase italic">
                    {tech.name[0]}
                  </div>
                )}
              </div>
              
              <div className="min-w-0 flex-1">
                 <div className="flex items-center justify-between gap-2">
                  <span className="font-black text-[18px] text-slate-900 dark:text-white group-hover:text-primary transition-colors tracking-tight truncate uppercase italic">{tech.name}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[14px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{tech.type}</span>
                  <span className="size-1 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <span className="text-[14px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tight tabular-nums italic">EST. {tech.releaseYear}</span>
                </div>
              </div>

              <div className="size-8 rounded-lg flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-300 group-hover:bg-primary group-hover:text-white transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4">
                <ArrowRight className="size-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── SYSTEM STATUS FOOTER ─── */}
      <section className="pt-24 border-t border-border/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 p-12 lg:p-16 rounded-xl bg-slate-50 dark:bg-[#0f1115] border border-border/40 overflow-hidden relative shadow-inner">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Database className="size-64" />
           </div>
           <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                 <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Shield className="size-6 text-primary" />
                 </div>
                  <h3 className="text-[15px] font-black uppercase tracking-[0.3em] italic text-slate-900 dark:text-slate-100">{t("index.dataIntegrity")}</h3>
              </div>
              <p className="text-[13px] font-bold text-slate-600 dark:text-slate-300 uppercase leading-relaxed tracking-wider italic">
                 {t("index.integrityDesc")}
              </p>
           </div>
           <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                 <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Cpu className="size-6 text-primary" />
                 </div>
                  <h3 className="text-[15px] font-black uppercase tracking-[0.3em] italic text-slate-900 dark:text-slate-100">{t("index.coreProcessing")}</h3>
              </div>
              <p className="text-[13px] font-bold text-slate-600 dark:text-slate-300 uppercase leading-relaxed tracking-wider italic">
                 {t("index.processingDesc")}
              </p>
           </div>
           <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                 <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Activity className="size-6 text-primary" />
                 </div>
                  <h3 className="text-[15px] font-black uppercase tracking-[0.3em] italic text-slate-900 dark:text-slate-100">{t("index.activeMonitoring")}</h3>
              </div>
              <p className="text-[13px] font-bold text-slate-600 dark:text-slate-300 uppercase leading-relaxed tracking-wider italic">
                 {t("index.monitoringDesc")}
              </p>
           </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
