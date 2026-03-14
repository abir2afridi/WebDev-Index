import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/useTheme";
import { BookmarkProvider } from "@/hooks/useBookmarks";
import { CompareProvider } from "@/hooks/useCompare";
import { LanguageProvider } from "@/hooks/useLanguage";
import { Layout } from "@/components/Layout";
import AuthPage from "./pages/AuthPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import Index from "./pages/Index.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import TechDetailPage from "./pages/TechDetailPage.tsx";
import ComparePage from "./pages/ComparePage.tsx";
import RoadmapsPage from "./pages/RoadmapsPage.tsx";
import RankingPage from "./pages/RankingPage.tsx";
import BookmarksPage from "./pages/BookmarksPage.tsx";
import DevToolsPage from "./pages/DevToolsPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import ProgrammingLanguagesPage from "@/pages/ProgrammingLanguagesPage";
import NotFound from "@/pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ThemeProvider>
        <BookmarkProvider>
          <CompareProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/category/:slug" element={<CategoryPage />} />
                    <Route path="/tech/:slug" element={<TechDetailPage />} />
                    <Route path="/compare" element={<ComparePage />} />
                    <Route path="/roadmaps" element={<RoadmapsPage />} />
                    <Route path="/ranking" element={<RankingPage />} />
                    <Route path="/bookmarks" element={<BookmarksPage />} />
                    <Route path="/dev-tools" element={<DevToolsPage />} />
                    <Route path="/languages" element={<ProgrammingLanguagesPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                  </Route>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            </TooltipProvider>
          </CompareProvider>
        </BookmarkProvider>
      </ThemeProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
