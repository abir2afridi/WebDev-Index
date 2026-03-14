import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { technologies, categories } from "@/data/technologies";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Globe, Trophy, Zap, TrendingUp, Search, Info, Award, Star, Shield, Cpu, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TechCard } from "@/components/TechCard";
import PageHero from "@/components/PageHero";

const trendingTechs = [...technologies]
  .filter(t => t.releaseYear >= 2019)
  .sort((a, b) => b.releaseYear - a.releaseYear || (b.companiesUsing?.length || 0) - (a.companiesUsing?.length || 0))
  .slice(0, 8);

const RankingPage = () => {
  const { t } = useLanguage();
  const ranked = [...technologies].sort((a, b) => {
    const scoreA = (2025 - a.releaseYear) + (a.companiesUsing?.length || 0) * 3;
    const scoreB = (2025 - b.releaseYear) + (b.companiesUsing?.length || 0) * 3;
    return scoreB - scoreA;
  });

  const categoryTechCounts = categories
    .map(cat => ({ ...cat, count: technologies.filter(t => t.categoryId === cat.id).length }))
    .filter(c => c.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <PageHero 
        icon={Trophy}
        badge={t('ranking.heroBadge')}
        description={t('ranking.heroDesc')}
        theme="blue"
        className="py-4 md:py-5"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Velocity & Impact */}
        <div className="lg:col-span-1 space-y-12">
          {/* Trending Technologies */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 border-l-2 border-primary/20 pl-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <h2 className="text-lg font-black tracking-tightest uppercase italic">{t('ranking.velocity')}</h2>
                </div>
                <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest leading-none pl-10">{t('ranking.velocityDesc')}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1">
              {trendingTechs.map(tech => {
                const cat = categories.find(c => c.id === tech.categoryId);
                return (
                  <Link 
                    key={tech.id} 
                    to={`/tech/${tech.slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-slate-900 group transition-all border border-transparent hover:border-border/40 hover:shadow-xl hover:shadow-black/5"
                  >
                    <div className="size-10 flex items-center justify-center shrink-0">
                      {tech.logo ? (
                        <img src={tech.logo} alt="" className="h-full w-full object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <span className="font-black text-xs text-primary/20">{tech.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-[13px] text-slate-900 dark:text-slate-100 truncate group-hover:text-primary transition-colors uppercase">{tech.name}</span>
                        <span className="text-[10px] font-black tabular-nums text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">+{Math.floor(Math.random() * 20)+5}%</span>
                      </div>
                      <span className="text-[12px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">{cat?.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Ecosystem Coverage */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 border-l-2 border-orange-500/20 pl-4">
                <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <Globe className="h-4 w-4 text-orange-500" />
                    </div>
                    <h2 className="text-lg font-black tracking-tightest uppercase italic">{t('ranking.presence')}</h2>
                </div>
                <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest leading-none pl-10">{t('ranking.presenceDesc')}</p>
                </div>
            </div>
            <div className="space-y-5">
              {categoryTechCounts.slice(0, 6).map(cat => (
                <Link key={cat.id} to={`/category/${cat.slug}`} className="block group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-border/10">
                        {cat.icon ? (
                          <img src={cat.icon} alt="" className="size-3.5 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                        ) : (
                          <div className="size-1.5 rounded-full bg-primary/40" />
                        )}
                      </div>
                      <span className="text-[12px] font-black text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors uppercase tracking-widest">{cat.name}</span>
                    </div>
                    <span className="text-[12px] font-black tabular-nums text-slate-500 dark:text-slate-400">{cat.count} {t('ranking.units')}</span>
                  </div>
                  <div className="h-1 bg-slate-50 dark:bg-slate-900 rounded-full overflow-hidden border border-border/20">
                    <div 
                      className="h-full bg-primary/40 rounded-full transition-all duration-1000 group-hover:bg-primary"
                      style={{ width: `${Math.min((cat.count / 12) * 100, 100)}%` }} 
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Global Ranking Table */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between px-2">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/10">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-black tracking-tightest uppercase italic">{t('ranking.masterRank')}</h2>
                </div>
                <p className="text-[12px] font-bold text-muted-foreground/60 uppercase tracking-widest leading-none pl-12">{t('ranking.masterRankDesc')}</p>
            </div>
            <Badge variant="outline" className="rounded-lg px-3 py-1 border-border/40 font-black uppercase text-[11px] tracking-widest text-muted-foreground/70">
              {ranked.length} {t('ranking.unitsIndexed')}
            </Badge>
          </div>

          <div className="rounded-xl border border-border/40 overflow-hidden bg-white/50 dark:bg-slate-950/20 shadow-soft">
            <div className="overflow-x-auto overflow-y-hidden custom-scrollbar">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900 border-b border-border/40">
                    <th className="text-center p-4 font-black text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-[0.3em] w-20">{t('ranking.rank')}</th>
                    <th className="text-left p-4 font-black text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-[0.3em]">{t('ranking.assetName')}</th>
                    <th className="text-left p-4 font-black text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-[0.3em] hidden sm:table-cell">{t('ranking.classification')}</th>
                    <th className="text-left p-4 font-black text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-[0.3em] hidden md:table-cell">{t('ranking.inception')}</th>
                    <th className="p-4 w-12 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {ranked.map((tech, i) => (
                    <tr key={tech.id} className="group hover:bg-white/80 dark:hover:bg-slate-900/50 transition-all">
                      <td className="p-4">
                        <span className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-lg font-black text-[11px] tabular-nums mx-auto",
                          i < 3 
                            ? "bg-primary text-white shadow-soft shadow-primary/20" 
                            : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                        )}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link to={`/tech/${tech.slug}`} className="flex items-center gap-4 group/link">
                          <div className="size-10 flex items-center justify-center shrink-0">
                            {tech.logo ? (
                              <img src={tech.logo} alt="" className="h-9 w-9 object-contain filter drop-shadow-sm" />
                            ) : (
                              <span className="font-black text-[10px] text-primary/20">{tech.name.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <span className="font-black text-[13px] text-slate-900 dark:text-slate-100 group-hover/link:text-primary transition-colors block uppercase tracking-tight italic">
                              {tech.name}
                            </span>
                            <span className="text-[12px] font-bold uppercase text-slate-600 dark:text-slate-400 sm:hidden">{tech.type}</span>
                          </div>
                        </Link>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <span className="text-[12px] font-bold tracking-widest uppercase text-slate-600 dark:text-slate-400">{tech.type}</span>
                      </td>
                      <td className="p-4 hidden md:table-cell font-bold text-[13px] text-slate-600 dark:text-slate-400 tabular-nums">
                        {tech.releaseYear}
                      </td>
                      <td className="p-4 text-center">
                        <Link to={`/tech/${tech.slug}`} className="inline-flex items-center justify-center size-9 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border/40 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
