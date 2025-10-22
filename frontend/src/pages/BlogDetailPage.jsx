import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchBlogBySlug } from '../api.js';

const components = {
  h1: ({ node, ...props }) => (
    <h1 className="mt-8 text-3xl font-semibold text-[#0f1a35] dark:text-white" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="mt-8 text-2xl font-semibold text-[#1a2850] dark:text-[#e4e8ff]" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="mt-6 text-xl font-semibold text-[#253464] dark:text-[#d0d7ff]" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p className="mt-4 text-base leading-relaxed text-[#2f3e68] dark:text-[#c3ccff]" {...props} />
  ),
  li: ({ node, ...props }) => (
    <li className="ml-4 list-disc text-base leading-relaxed text-[#2f3e68] dark:text-[#c3ccff]" {...props} />
  ),
  code: ({ inline, className, children, ...props }) => {
    if (inline) {
      return (
        <code
          className="rounded-md bg-[#eff4ff] px-1.5 py-0.5 text-sm text-[#253464] dark:bg-[#1b2445] dark:text-[#aab8ff]"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <pre className="mt-5 overflow-x-auto rounded-2xl bg-[#0f1a35] p-5 text-sm text-[#dce3ff] shadow-inner shadow-black/30">
        <code {...props}>{children}</code>
      </pre>
    );
  }
};

const BlogDetailPage = ({ slug, onBack }) => {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setError('Missing blog identifier.');
      setIsLoading(false);
      return;
    }
    let isMounted = true;
    setIsLoading(true);
    fetchBlogBySlug(slug)
      .then((data) => {
        if (isMounted) {
          setBlog(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Unable to load the blog post.');
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
  }, [slug]);

  return (
    <section className="space-y-8">
      <button
        type="button"
        onClick={onBack}
        className="soft-btn-outline inline-flex items-center gap-2 px-4 py-2"
      >
        ← Back to blog index
      </button>

      {isLoading && (
        <div className="space-y-4">
          <div className="h-10 w-64 animate-pulse rounded-full bg-white/60 dark:bg-[#121b39]/60" />
          <div className="h-6 w-52 animate-pulse rounded-full bg-white/60 dark:bg-[#121b39]/60" />
          <div className="h-64 animate-pulse rounded-3xl bg-white/70 dark:bg-[#101733]/70" />
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50/80 p-6 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-900/30 dark:text-red-200">
          {error}
        </div>
      )}

      {!isLoading && !error && blog && (
        <article className="card-surface relative overflow-hidden p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-[#18224a]/40" />
          <div className="relative space-y-6">
            <header className="space-y-3">
              {blog.published_at && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#4c5f93] shadow-inner shadow-white/60 dark:bg-[#1c264a]/70 dark:text-[#9fb2ff]">
                  {new Date(blog.published_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              )}
              <h1 className="text-4xl font-semibold text-[#0f1a35] dark:text-white">{blog.title}</h1>
              <p className="max-w-2xl text-sm leading-relaxed text-[#3b4d78] dark:text-[#b8c6ff]">
                {blog.excerpt}
              </p>
            </header>
            {blog.medium_link && (
              <a
                href={blog.medium_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f1a35] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-[#0f1a35]/30 transition hover:-translate-y-0.5 dark:bg-[#2c3a73]"
              >
                Read on Medium
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {blog.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      )}
    </section>
  );
};

BlogDetailPage.propTypes = {
  slug: PropTypes.string,
  onBack: PropTypes.func.isRequired
};

BlogDetailPage.defaultProps = {
  slug: null
};

export default BlogDetailPage;
