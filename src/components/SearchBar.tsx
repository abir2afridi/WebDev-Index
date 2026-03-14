import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchTechnologies } from "@/data/technologies";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query.length >= 2 ? searchTechnologies(query).slice(0, 8) : [];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-0 left-0 right-0 z-30 h-12 bg-card border-t border-border flex items-center px-4 gap-2 lg:left-64"
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground flex-1 text-left">Search technologies...</span>
        <kbd className="hidden sm:inline-flex text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground font-mono">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
      <div className="absolute inset-0 bg-foreground/20" />
      <div
        className="relative w-full max-w-lg mx-4 bg-card border border-border rounded-lg shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-border px-3">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search technologies..."
            className="flex-1 h-12 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground font-sans"
          />
          <button onClick={() => setOpen(false)} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        {results.length > 0 && (
          <ul className="py-2 max-h-80 overflow-y-auto">
            {results.map(tech => (
              <li key={tech.id}>
                <button
                  className="w-full text-left px-4 py-2.5 hover:bg-accent text-sm flex flex-col gap-0.5"
                  onClick={() => {
                    navigate(`/tech/${tech.slug}`);
                    setOpen(false);
                  }}
                >
                  <span className="font-medium text-foreground">{tech.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{tech.shortDescription}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {query.length >= 2 && results.length === 0 && (
          <p className="px-4 py-6 text-sm text-muted-foreground text-center font-serif">No technologies found.</p>
        )}
      </div>
    </div>
  );
}
