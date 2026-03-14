import React from 'react';
import { cn } from "@/lib/utils";
import { Zap, TrendingUp, Cpu, Activity, Shield, AlertCircle } from 'lucide-react';
import { useLanguage } from "@/hooks/useLanguage";
import { technologies } from "@/data/technologies";

export function Ticker() {
  const { t, language } = useLanguage();
  
  // Dynamic data for the ticker
  const trending = technologies.slice(0, 10).map(tech => ({
    name: tech.name,
    growth: tech.growth || Math.floor(Math.random() * 25) + 5,
    status: Math.random() > 0.1 ? "stable" : "volatile"
  }));

  const systemStats = [
    { label: language === "bn" ? "সিস্টেম স্ট্যাটাস" : "SYSTEM STATUS", value: "OPTIMIZED", icon: Cpu },
    { label: language === "bn" ? "প্রোটোকল" : "PROTOCOL", value: "SECURE-HS6", icon: Shield },
    { label: language === "bn" ? "অ্যাক্টিভিটি" : "ACTIVITY", value: "PEAK DATAFLOW", icon: Activity },
  ];

  return (
    <div className="fixed top-12 lg:top-14 left-0 right-0 z-[40] bg-white dark:bg-[#0f1115] text-slate-900 dark:text-white h-7 border-b border-border/10 overflow-hidden flex items-center lg:left-64 shadow-sm">
      <div className="flex items-center px-4 bg-primary h-full shrink-0 z-10 italic">
        <Zap className="size-2.5 mr-2 animate-pulse text-white fill-current" />
        <span className="text-[7px] font-black uppercase tracking-[0.25em] whitespace-nowrap text-white">
          {language === "bn" ? "লাইভ ইনটেল" : "LIVE INTEL FEED"}
        </span>
      </div>
      
      <div className="flex-1 overflow-hidden relative">
        <div className="flex animate-scroll-marquee whitespace-nowrap items-center h-full">
          {[...Array(2)].map((_, mainIdx) => (
            <div key={mainIdx} className="flex shrink-0">
               {trending.map((item, i) => (
                <div key={i} className="inline-flex items-center gap-2 mx-6 group">
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors cursor-default">{item.name}</span>
                  <div className="flex items-center gap-1 text-[8px] font-black text-emerald-500 group-hover:scale-110 transition-transform">
                    <TrendingUp className="size-2.5" />
                    +{item.growth}%
                  </div>
                  <div className="h-1 w-5 bg-border/20 rounded-full overflow-hidden mx-1">
                     <div className="h-full bg-primary/40 group-hover:bg-primary transition-all duration-1000" style={{ width: `${Math.max(20, item.growth * 3)}%` }} />
                  </div>
                </div>
              ))}
              
              {systemStats.map((stat, i) => (
                <div key={`stat-${i}`} className="inline-flex items-center gap-2 mx-8 border-l border-border/10 pl-8">
                  <stat.icon className="size-2.5 text-primary" />
                  <span className="text-[7px] font-black uppercase tracking-widest text-slate-400">{stat.label}:</span>
                  <span className="text-[8px] font-black uppercase italic text-primary">{stat.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-marquee {
          animation: scroll-marquee 45s linear infinite;
        }
        .animate-scroll-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
}
