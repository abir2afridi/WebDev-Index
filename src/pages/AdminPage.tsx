import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { technologies as defTechs, categories, Technology } from "@/data/technologies";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2, Search, Link as LinkIcon, Download, Settings, Database, ExternalLink, Github, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 30;

const AdminPage = () => {
  const navigate = useNavigate();
  const [techs, setTechs] = useState<Technology[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isEditing, setIsEditing] = useState<Technology | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Technology>>({});

  useEffect(() => {
    // Auth check removed per user request

    const stored = localStorage.getItem("custom-techs");
    let customTechs: Technology[] = [];
    if (stored) {
      customTechs = JSON.parse(stored);
    }
    
    const merged = [...defTechs];
    customTechs.forEach(ct => {
      const idx = merged.findIndex(t => t.id === ct.id);
      if (idx !== -1) merged[idx] = ct;
      else merged.push(ct);
    });
    
    setTechs(merged);
  }, [navigate]);

  const saveToStorage = (newTechs: Technology[]) => {
    setTechs(newTechs);
    const customOnly = newTechs.filter(t => !defTechs.find(dt => dt.id === t.id && JSON.stringify(dt) === JSON.stringify(t)));
    localStorage.setItem("custom-techs", JSON.stringify(customOnly));
  };

  const handleSave = () => {
    if (!formData.name || !formData.slug) {
      toast.error("Name and Slug are required");
      return;
    }

    if (isAdding) {
      const newTech = {
        ...formData,
        id: formData.id || `custom-${Date.now()}`,
      } as Technology;
      saveToStorage([...techs, newTech]);
      toast.success("Technology initialized in database");
    } else if (isEditing) {
      const updated = techs.map(t => t.id === isEditing.id ? { ...t, ...formData } as Technology : t);
      saveToStorage(updated);
      toast.success("Technology manifest updated");
    }

    setIsAdding(false);
    setIsEditing(null);
    setFormData({});
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from the directory?`)) {
      saveToStorage(techs.filter(t => t.id !== id));
      toast.success("Entry removed");
    }
  };

  const filteredTechs = techs.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.slug.toLowerCase().includes(search.toLowerCase())
  );
  
  const totalPages = Math.max(1, Math.ceil(filteredTechs.length / ITEMS_PER_PAGE));
  const paginated = filteredTechs.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const openEdit = (tech: Technology) => {
    setIsEditing(tech);
    setFormData(tech);
  };

  const openAdd = () => {
    setIsAdding(true);
    setFormData({
      id: `tech-${Date.now()}`,
      name: "",
      slug: "",
      shortDescription: "",
      type: "Framework",
      categoryId: "frameworks",
      features: [],
      advantages: [],
      disadvantages: [],
      tags: [],
      companiesUsing: [],
      useCases: []
    });
  };

  return (
    <div className="space-y-10 animate-fade-in pb-20 max-w-7xl mx-auto">
      {/* Minimalistic Admin Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-border/10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/5 text-primary border border-primary/10 text-[9px] font-black uppercase tracking-widest">
            <Settings className="h-3 w-3 animate-spin-slow" />
            Control Center
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">
            Asset <span className="text-primary/80">Manifest</span>
          </h1>
          <p className="text-sm text-muted-foreground/80 font-medium max-w-lg">
            Manage and maintain the core directory of web development technologies.
          </p>
        </div>
        <Button onClick={openAdd} className="h-12 px-6 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/5 hover:scale-[1.02] active:scale-98 transition-all group shrink-0">
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          Add Entry
        </Button>
      </div>

      {/* Database Stats & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 flex items-center gap-4 group">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Query database for technologies, slugs, or identifiers..." 
              className="h-14 pl-12 rounded-2xl glass-morphism border-border/50 focus:ring-primary/20 transition-all font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="p-4 rounded-2xl glass-morphism border-border/50 flex flex-col justify-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1">Database Entries</p>
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            <span className="text-xl font-black tabular-nums tracking-tighter">{filteredTechs.length}</span>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="glass-morphism rounded-[2.5rem] overflow-hidden border border-border/50 shadow-2xl">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 text-left">
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Technology Manifest</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 hidden sm:table-cell">Classification</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 hidden md:table-cell">Version Control</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {paginated.map(tech => (
                <tr key={tech.id} className="group hover:bg-secondary/20 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300">
                        {tech.logo ? (
                          <img src={tech.logo} alt="" className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                        ) : (
                          <Layers className="h-5 w-5 text-muted-foreground/30" />
                        )}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="font-bold text-foreground text-base group-hover:text-primary transition-colors">{tech.name}</div>
                        <div className="flex items-center gap-2">
                           <code className="text-[10px] text-muted-foreground/70 bg-secondary/50 px-1.5 py-0.5 rounded uppercase font-black tracking-widest">{tech.slug}</code>
                           <span className="text-[10px] text-muted-foreground/40 font-medium">• {tech.type}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 hidden sm:table-cell">
                    <Badge variant="secondary" className="bg-secondary/50 border-border/50 text-[10px] font-bold uppercase tracking-tighter">
                      {categories.find(c => c.id === tech.categoryId)?.name || tech.categoryId}
                    </Badge>
                  </td>
                  <td className="p-6 hidden md:table-cell">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-foreground/80 tracking-tighter">{tech.currentVersion || "α.0.0"}</span>
                      <span className="text-[9px] text-muted-foreground font-black uppercase tracking-widest mt-0.5">Manifest Rank</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => openEdit(tech)}
                        className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all active:scale-90"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(tech.id, tech.name)}
                        className="h-10 w-10 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all active:scale-90"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-muted-foreground">
                      <Search className="h-12 w-12 opacity-10" />
                      <p className="text-sm font-medium">No technologies matched your query parameters.</p>
                      <Button variant="outline" size="sm" onClick={() => setSearch("")} className="rounded-xl border-border/50">Reset Filters</Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-6 border-t border-border/30 bg-muted/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/40">
            Node {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-xl border-border/50 font-bold hover:bg-background transition-all"
            >
              Previous Segment
            </Button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setPage(i + 1)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-[10px] font-black transition-all",
                    page === i + 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPage(p => p + 1)}
              disabled={page >= totalPages}
              className="rounded-xl border-border/50 font-bold hover:bg-background transition-all"
            >
              Next Segment
            </Button>
          </div>
        </div>
      </div>

      {/* Edit / Add Modal */}
      <Dialog open={!!isEditing || isAdding} onOpenChange={(open) => {
        if (!open) { setIsEditing(null); setIsAdding(false); }
      }}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden p-0 rounded-[2.5rem] glass-morphism border-border/50">
          <div className="flex flex-col h-full bg-background/50">
            <DialogHeader className="p-8 pb-4 border-b border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  {isAdding ? <Plus className="h-6 w-6 text-primary" /> : <Edit2 className="h-6 w-6 text-primary" />}
                </div>
                <div>
                   <DialogTitle className="text-3xl font-black tracking-tighter">{isAdding ? "Initialize Entry" : "Modify Manifest"}</DialogTitle>
                   <p className="text-muted-foreground text-sm font-medium">Update the technical specifications for this technology.</p>
                </div>
              </div>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto p-8 scrollbar-thin">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Basic Identification */}
                <div className="space-y-6 lg:col-span-3">
                  <h3 className="text-lg font-black tracking-tighter flex items-center gap-2 border-b border-border/30 pb-2">
                    <Search className="h-4 w-4 text-primary" />
                    Identification Data
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Canonical Name</Label>
                      <Input value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12 rounded-xl bg-secondary/30 border-border/50 font-medium" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Unique Slug</Label>
                      <Input value={formData.slug || ""} onChange={e => setFormData({...formData, slug: e.target.value})} className="h-12 rounded-xl bg-secondary/30 border-border/50 font-medium" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Identity Logo URL</Label>
                      <Input value={formData.logo || ""} onChange={e => setFormData({...formData, logo: e.target.value})} placeholder="https://..." className="h-12 rounded-xl bg-secondary/30 border-border/50 font-medium" />
                    </div>
                  </div>
                </div>

                {/* Classification */}
                <div className="space-y-6">
                  <h3 className="text-lg font-black tracking-tighter flex items-center gap-2 border-b border-border/30 pb-2 text-blue-500">
                    <Layers className="h-4 w-4" />
                    Classification
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Domain Category</Label>
                      <select 
                        className="flex h-12 w-full rounded-xl border border-border/50 bg-secondary/30 px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={formData.categoryId || "frameworks"}
                        onChange={e => setFormData({...formData, categoryId: e.target.value})}
                      >
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Tool Archetype</Label>
                      <Input value={formData.type || ""} onChange={e => setFormData({...formData, type: e.target.value})} placeholder="e.g. Runtime, Library" className="h-12 rounded-xl bg-secondary/30 border-border/50 font-medium" />
                    </div>
                  </div>
                </div>

                {/* Timeline & Version */}
                <div className="space-y-6">
                   <h3 className="text-lg font-black tracking-tighter flex items-center gap-2 border-b border-border/30 pb-2 text-emerald-500">
                    <Github className="h-4 w-4" />
                    Temporal Sync
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Genesis Year</Label>
                      <Input type="number" value={formData.releaseYear || ""} onChange={e => setFormData({...formData, releaseYear: parseInt(e.target.value)})} className="h-12 rounded-xl bg-secondary/30 border-border/50 font-medium" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Current Manifest Version</Label>
                      <Input placeholder="e.g. 2.0.4-stable" value={formData.currentVersion || ""} onChange={e => setFormData({...formData, currentVersion: e.target.value})} className="h-12 rounded-xl bg-secondary/30 border-border/50 font-medium" />
                    </div>
                  </div>
                </div>

                {/* External Hyperlinks */}
                <div className="space-y-6">
                  <h3 className="text-lg font-black tracking-tighter flex items-center gap-2 border-b border-border/30 pb-2 text-purple-500">
                    <ExternalLink className="h-4 w-4" />
                    Neural Links
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Primary Documentation</Label>
                      <Input placeholder="https://docs..." value={formData.documentationUrl || ""} onChange={e => setFormData({...formData, documentationUrl: e.target.value})} className="h-12 rounded-xl bg-secondary/30 border-border/50 font-medium" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Source Repository</Label>
                      <Input placeholder="https://github..." value={formData.githubUrl || ""} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="h-12 rounded-xl bg-secondary/30 border-border/50 font-medium" />
                    </div>
                  </div>
                </div>

                {/* Qualitative Data Blocks */}
                <div className="space-y-6 lg:col-span-3 pt-4">
                  <h3 className="text-lg font-black tracking-tighter border-b border-border/30 pb-2 uppercase tracking-widest text-muted-foreground/40">Technical Core Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Core Modules & Features</Label>
                      <Textarea 
                        placeholder="Feature 1&#10;Feature 2" 
                        value={(formData.features || []).join("\n")} 
                        onChange={e => setFormData({...formData, features: e.target.value.split("\n").filter(Boolean)})}
                        className="min-h-32 rounded-[1.5rem] bg-secondary/30 border-border/50 font-medium p-4"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1 text-emerald-500">Architectural Advantages</Label>
                      <Textarea 
                        placeholder="Pro 1&#10;Pro 2" 
                        value={(formData.advantages || []).join("\n")} 
                        onChange={e => setFormData({...formData, advantages: e.target.value.split("\n").filter(Boolean)})}
                        className="min-h-32 rounded-[1.5rem] bg-emerald-500/5 border-emerald-500/20 font-medium p-4"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1 text-rose-500">Structural Constraints</Label>
                      <Textarea 
                        placeholder="Con 1&#10;Con 2" 
                        value={(formData.disadvantages || []).join("\n")} 
                        onChange={e => setFormData({...formData, disadvantages: e.target.value.split("\n").filter(Boolean)})}
                        className="min-h-32 rounded-[1.5rem] bg-rose-500/5 border-rose-500/20 font-medium p-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 border-t border-border/50 bg-secondary/20 flex flex-row items-center justify-between gap-4">
               <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Synchronizing to Local Cache Matrix...</div>
               <div className="flex gap-4">
                 <Button variant="outline" onClick={() => { setIsEditing(null); setIsAdding(false); }} className="rounded-xl px-6 font-bold">Abort Changes</Button>
                 <Button onClick={handleSave} className="rounded-xl px-8 font-black shadow-xl shadow-primary/20">Commit Manifest</Button>
               </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
