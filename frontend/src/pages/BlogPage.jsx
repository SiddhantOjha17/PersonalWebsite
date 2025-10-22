import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BlogCard from '../components/BlogCard.jsx';
import { fetchBlogs } from '../api.js';

const BlogPage = ({ setActivePage }) => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    fetchBlogs()
      .then((data) => {
        if (isMounted) {
          setBlogs(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Unable to load blogs right now.');
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
      <header className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-8 shadow-xl shadow-[#90a4ff]/15 backdrop-blur-xl dark:border-white/10 dark:bg-[#101733]/80 dark:shadow-black/40">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6f8cff]/20 via-transparent to-transparent opacity-80 dark:from-[#2f3f70]/40" />
        <div className="relative space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#4c5f93] shadow-inner shadow-white/50 dark:bg-white/10 dark:text-[#9fb2ff]">
            Field Notes
          </span>
          <h2 className="text-3xl font-semibold text-[#0f1a35] dark:text-[#eef1ff]">
            Essays on building grounded, human-centered AI systems.
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-[#3b4d78] dark:text-[#b8c6ff]">
            Tactical deep dives on some research papers I come across, some fun and cool new things I try to explore in my own time. !! MORE COMING VERY SOON !!
          </p>
        </div>
      </header>

      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-56 animate-pulse rounded-3xl border border-white/40 bg-white/60 dark:border-white/10 dark:bg-[#121b39]/50"
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
          {blogs.map((blog) =>
            blog.medium_link ? (
              <a
                key={blog.slug}
                href={blog.medium_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:-translate-y-0.5"
              >
                <BlogCard
                  title={blog.title}
                  excerpt={blog.excerpt}
                  publishedAt={blog.published_at}
                />
              </a>
            ) : (
              <button
                key={blog.slug}
                type="button"
                onClick={() => setActivePage({ view: 'blog-detail', slug: blog.slug })}
                className="text-left transition hover:-translate-y-0.5"
              >
                <BlogCard
                  title={blog.title}
                  excerpt={blog.excerpt}
                  publishedAt={blog.published_at}
                />
              </button>
            )
          )}
        </div>
      )}
    </section>
  );
};

BlogPage.propTypes = {
  setActivePage: PropTypes.func.isRequired
};

export default BlogPage;
