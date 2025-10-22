import PropTypes from 'prop-types';

const labelMap = {
  work: 'Work Project',
  personal: 'Personal Project',
  research: 'Research Project'
};

const badgeClassMap = {
  work:
    'bg-gradient-to-r from-[#ff9f7f] to-[#ff6f61] text-white shadow-[#ff6f61]/40 dark:from-[#ff8a65] dark:to-[#ff7043]',
  personal:
    'bg-gradient-to-r from-[#74d4c0] to-[#32b5a4] text-white shadow-[#32b5a4]/40 dark:from-[#4dd0c2] dark:to-[#26a69a]',
  research:
    'bg-gradient-to-r from-[#a18cd1] to-[#6f78d7] text-white shadow-[#6f78d7]/40 dark:from-[#8c9eff] dark:to-[#536dfe]'
};

const ProjectCard = ({ title, description, tags, githubUrl, demoUrl, projectType }) => {
  const typeKey = projectType?.toLowerCase?.() ?? 'personal';
  const badgeLabel = labelMap[typeKey] || 'Project';
  const badgeClasses =
    badgeClassMap[typeKey] ||
    'bg-gradient-to-r from-[#6f8cff] to-[#4c6ad7] text-white shadow-[#4c6ad7]/40';

  return (
  <article className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/90 p-6 shadow-xl shadow-[#90a4ff]/15 transition duration-500 hover:-translate-y-1 hover:shadow-[#6f8cff]/25 dark:border-white/5 dark:bg-[#0f162f]/90 dark:shadow-black/40">
    <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-br from-[#6f8cff]/40 via-transparent to-transparent opacity-80 transition duration-500 group-hover:opacity-100 dark:from-[#2f3f70]/60" />
    <div className="relative flex h-full flex-col gap-5">
      <header className="space-y-3">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide shadow-lg ${badgeClasses}`}
        >
          {badgeLabel}
        </div>
        <h3 className="text-xl font-semibold text-[#101b38] transition duration-300 group-hover:text-[#1f3272] dark:text-[#f0f3ff] dark:group-hover:text-white">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-[#3b4d78] dark:text-[#b8c6ff]">{description}</p>
      </header>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#eff4ff]/90 px-3 py-1 text-xs font-medium text-[#394a74] shadow-inner shadow-white/70 dark:bg-[#1c264a]/80 dark:text-[#c4d0ff]"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-4 text-sm font-semibold">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#45588e] transition hover:text-[#253464] dark:text-[#a5b8ff] dark:hover:text-white"
          >
            GitHub
            <span aria-hidden="true">↗</span>
          </a>
        )}
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#45588e] transition hover:text-[#253464] dark:text-[#a5b8ff] dark:hover:text-white"
          >
            Live Demo
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </div>
  </article>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  githubUrl: PropTypes.string,
  demoUrl: PropTypes.string,
  projectType: PropTypes.string
};

ProjectCard.defaultProps = {
  githubUrl: null,
  demoUrl: null,
  projectType: 'personal'
};

export default ProjectCard;
