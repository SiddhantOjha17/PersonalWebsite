import PropTypes from 'prop-types';

const navItems = [
  { label: 'Home', key: 'home' },
  { label: 'Projects', key: 'projects' },
  { label: 'Blog', key: 'blog' },
  { label: 'Chat', key: 'chat' }
];

const Navbar = ({ activeView, setActivePage, theme, setTheme }) => {
  const currentView = activeView === 'blog-detail' ? 'blog' : activeView;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 py-3">
      <nav className="glass-panel mx-auto flex w-[calc(100%-1.5rem)] max-w-6xl items-center justify-between rounded-full px-6 py-3 shadow-lg sm:px-8">
        <button
          onClick={() => setActivePage('home')}
          className="flex items-center gap-3 rounded-full bg-white/60 px-3 py-1.5 text-sm font-semibold text-[#172447] shadow-inner shadow-white/60 transition hover:shadow-lg dark:bg-white/5 dark:text-[#eef2ff] dark:shadow-none"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7087ff] to-[#4c6ad7] text-white">
            SO
          </span>
          Siddhant Ojha
        </button>
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <select
              value={currentView}
              onChange={(event) => setActivePage(event.target.value)}
              className="rounded-full border border-white/60 bg-white/70 px-3 py-2 text-sm font-medium text-[#172447] shadow-inner shadow-white/50 focus:outline-none focus:ring-2 focus:ring-[#6f8cff] dark:border-white/10 dark:bg-[#1b2445]/80 dark:text-[#f4f6ff]"
            >
              {navItems.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const isActive = currentView === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActivePage(item.key)}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#4c6ad7] to-[#6f8cff] text-white shadow-lg shadow-[#4c6ad7]/30'
                      : 'text-[#31426b] hover:text-[#1d2d44] dark:text-[#d7ddff] dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-[#172447] shadow-lg shadow-[#4c6ad7]/20 transition duration-300 hover:-translate-y-0.5 dark:bg-[#1b2445]/80 dark:text-[#f4f6ff]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1.5M12 19.5V21m9-9h-1.5M4.5 12H3m16.364 6.364-1.06-1.06M6.696 6.696 5.636 5.636m12.728 0-1.06 1.06M6.696 17.304l-1.06 1.06M12 8.25A3.75 3.75 0 1 1 8.25 12 3.75 3.75 0 0 1 12 8.25Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79A9 9 0 0 1 11.21 3 7.5 7.5 0 0 0 21 12.79Z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 7.5 7.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  activeView: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired
};

export default Navbar;
