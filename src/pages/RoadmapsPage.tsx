import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, 
  Compass, 
  GraduationCap, 
  Map, 
  Terminal, 
  Code2, 
  Database, 
  Rocket,
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Star, 
  BookOpen, 
  Clock, 
  Target 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/hooks/useLanguage";
import { technologies } from "@/data/technologies";

interface RoadmapStep {
  name: string;
  slug?: string;
  description: string;
}

interface Roadmap {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  steps: RoadmapStep[];
}

const roadmaps: Roadmap[] = [
  {
    title: "Frontend Architect",
    description: "Master the technologies needed to build modern, high-performance user interfaces.",
    icon: <Code2 className="h-8 w-8 text-blue-500" />,
    color: "from-blue-500 to-cyan-500",
    steps: [
      { name: "Core Semantics (HTML)", slug: "html", description: "Advanced structure and accessibility standards" },
      { name: "Visual Systems (CSS)", slug: "css", description: "Modern styling, Flexbox, Grid, and Animations" },
      { name: "Core Logic (JavaScript)", slug: "javascript", description: "Deep dive into ES6+, Async, and Functional concepts" },
      { name: "Static Typing (TypeScript)", slug: "typescript", description: "Type safety and professional-grade tooling" },
      { name: "Component Frameworks", slug: "react", description: "React, Vue, or Angular deep dive" },
      { name: "Utility-First Styling", slug: "tailwindcss", description: "Rapid UI development with Tailwind CSS" },
      { name: "Global State Management", slug: "zustand", description: "Zustand, Redux, or Signals" },
      { name: "Quality Assurance", slug: "vitest", description: "Modern unit and E2E testing strategies" },
      { name: "Infrastructure Bundlers", slug: "vite", description: "Vite, Rollup, and build optimization" },
      { name: "Meta-Frameworks (Next.js)", slug: "nextjs", description: "Full-stack React with SSR and SSG" },
    ],
  },
  {
    title: "Backend Core Engineer",
    description: "Learn robust server-side programming, distributed systems, and API design.",
    icon: <Terminal className="h-8 w-8 text-emerald-500" />,
    color: "from-emerald-500 to-teal-500",
    steps: [
      { name: "Runtime Infrastructure", slug: "nodejs", description: "Node.js environment and core modules" },
      { name: "API Architecture (REST)", slug: "rest", description: "Designing scalable RESTful services" },
      { name: "Data Persistence (SQL)", slug: "postgresql", description: "Relational databases and PostgreSQL" },
      { name: "Identity & Security", slug: "auth0", description: "JWT, OAuth2, and Secure Sessions" },
      { name: "Data Orchestration", slug: "graphql", description: "Flexible query interfaces with GraphQL" },
      { name: "NoSQL Paradigms", slug: "mongodb", description: "Document-oriented storage models" },
      { name: "Virtualization (Docker)", slug: "docker", description: "Container-first development workflows" },
      { name: "Backend Testing", slug: "jest", description: "Integration and unit testing for services" },
      { name: "Persistence Caching", slug: "redis", description: "In-memory performance optimization" },
      { name: "Workflow Automation (CI/CD)", slug: "github-actions", description: "Deployment pipelines and GitHub Actions" },
    ],
  },
  {
    title: "Full Stack Mastery",
    description: "Bridging the gap between interface and infrastructure for complete autonomy.",
    icon: <Compass className="h-8 w-8 text-purple-500" />,
    color: "from-purple-500 to-indigo-500",
    steps: [
      { name: "Foundational Triad", slug: "html", description: "Semantic HTML, CSS Layouts, and Modern JS" },
      { name: "Type-Safe Workflow", slug: "typescript", description: "Consistent typing across the stack" },
      { name: "Stateful Interfaces", slug: "react", description: "Building interactive client experiences" },
      { name: "Service Integration", slug: "nodejs", description: "Building the application logic layer" },
      { name: "Data Architecture", slug: "postgresql", description: "Schema design and database management" },
      { name: "API Communication", slug: "rest", description: "Building the standard bridge" },
      { name: "Unified Meta-Stacks", slug: "nextjs", description: "The modern Full-stack React paradigm" },
      { name: "Containerization", slug: "docker", description: "Packaging apps for production" },
      { name: "Version Orchestration", slug: "git", description: "Professional Git & GitHub collaboration" },
      { name: "Scale Deployment", slug: "vercel", description: "Global delivery and infrastructure management" },
    ],
  },
  {
    title: "Platform & DevOps",
    description: "Infrastructure management, automation, and industrial-grade deployment.",
    icon: <Rocket className="h-8 w-8 text-orange-500" />,
    color: "from-orange-500 to-rose-500",
    steps: [
      { name: "System Internals", description: "Linux, Shell, and Kernel fundamentals" },
      { name: "VCS Management", slug: "git", description: "Advanced Git branching and merging" },
      { name: "Orchestration Basics", slug: "docker", description: "Containerizing microservices" },
      { name: "Cluster Management", slug: "kubernetes", description: "Managing multi-node deployments" },
      { name: "Automation Pipelines", slug: "github-actions", description: "CI/CD at scale" },
      { name: "Hyperscale Platforms", slug: "aws", description: "AWS, Azure, and Google Cloud services" },
      { name: "Unified Infrastructure (IaC)", description: "Terraform and Ansible automation" },
      { name: "Ecosystem Monitoring", slug: "sentry", description: "Observability, errors, and performance" },
      { name: "Modern Networking", description: "DNS, CDN, and Security Protocols" },
      { name: "Zero Trust Security", description: "Cloud-native infrastructure security" },
    ],
  },
];

