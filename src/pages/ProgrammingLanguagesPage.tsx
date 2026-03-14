import PageHero from "@/components/PageHero";
import { TechCard } from "@/components/TechCard";
import { technologies } from "@/data/technologies";
import { useLanguage } from "@/hooks/useLanguage";
import { Search, Code2, Cpu, Globe, Database, Zap } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";

const ProgrammingLanguagesPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const languageAssets = useMemo(() => {
    return technologies.filter(t => t.categoryId === "programming-languages");
  }, []);

  const filteredLanguages = useMemo(() => {
    return languageAssets.filter(lang => 
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [languageAssets, searchQuery]);

  // Grouping for a more "World of Languages" feel
  const stats = [
    { label: "Total Indexed", value: languageAssets.length, icon: Code2 },
    { label: "Systems & Low-level", value: languageAssets.filter(l => l.tags.includes("systems") || l.tags.includes("performance")).length, icon: Cpu },
    { label: "Modern Web & App", value: languageAssets.filter(l => l.tags.includes("web") || l.tags.includes("mobile") || l.tags.includes("scripting")).length, icon: Globe },
    { label: "Functional & Data", value: languageAssets.filter(l => l.tags.includes("functional") || l.tags.includes("data") || l.tags.includes("scientific")).length, icon: Database },
  ];

  return (
    <div className="pb-20">
      <PageHero
        title={t("nav.languages")}
        description="A comprehensive index of the world's most influential programming languages, from low-level systems to modern high-level scripting."
        badge="Technical Registry"
        icon={Zap}
        theme="purple"
      />

      <div className="w-full relative z-10 pt-12">
        <div className="flex items-center gap-3 mb-8">
           <div className="h-0.5 w-8 bg-indigo-500 rounded-full" />
           <h2 className="text-[14px] font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Distribution Metrics</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div 
              key={i}
              className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 p-6 rounded-xl shadow-sm hover:shadow-xl hover:bg-white/60 dark:hover:bg-slate-900/60 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon size={64} />
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="size-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform duration-500">
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-1 italic tracking-tighter">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 py-8 border-y border-slate-200/30 dark:border-slate-800/30">
          <div className="relative w-full md:w-[450px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 h-5 w-5" />
            <Input
              type="text"
              placeholder="Filter by name, tag, or architect..."
              className="pl-12 py-7 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-900 dark:text-white font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] bg-slate-100 dark:bg-slate-900/50 px-6 py-3 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
            <span className="text-indigo-500 animate-pulse">{filteredLanguages.length}</span>
            <span>Registry Entries</span>
          </div>
        </div>

        {filteredLanguages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLanguages.map((lang, idx) => (
              <TechCard key={lang.id} tech={lang} index={idx} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="size-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-200 dark:border-slate-800">
              <Search size={40} className="text-slate-300 dark:text-slate-700" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tighter italic">No Matches Detected</h3>
            <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-tight italic">The specified language signature does not exist in our current registry.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgrammingLanguagesPage;
