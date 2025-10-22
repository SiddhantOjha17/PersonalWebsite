const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/SiddhantOjha17',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.55v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.35-1.3-1.71-1.3-1.71-1.07-.74.08-.73.08-.73 1.18.08 1.8 1.22 1.8 1.22 1.05 1.79 2.76 1.27 3.44.97.1-.77.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.52.12-3.17 0 0 .98-.31 3.2 1.19a11.08 11.08 0 0 1 5.82 0c2.22-1.5 3.2-1.19 3.2-1.19.64 1.65.24 2.87.12 3.17.75.81 1.2 1.85 1.2 3.11 0 4.41-2.69 5.38-5.25 5.67.42.36.8 1.08.8 2.18v3.23c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    )
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/siddhantojha/',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M20.45 20.45h-3.55v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85v5.5H9.48V9.56h3.4v1.49h.05c.47-.9 1.6-1.85 3.3-1.85 3.53 0 4.18 2.32 4.18 5.34v5.91ZM5.34 8.07a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9.56h3.56v10.89Z" />
      </svg>
    )
  },
  {
    label: 'X',
    href: 'https://x.com/MLAlterEgo',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M20.99 3.5h-3.07l-4.4 6.02-4.86-6.02H3.01l7.11 9.14-6.8 8.86h3.07l4.93-6.43 5.2 6.43h5.16l-7.54-9.33 6.85-8.67Z" />
      </svg>
    )
  },
  {
    label: 'Kaggle',
    href: 'https://www.kaggle.com/siddhantojha17',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M9.5 3H6v18h3.5v-6.75l6.2 6.75H20l-7.2-7.94L20 3h-4.6l-5.9 6.38V3Z" />
      </svg>
    )
  }
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-white/30 bg-transparent py-6">
      <div className="mx-auto flex w-[calc(100%-1.5rem)] max-w-6xl flex-col items-center justify-between gap-4 rounded-3xl bg-white/70 px-6 py-6 text-sm text-[#1e2b4a] shadow-2xl shadow-[#90a4ff]/10 backdrop-blur-xl transition dark:bg-[#0e142c]/80 dark:text-[#d9deff] md:flex-row md:px-12">
        <span>© {year} Siddhant Ojha. Built and vibe coded with curiosity and care.</span>
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#1d2d44] shadow-lg shadow-[#4c6ad7]/20 transition duration-300 hover:-translate-y-0.5 hover:text-[#4c6ad7] dark:bg-white/10 dark:text-[#d9deff] dark:hover:text-[#90a4ff]"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
