import PropTypes from 'prop-types';
import heroImage from '../assets/siddhant-hero.jpg';

const focusAreas = [
  {
    title: 'GraphRAG Pipelines',
    description: 'Transform raw data into graph-grounded retrieval that stays faithful to source documents.'
  },
  {
    title: 'Agentic Workflows',
    description: 'Design multi-agent systems that blend orchestration, eval loops, and guardrails for production.'
  },
  {
    title: 'LLM Evaluation',
    description: 'Deploy experiment harnesses with BLEU/ROUGE scoring, scenario synthesis, and observability.'
  }
];

const HomePage = ({ setActivePage }) => {
  return (
    <section className="relative flex flex-col gap-12">
      <div className="card-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/20 to-transparent dark:from-[#1a2246]/80 dark:via-transparent dark:to-[#0d1533]" />
        <div className="relative grid gap-10 p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#4c5f93] dark:text-[#90a4ff]">
              Siddhant Ojha
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-[#0f1a35] dark:text-[#eef1ff] sm:text-5xl">
              An AI Engineer developing, innovating, and learning as I iterate through life.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#374a73] dark:text-[#b6c1ff]">
              I'm driven by the challenge of making AI both powerful and practical. My approach is to build intelligent systems you can trust, ensuring they're grounded in facts. Ultimately, my goal is to create solutions that are not just innovative, but also dependable and deliver real-world value.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setActivePage('projects')}
                className="soft-btn-primary"
              >
                Explore Projects
              </button>
              <button
                onClick={() => setActivePage('chat')}
                className="soft-btn-outline"
              >
                Talk to the Agent
              </button>
              <button
                onClick={() => setActivePage('blog')}
                className="soft-btn-outline"
              >
                Read Insights
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="rounded-2xl bg-white/80 px-5 py-3 text-sm text-[#31426b] shadow-inner shadow-white/40 backdrop-blur-lg dark:bg-white/5 dark:text-[#dce3ff]">
                <span className="font-semibold">!!</span> Let's build some cool shit together.
              </div>
              <div className="rounded-2xl bg-[#eff4ff]/90 px-5 py-3 text-sm text-[#31426b] shadow-inner shadow-white/60 backdrop-blur-lg dark:bg-[#202b52]/80 dark:text-[#dce3ff]">
                LangGraph · HuggingFace · PyTorch · AWS · Neo4j
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-[#8fa9ff]/30 via-transparent to-transparent blur-3xl dark:from-[#30407a]/60" />
            <div className="relative rounded-[36px] border border-white/70 bg-white/80 p-4 shadow-2xl shadow-[#90a4ff]/30 backdrop-blur-2xl dark:border-white/10 dark:bg-[#101932]/80">
              <img
                src={heroImage}
                alt="Siddhant Ojha smiling among sunflowers"
                className="aspect-[4/5] w-full rounded-[28px] object-cover object-center shadow-lg shadow-[#4c6ad7]/40"
              />
              <div className="mt-4 flex items-start justify-between gap-4 text-sm text-[#31426b] dark:text-[#dce3ff]">
                <div>
                  <p className="font-semibold">Sunflower Labs (soon maybe?)</p>
                  <p className="text-xs text-[#51628d] dark:text-[#94a0d9]">Where ideas bloom into shipped solutions.</p>
                </div>
                <span className="rounded-full bg-gradient-to-r from-[#4c6ad7] to-[#6f8cff] px-3 py-1 text-xs font-semibold text-white">
                  Always Learning
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {focusAreas.map((item) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg shadow-[#90a4ff]/10 transition duration-300 hover:-translate-y-1 hover:shadow-[#6f8cff]/20 dark:border-white/10 dark:bg-[#111a36]/80 dark:shadow-black/40"
          >
            <div className="absolute inset-0 translate-y-10 rounded-full bg-gradient-to-br from-[#8fa9ff]/40 to-transparent opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 dark:from-[#2f3f70]/60" />
            <div className="relative space-y-3">
              <span className="inline-flex rounded-full bg-[#eff4ff]/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#4c5f93] dark:bg-[#1d2750]/80 dark:text-[#9fb2ff]">
                Focus
              </span>
              <h3 className="text-lg font-semibold text-[#1a2850] dark:text-[#eef1ff]">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[#3b4d78] dark:text-[#b4c2ff]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card-surface relative overflow-hidden p-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6f8cff]/10 via-transparent to-transparent dark:from-[#24335a]/40" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#0f1a35] dark:text-white">
              Let's build the next intelligent workflow together.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[#364674] dark:text-[#c3cbff]">
              I’m based in India and open to collaborations on all kinds of projects/solutions. Ping me directly 
              via my socials or drop a text on my number.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-[#2f3e68] dark:text-[#c3cbff]">
              <a
                href="mailto:siddhantojha17@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 font-medium shadow-inner shadow-white/60 transition hover:-translate-y-0.5 hover:text-[#1f3272] dark:bg-[#161f3a]/80 dark:shadow-black/30"
              >
                <span aria-hidden="true">✉</span>
                siddhantojha17@gmail.com
              </a>
              <a
                href="tel:+919920057457"
                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 font-medium shadow-inner shadow-white/60 transition hover:-translate-y-0.5 hover:text-[#1f3272] dark:bg-[#161f3a]/80 dark:shadow-black/30"
              >
                <span aria-hidden="true">📞</span>
                +91 99200 57457
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActivePage('chat')}
                className="soft-btn-primary px-6 py-3"
              >
                Start a conversation
              </button>
              <a
                href="https://www.linkedin.com/in/siddhantojha/"
                target="_blank"
                rel="noopener noreferrer"
                className="soft-btn-outline px-6 py-3"
              >
                Connect on LinkedIn
              </a>              
              <a
                href="https://www.kaggle.com/siddhantojha17"
                target="_blank"
                rel="noopener noreferrer"
                className="soft-btn-outline flex items-center gap-2 px-6 py-3"
              >
                <svg 
                  className="h-4 w-4" 
                  role="img" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="currentColor" 
                >
                  <title>Kaggle</title>
                  <path d="M14.994 13.344l-3.306 3.306 3.306 3.306 3.306-3.306-3.306-3.306zm-3.336-3.336l-4.224 4.224-3.306-3.306 4.224-4.224 3.306 3.306zm3.336 0l3.306-3.306-4.224-4.224-3.306 3.306 4.224 4.224z"/>
                </svg>
                <span>Explore on Kaggle</span>
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-white/40 bg-white/80 p-6 text-sm text-[#2f3e68] shadow-lg shadow-[#90a4ff]/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#121a36]/80 dark:text-[#d6dcff]">
            <h3 className="text-base font-semibold text-[#1d2c52] dark:text-[#eef1ff]">
              Available For
            </h3>
            <ul className="mt-4 space-y-2">
              <li>• Finetuning LLMs and SLMs</li>
              <li>• Agentic workflow design & orchestration</li>
              <li>• LLM evaluation harnesses with guardrails</li>
              <li>• Workshops on Reinforcement Learning & Agentic AI</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

HomePage.propTypes = {
  setActivePage: PropTypes.func.isRequired
};

export default HomePage;
