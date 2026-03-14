import React from "react";
import { Zap, TrendingUp, Cpu, Award } from "lucide-react";
import { technologies } from "@/data/technologies";
import { useLanguage } from "@/hooks/useLanguage";

export function LiveTicker() {
  const { t } = useLanguage();
  
  // Create some "trending" data
  const trending = technologies.slice(0, 8).map(tech => ({
    name: tech.name,
    growth: tech.growth || Math.floor(Math.random() * 20) + 1,
    id: tech.id
  }));

  return (
    <div className="bg-primary/5 dark:bg-primary/10 border-b border-primary/10 h-8 flex items-center overflow-hidden whitespace-nowrap z-40 relative">
      <div className="flex items-center gap-3 px-4 bg-primary text-white text-[8px] font-black uppercase tracking-[0.2em] h-full z-10 shrink-0 italic">
        <Zap className="size-3 fill-current" />
        {t("ticker.liveIntel")}
      </div>
      
      <div className="flex animate-marquee hover:pause-marquee">
        {/* Render twice for seamless loop */}
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="flex gap-10 px-10 items-center">
            {trending.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">{item.name}</span>
                <div className="flex items-center gap-1 text-[9px] font-black text-emerald-500">
                  <TrendingUp className="size-3" />
                  +{item.growth}%
                </div>
                <div className="size-1 rounded-full bg-slate-200 dark:bg-slate-700 mx-2" />
              </div>
            ))}
            <div className="flex items-center gap-2">
               <Cpu className="size-3 text-primary" />
               <span className="text-[9px] font-black uppercase text-primary tracking-widest italic">{t("ticker.systemRunning")}</span>
            </div>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .hover\\:pause-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
