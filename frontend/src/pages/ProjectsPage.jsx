import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard.jsx';
import { fetchProjects } from '../api.js';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    fetchProjects()
      .then((data) => {
        if (isMounted) {
          setProjects(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Unable to load projects.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="space-y-10">
      <header className="space-y-4">
        <span className="inline-flex rounded-full border border-white/50 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#4c5f93] shadow-sm shadow-white/50 backdrop-blur-xl dark:border-white/10 dark:bg-[#141d3c]/80 dark:text-[#9fb2ff]">
          Recent Work
        </span>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl font-semibold text-[#0f1a35] dark:text-[#eef1ff]">
              Systems that make LLMs trustworthy in the wild.
            </h2>
            <p className="text-sm leading-relaxed text-[#3b4d78] dark:text-[#b4c2ff]">
              These are some of my projects, work and professional. I can obviously not show the work projects here, have added the github links for my personal projects.
            </p>
          </div>
          <div className="rounded-2xl bg-white/70 px-5 py-3 text-xs font-medium text-[#31426b] shadow-inner shadow-white/60 backdrop-blur-xl dark:bg-[#141d3c]/70 dark:text-[#dce3ff]">
            Featured Stack: · Pytorch · LangGraph · Neo4j · HuggingFace · AWS · Azure
          </div>
        </div>
      </header>

      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-64 animate-pulse rounded-3xl border border-white/40 bg-white/60 dark:border-white/10 dark:bg-[#121b39]/50"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50/80 p-6 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-900/30 dark:text-red-200">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.name}
              description={project.long_summary || project.short_summary}
              tags={project.tags}
              githubUrl={project.github_url}
              demoUrl={project.demo_url}
              projectType={project.project_type}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsPage;
