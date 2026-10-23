import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    name: "xelDash",
    description:
      "A self-hosted XELIS solo mining dashboard for tracking hashrate, shares, and mining performance.",
    language: "JavaScript",
    href: "https://github.com/pitanu/xelDash",
    featured: true,
  },
  {
    name: "Portfolio",
    description:
      "My personal portfolio, built to bring together my projects, background, and contact information.",
    language: "JavaScript",
    href: "https://github.com/pitanu/Portfolio",
  },
  {
    name: "weather-app",
    description: "A weather application built with JavaScript.",
    language: "JavaScript",
    href: "https://github.com/pitanu/weather-app",
  },
];

export default function Projects() {
  return (
    <main className="relative z-10 mx-auto flex min-h-[calc(100svh-10rem)] w-full max-w-5xl flex-col px-2 pb-16 pt-8 text-left sm:px-6 md:pt-16">
      <a
        href="/#top"
        className="mb-10 w-fit text-sm text-slate-400 transition hover:text-white"
      >
        <span aria-hidden="true">←</span> Back home
      </a>

      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-indigo-300">
          Selected work
        </p>
        <h1 className="mb-4 bg-gradient-to-r from-indigo-300 via-sky-200 to-cyan-300 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">
          Projects
        </h1>
        <p className="text-base leading-7 text-slate-400 sm:text-lg">
          A selection of my public work on GitHub. Explore the code and follow
          along as these projects grow.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={project.name}
            className={`group flex min-h-56 flex-col rounded-2xl border bg-slate-950/55 p-6 shadow-[0_16px_50px_-28px_rgba(99,102,241,0.45)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-slate-900/70 ${
              project.featured
                ? "border-indigo-400/25 sm:col-span-2 sm:min-h-64 sm:p-8"
                : "border-white/10"
            }`}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 font-mono text-xs text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                  {project.name}
                </h2>
              </div>
            </div>
            <p className="max-w-2xl flex-1 text-sm leading-6 text-slate-400 sm:text-base">
              {project.description}
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="flex items-center gap-2 text-xs text-slate-400">
                <span className="h-2 w-2 rounded-full bg-sky-300" aria-hidden="true" />
                {project.language}
              </span>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition group-hover:text-white"
                aria-label={`View ${project.name} on GitHub`}
              >
                <Github size={16} aria-hidden="true" />
                View on GitHub
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <a
        href="https://github.com/pitanu?tab=repositories"
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex w-fit items-center gap-2 text-sm text-indigo-300 transition hover:text-white"
      >
        Browse all repositories <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </main>
  );
}
