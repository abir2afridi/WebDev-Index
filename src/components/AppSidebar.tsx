import { Link, useLocation } from "react-router-dom";
import { categories, getTechsByCategory } from "@/data/technologies";
import { X, Menu, Map, BarChart3, Bookmark, Wrench, Home, GitCompare, ShieldCheck, Zap, Settings } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function AppSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const topNavItems = [
    { to: "/", label: t("nav.overview"), icon: Home },
    { to: "/compare", label: t("nav.compare"), icon: GitCompare },
    { to: "/roadmaps", label: t("nav.roadmaps"), icon: Map },
    { to: "/ranking", label: t("nav.ranking"), icon: BarChart3 },
    { to: "/bookmarks", label: t("nav.bookmarks"), icon: Bookmark },
    { to: "/dev-tools", label: t("nav.devTools"), icon: Wrench },
    { to: "/settings", label: t("nav.settings"), icon: Settings },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-[60] p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl lg:hidden active:scale-95 transition-all"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[50] bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed top-0 left-0 z-[55] h-screen w-64 bg-[#210c6e] border-r border-white/10 flex flex-col transition-transform duration-500 ease-in-out lg:translate-x-0 overflow-hidden text-white shadow-2xl shadow-indigo-950/50",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 pb-2 shrink-0">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
              <div className="size-10 flex items-center justify-center p-0.5">
                <DotLottieReact
                  src="https://lottie.host/ce7cf5d2-88f0-41fb-b66a-95e69873284a/SbKfr2dAv0.lottie"
                  loop
                  autoplay
                />
              </div>
              <span className="text-[14px] font-black tracking-tightest uppercase italic text-white">WebDev Index</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 border border-white/20 lg:hidden"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-premium px-6 py-2 space-y-6">
          {/* Main Navigation */}
          <nav className="space-y-1">
            {topNavItems.map(item => {
              const isActive = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group relative",
                    isActive
                      ? "text-white bg-white/10 shadow-sm border border-white/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  <div className={cn(
                    "size-8 rounded-lg flex items-center justify-center transition-all duration-300",
                    isActive ? "bg-white/10" : "bg-white/5 group-hover:scale-110"
                  )}>
                    <item.icon className={cn("h-4 w-4 transition-all duration-300", isActive ? "opacity-100" : "opacity-40 group-hover:opacity-100")} />
                  </div>
                  <span className="text-[13px] font-black uppercase tracking-widest">{item.label}</span>
                  {isActive && (
                    <div className="absolute left-0 w-1 h-5 bg-white rounded-r-full shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col min-h-0">
            <div className="sticky top-[-1rem] z-20 bg-[#210c6e] pb-4 mb-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                  <span className="text-[12px] font-black text-white uppercase tracking-[0.25em]">{t("sidebar.directory")}</span>
                </div>
                <span className="text-[11px] tabular-nums font-black text-white/40 uppercase">
                  {categories.length} {t("sidebar.units")}
                </span>
              </div>
            </div>


            <div className="grid gap-0.5">
              {categories.map(cat => {
                const href = cat.slug === "programming-languages" ? "/languages" : `/category/${cat.slug}`;
                const isActive = location.pathname === href;
                const count = getTechsByCategory(cat.id).length;
                return (
                  <Link
                    key={cat.id}
                    to={href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 group",
                      isActive
                        ? "bg-white/10 border border-white/20"
                        : "hover:bg-white/5 border border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-8 flex items-center justify-center shrink-0">
                        {cat.icon ? (
                          <img src={cat.icon} alt="" className={cn("h-5 w-5 transition-all duration-300", isActive ? "scale-110" : "opacity-40 group-hover:opacity-100 group-hover:scale-110")} />
                        ) : (
                          <Zap className="h-4 w-4 text-white/40" />
                        )}
                      </div>
                      <span className={cn(
                        "text-[14px] font-black uppercase transition-colors tracking-wide",
                        isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                      )}>
                        {cat.name}
                      </span>
                    </div>
                    <span className={cn(
                      "text-[11px] tabular-nums font-black min-w-[1.25rem] px-1.5 py-0.5 rounded-md flex items-center justify-center transition-all",
                      isActive ? "bg-white text-[#210c6e]" : "bg-white/10 text-slate-300"
                    )}>
                      {count}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-6 pt-2 shrink-0 border-t border-white/5">
          <Link 
            to="/admin" 
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/40 hover:text-white group"
          >
            <ShieldCheck className="size-4" />
            <span className="text-[12px] font-black uppercase tracking-widest">{t("sidebar.admin")}</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
