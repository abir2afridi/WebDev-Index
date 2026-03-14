import React from 'react';
import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';

interface PageHeroProps {
  icon: LucideIcon;
  badge: string;
  description: string;
  theme?: 'blue' | 'purple' | 'emerald' | 'orange' | 'rose' | 'slate';
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({ 
  icon: Icon, 
  badge, 
  description, 
  theme = 'blue',
  className,
  title,
  children
}) => {
  const themes = {
    blue: {
      bg: "bg-blue-950",
      border: "border-blue-500/20",
      glow: "from-blue-500/20",
      badgeBg: "bg-blue-500/10",
      badgeText: "text-blue-200",
      badgeBorder: "border-blue-500/20",
      icon: "text-blue-400",
      desc: "text-blue-100"
    },
    purple: {
      bg: "bg-purple-950",
      border: "border-purple-500/20",
      glow: "from-purple-500/20",
      badgeBg: "bg-purple-500/10",
      badgeText: "text-purple-200",
      badgeBorder: "border-purple-500/20",
      icon: "text-purple-400",
      desc: "text-purple-100"
    },
    emerald: {
      bg: "bg-emerald-950",
      border: "border-emerald-500/20",
      glow: "from-emerald-500/20",
      badgeBg: "bg-emerald-500/10",
      badgeText: "text-emerald-200",
      badgeBorder: "border-emerald-500/20",
      icon: "text-emerald-400",
      desc: "text-emerald-100"
    },
    orange: {
      bg: "bg-orange-950",
      border: "border-orange-500/20",
      glow: "from-orange-500/20",
      badgeBg: "bg-orange-500/10",
      badgeText: "text-orange-200",
      badgeBorder: "border-orange-500/20",
      icon: "text-orange-400",
      desc: "text-orange-100"
    },
    rose: {
      bg: "bg-rose-950",
      border: "border-rose-500/20",
      glow: "from-rose-500/20",
      badgeBg: "bg-rose-500/10",
      badgeText: "text-rose-200",
      badgeBorder: "border-rose-500/20",
      icon: "text-rose-400",
      desc: "text-rose-100"
    },
    slate: {
      bg: "bg-slate-950",
      border: "border-white/5",
      glow: "from-primary/20",
      badgeBg: "bg-white/5",
      badgeText: "text-slate-200",
      badgeBorder: "border-white/10",
      icon: "text-primary",
      desc: "text-slate-100"
    }
  };

  const t = themes[theme];

  return (
    <div className={cn("relative rounded-xl overflow-hidden border shadow-soft animate-fade-in", t.bg, t.border, className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-30", t.glow)} />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-[0_-2px_10px_rgba(255,255,255,0.02)]" />
      <div className="relative p-3 md:p-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <div className={cn("inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] leading-none shrink-0", t.badgeBg, t.badgeText, t.badgeBorder)}>
          <Icon className={cn("h-3 w-3", t.icon)} />
          {badge}
        </div>
        <div className="flex-1">
          {title && (
            <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter italic mb-1">
              {title}
            </h1>
          )}
          <p className={cn("text-[11px] md:text-[13px] font-bold max-w-2xl leading-relaxed uppercase tracking-tight italic", t.desc)}>
            {description}
          </p>
        </div>
        {children && (
          <div className="flex items-center gap-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHero;
