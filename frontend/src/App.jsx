import { useCallback, useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import ChatPage from './pages/ChatPage.jsx';

const App = () => {
  const [theme, setTheme] = useState('dark');
  const [route, setRoute] = useState({ view: 'home', slug: null });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }
  }, [theme]);

  const navigate = useCallback((target) => {
    if (typeof target === 'string') {
      if (target.startsWith('blog:')) {
        const slug = target.slice('blog:'.length);
        setRoute({ view: 'blog-detail', slug });
      } else {
        setRoute({ view: target, slug: null });
      }
      return;
    }
    if (target && typeof target === 'object') {
      setRoute((prev) => ({
        view: target.view ?? prev.view,
        slug: target.slug ?? null
      }));
    }
  }, []);

  const pageComponent = useMemo(() => {
    switch (route.view) {
      case 'projects':
        return <ProjectsPage />;
      case 'blog':
        return <BlogPage setActivePage={navigate} />;
      case 'blog-detail':
        return (
          <BlogDetailPage
            slug={route.slug}
            onBack={() => navigate('blog')}
          />
        );
      case 'chat':
        return <ChatPage setActivePage={navigate} />;
      case 'home':
      default:
        return <HomePage setActivePage={navigate} />;
    }
  }, [route, navigate]);

  return (
    <div
      className={`app-shell ${
        theme === 'dark' ? 'text-[#f4f6ff]' : 'text-[#0c1a34]'
      }`}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-[#d6e2ff]/40 blur-3xl dark:bg-[#1d2d44]/40" />
      <div className="pointer-events-none absolute right-6 top-24 hidden h-72 w-72 rounded-full bg-[#bcd1ff]/40 blur-3xl dark:block dark:bg-[#24335a]/60" />

      <Navbar
        activeView={route.view}
        setActivePage={navigate}
        theme={theme}
        setTheme={setTheme}
      />
      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-28 sm:px-10 lg:px-16">
        {pageComponent}
      </main>
      <Footer />
    </div>
  );
};

export default App;
