import PropTypes from 'prop-types';

const BlogCard = ({ title, excerpt, publishedAt }) => (
  <article className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/90 p-6 shadow-xl shadow-[#90a4ff]/10 transition duration-500 hover:-translate-y-1 hover:shadow-[#6f8cff]/20 dark:border-white/10 dark:bg-[#101733]/85 dark:shadow-black/40">
    <div className="absolute inset-0 translate-x-10 bg-gradient-to-r from-[#6f8cff]/15 to-transparent opacity-0 transition duration-500 group-hover:translate-x-0 group-hover:opacity-100 dark:from-[#2f3f70]/30" />
    <div className="relative flex flex-col gap-4">
      <header className="space-y-1">
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#4c5f93] dark:text-[#94a8ff]">
          <span className="h-1.5 w-6 rounded-full bg-gradient-to-r from-[#6f8cff] to-[#4c6ad7]" />
          {publishedAt}
        </span>
        <h3 className="text-xl font-semibold text-[#0f1a35] transition duration-300 group-hover:text-[#1f3272] dark:text-[#eef1ff]">
          {title}
        </h3>
      </header>
      <p className="text-sm leading-relaxed text-[#3b4d78] dark:text-[#b8c6ff]">{excerpt}</p>
      <span className="text-xs font-semibold text-[#4c5f93] transition group-hover:text-[#1f3272] dark:text-[#9fb2ff] dark:group-hover:text-white">
        Read article →
      </span>
    </div>
  </article>
);

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  publishedAt: PropTypes.string
};

BlogCard.defaultProps = {
  publishedAt: 'Coming Soon'
};

export default BlogCard;
