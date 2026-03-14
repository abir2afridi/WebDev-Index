import { useState, createContext, useContext, useCallback } from "react";
import { Technology } from "@/data/technologies";

type CompareContextType = {
  items: Technology[];
  addItem: (tech: Technology) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  isInCompare: (id: string) => boolean;
  isOpen: boolean;
};

const CompareContext = createContext<CompareContextType>({
  items: [], addItem: () => {}, removeItem: () => {},
  clearAll: () => {}, isInCompare: () => false, isOpen: false,
});

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Technology[]>([]);

  const addItem = useCallback((tech: Technology) => {
    setItems(prev => {
      if (prev.length >= 3 || prev.find(t => t.id === tech.id)) return prev;
      return [...prev, tech];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearAll = useCallback(() => setItems([]), []);

  return (
    <CompareContext.Provider value={{
      items, addItem, removeItem, clearAll,
      isInCompare: (id) => items.some(t => t.id === id),
      isOpen: items.length > 0,
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);
