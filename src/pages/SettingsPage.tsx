import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { 
  Languages, 
  Layout, 
  Check, 
  Moon, 
  Sun,
  Activity,
  Globe,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";

const SettingsPage = () => {
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggle } = useTheme();

  const handleLanguageChange = (lang: "en" | "bn") => {
    setLanguage(lang);
    toast.success(lang === "en" ? "Language updated to English" : "ভাষা বাংলায় পরিবর্তন করা হয়েছে", {
      className: "font-black text-[10px] uppercase tracking-widest bg-slate-900 dark:bg-primary text-white border-none",
    });
  };

  return (
    <div className="max-w-[1000px] mx-auto space-y-8 animate-fade-in pb-20">
      <PageHero 
        icon={Settings}
        badge={t("settings.title")}
        description={t("settings.status")}
        theme="blue"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Language Configuration */}
        <div className="p-6 rounded-[2rem] bg-white dark:bg-[#1a1c1e] border border-border space-y-6 shadow-sm group">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform">
               <Languages className="size-5 text-primary" />
            </div>
            <div>
              <h2 className="text-[14px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{t("settings.language")}</h2>
              <p className="text-[12px] font-bold text-slate-500 dark:text-slate-300 uppercase leading-tight mt-1">{t("settings.languageDescription")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button 
              onClick={() => handleLanguageChange("en")}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border transition-all",
                language === "en" 
                  ? "bg-slate-900 border-slate-900 text-white shadow-lg" 
                  : "bg-slate-50 dark:bg-slate-900/50 border-border text-slate-600 dark:text-slate-400 hover:border-primary/40"
              )}
            >
              <div className="flex items-center gap-4">
                 <div className={cn("size-2 rounded-full", language === "en" ? "bg-primary animate-pulse" : "bg-slate-300 dark:bg-slate-700")} />
                 <span className="text-[13px] font-black uppercase tracking-widest italic">English (Global)</span>
              </div>
              {language === "en" && <Check className="size-3.5 text-primary" />}
            </button>

            <button 
              onClick={() => handleLanguageChange("bn")}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border transition-all",
                language === "bn" 
                  ? "bg-slate-900 border-slate-900 text-white shadow-lg" 
                  : "bg-slate-50 dark:bg-slate-900/50 border-border text-slate-600 dark:text-slate-400 hover:border-primary/40"
              )}
            >
              <div className="flex items-center gap-4">
                 <div className={cn("size-2 rounded-full", language === "bn" ? "bg-primary animate-pulse" : "bg-slate-300 dark:bg-slate-700")} />
                 <span className="text-[13px] font-black uppercase tracking-widest italic">Bengali (বাংলা)</span>
              </div>
              {language === "bn" && <Check className="size-3.5 text-primary" />}
            </button>
          </div>
        </div>

        {/* Visual Appearance Profile */}
        <div className="p-6 rounded-[2rem] bg-white dark:bg-[#1a1c1e] border border-border space-y-6 shadow-sm group">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform">
               <Layout className="size-5 text-primary" />
            </div>
            <div>
              <h2 className="text-[14px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{t("settings.appearance")}</h2>
              <p className="text-[12px] font-bold text-slate-500 dark:text-slate-300 uppercase leading-tight mt-1">{t("settings.appearanceDescription")}</p>
            </div>
          </div>

          <button 
            onClick={toggle}
            className="w-full flex items-center justify-between p-5 rounded-2xl bg-slate-900 dark:bg-primary text-white shadow-xl relative overflow-hidden group/theme"
          >
            <div className="relative z-10 flex items-center gap-3">
               {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
               <span className="text-[12px] font-black uppercase tracking-widest text-left">{t("settings.toggleMode")}</span>
            </div>
            <div className="relative z-10 text-[11px] font-black uppercase tracking-widest italic opacity-60">
               {isDark ? t("settings.lightPulse") : t("settings.darkVoid")}
            </div>
          </button>
        </div>

      </div>

      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-slate-500">
            <div className="flex items-center gap-2">
               <Activity className="size-4" />
               <span className="text-[11px] font-black uppercase tracking-[0.2em]">{t("settings.latency")}: 18ms</span>
            </div>
            <div className="h-3 w-px bg-primary/20" />
            <div className="flex items-center gap-2">
               <Globe className="size-4" />
               <span className="text-[11px] font-black uppercase tracking-[0.2em]">{t("settings.node")}: Global-01</span>
            </div>
         </div>
         <Button variant="outline" className="h-10 rounded-lg px-8 text-[11px] font-black uppercase tracking-widest border-primary/20 text-primary bg-white dark:bg-slate-900">
           {t("settings.refreshAssets")}
         </Button>
      </div>

    </div>
  );
};

export default SettingsPage;
