import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ghost } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md text-center space-y-10 animate-fade-in">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
          <div className="relative w-24 h-24 rounded-3xl bg-secondary/30 border border-border/50 flex items-center justify-center mx-auto mb-6">
            <Ghost className="h-12 w-12 text-primary" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest">
            Error Code 404
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-none">
            Page Lost in <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Cyberspace</span>
          </h1>
          <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-xs mx-auto">
            The coordinates <code className="text-primary bg-primary/10 px-1 rounded">{location.pathname}</code> do not exist in our directory.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
          <Button 
            size="lg" 
            className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Safety
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="w-full sm:w-auto h-14 px-8 rounded-2xl border-border/50 bg-secondary/30 font-black text-xs uppercase tracking-widest hover:bg-secondary/50"
            onClick={() => navigate("/ranking")}
          >
            View Rankings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

