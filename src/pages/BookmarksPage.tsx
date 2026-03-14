import { useNavigate } from "react-router-dom";
import { technologies } from "@/data/technologies";
import { useBookmarks } from "@/hooks/useBookmarks";
import { TechCard } from "@/components/TechCard";
import { Bookmark, Heart, LayoutGrid, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";

const BookmarksPage = () => {
  const { bookmarks, favorites } = useBookmarks();
  const navigate = useNavigate();

  const bookmarkedTechs = technologies.filter(t => bookmarks.has(t.id));
  const favoritedTechs = technologies.filter(t => favorites.has(t.id));

  const hasAny = bookmarkedTechs.length > 0 || favoritedTechs.length > 0;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <PageHero 
        icon={Bookmark}
        badge="Architectural Bookmarks"
        description="A curated list of your most important technical assets and verified engineering entries."
        theme="blue"
        className="py-4 md:py-5"
      />

      {!hasAny ? (
        <div className="glass-morphism rounded-3xl p-20 text-center border-dashed border-2 border-border/50 space-y-8">
          <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto">
            <Bookmark className="h-10 w-10 text-muted-foreground/30" />
          </div>
          <div className="space-y-4 max-w-md mx-auto">
            <h2 className="text-2xl font-black tracking-tighter">Your collection is empty</h2>
            <p className="text-muted-foreground font-medium">
              Start building your personalized directory by marking technologies as favorites or adding them to your bookmarks.
            </p>
            <Button onClick={() => navigate("/")} className="rounded-xl px-8 shadow-lg shadow-primary/20">
              <LayoutGrid className="mr-2 h-4 w-4" /> Explore Technologies
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-16">
          {favoritedTechs.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tighter">Top Favorites</h2>
                  <p className="text-sm text-muted-foreground font-medium">Quick access to your most-loved frameworks and tools.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoritedTechs.map((tech, i) => (
                  <TechCard key={tech.id} tech={tech} index={i} />
                ))}
              </div>
            </section>
          )}

          {bookmarkedTechs.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bookmark className="h-5 w-5 text-primary fill-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tighter">Saved for Review</h2>
                  <p className="text-sm text-muted-foreground font-medium">Technologies you've bookmarked for exploration.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {bookmarkedTechs.map((tech, i) => (
                  <TechCard key={tech.id} tech={tech} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
