import { useState, createContext, useContext, useCallback, useEffect } from "react";

type BookmarkContextType = {
  bookmarks: Set<string>;
  favorites: Set<string>;
  toggleBookmark: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  isFavorited: (id: string) => boolean;
};

const BookmarkContext = createContext<BookmarkContextType>({
  bookmarks: new Set(),
  favorites: new Set(),
  toggleBookmark: () => {},
  toggleFavorite: () => {},
  isBookmarked: () => false,
  isFavorited: () => false,
});

function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function saveSet(key: string, set: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => loadSet("bookmarks"));
  const [favorites, setFavorites] = useState<Set<string>>(() => loadSet("favorites"));

  useEffect(() => { saveSet("bookmarks", bookmarks); }, [bookmarks]);
  useEffect(() => { saveSet("favorites", favorites); }, [favorites]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  return (
    <BookmarkContext.Provider value={{
      bookmarks, favorites, toggleBookmark, toggleFavorite,
      isBookmarked: (id) => bookmarks.has(id),
      isFavorited: (id) => favorites.has(id),
    }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => useContext(BookmarkContext);
