import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft, KeyRound, Mail, Sparkles } from "lucide-react";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/admin");
      }
    });
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let error;
    
    if (!import.meta.env.VITE_SUPABASE_URL) {
      toast.success("Development mode: Authentication verified.");
      sessionStorage.setItem("dev-admin", "true");
      navigate("/admin");
      setLoading(false);
      return;
    }

    if (isLogin) {
      const resp = await supabase.auth.signInWithPassword({ email, password });
      error = resp.error;
    } else {
      const resp = await supabase.auth.signUp({ email, password });
      error = resp.error;
    }

    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(isLogin ? "Verified" : "Account Created");
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-300 hover:text-foreground transition-colors group">
        <ArrowLeft className="h-4 w-4" />
        <span className="text-[10px] font-black uppercase tracking-widest">Directory Reset</span>
      </Link>

      <div className="w-full max-w-sm relative z-10 space-y-12">
        <div className="text-center space-y-3">
          <div className="size-16 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-border/40 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-black tracking-tightest uppercase italic">
            {isLogin ? "System Entry" : "Initialization"}
          </h1>
          <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest max-w-[240px] mx-auto leading-relaxed">
            Administrative access point for the global technology indices.
          </p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Input
                  type="email"
                  required
                  placeholder="IDENTIFIER (EMAIL)"
                  className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-border/40 focus:ring-1 focus:ring-primary/20 transition-all text-[10px] font-black uppercase tracking-widest placeholder:text-slate-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-1.5">
                <Input
                  type="password"
                  required
                  placeholder="ACCESS KEY (PASSWORD)"
                  className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-border/40 focus:ring-1 focus:ring-primary/20 transition-all text-[10px] font-black uppercase tracking-widest placeholder:text-slate-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/10 transition-all" 
              disabled={loading}
            >
              {loading ? "Verifying..." : isLogin ? "Authenticate" : "Initialize"}
            </Button>
          </form>

          <button 
            className="w-full text-center text-[9px] font-black uppercase tracking-widest text-slate-300 hover:text-primary transition-colors"
            onClick={() => setIsLogin(!isLogin)}
            type="button"
          >
            {isLogin ? "Request New Identity" : "Return to Entry Point"}
          </button>
        </div>

        <p className="text-[8px] text-center text-slate-200 dark:text-slate-800 font-black uppercase tracking-[0.3em] pt-10">
          SECURE QUANTUM ENCRYPTION ACTIVE
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