const RoadmapsPage = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PageHero 
        icon={Map}
        badge={t("roadmaps.heroBadge")}
        description={t("roadmaps.heroDesc")}
        theme="blue"
        className="py-4 md:py-5"
      />

      <div className="grid grid-cols-1 gap-16">
        {roadmaps.map((roadmap, ri) => (
          <section key={ri} className="space-y-10">
            <div className="flex items-center gap-6 group">
              <div className={cn(
                "size-16 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 border border-border/10",
              )}>
                {roadmap.icon}
              </div>
              <div className="space-y-1 flex-1">
                <h2 className="text-3xl font-black tracking-tightest uppercase italic text-slate-900 dark:text-slate-100">{roadmap.title}</h2>
                <p className="text-base text-muted-foreground/80 font-medium max-w-2xl">{roadmap.description}</p>
              </div>
            </div>

            <div className="relative pl-12 md:pl-20">
              {/* Timeline Track */}
              <div className="absolute left-6 md:left-[2.5rem] top-0 bottom-0 w-1 bg-gradient-to-b from-border/50 via-border to-transparent rounded-full" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                {roadmap.steps.map((step, si) => (
                  <div key={si} className="relative flex items-start gap-6 group">
                    {/* Node */}
                    <div className={cn(
                      "absolute left-[-3.2rem] md:left-[-3.8rem] z-10 w-12 h-12 rounded-xl border-4 border-background flex items-center justify-center shrink-0 transition-all duration-500 shadow-xl",
                      "bg-white dark:bg-slate-900 group-hover:bg-primary group-hover:shadow-primary/30 group-hover:scale-110 border-border/50"
                    )}>
                      <span className="text-[14px] font-black text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors">{si + 1}</span>
                    </div>

                    <div className="flex-1 p-6 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm hover:border-primary/20 hover:bg-card hover:shadow-xl hover:shadow-black/5 transition-all">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        {step.slug ? (
                          <Link to={`/tech/${step.slug}`} className="group/link flex items-center gap-3">
                            <div className="size-10 flex items-center justify-center shrink-0">
                              {technologies.find(t => t.slug === step.slug)?.logo ? (
                                <img src={technologies.find(t => t.slug === step.slug)?.logo} alt="" className="h-full w-full object-contain filter drop-shadow-sm group-hover/link:scale-110 transition-transform duration-500" />
                              ) : (
                                <span className="font-black text-[12px] text-primary/20">{step.name.charAt(0)}</span>
                              )}
                            </div>
                            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover/link:text-primary transition-colors flex items-center gap-2">
                              {step.name}
                              <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                            </h3>
                          </Link>
                        ) : (
                          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{step.name}</h3>
                        )}
                        <Badge variant="outline" className="text-[11px] font-bold uppercase tracking-tight border-border/50 bg-background/50 px-2 py-0.5">
                          {t("roadmaps.phase")} {si < 3 ? 'Alpha' : si < 7 ? 'Beta' : 'Gamma'}
                        </Badge>
                      </div>
                      <p className="text-[13px] text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {ri < roadmaps.length - 1 && <div className="h-px w-full bg-border/30 pt-16" />}
          </section>
        ))}
      </div>
    </div>
  );
};

export default RoadmapsPage;
