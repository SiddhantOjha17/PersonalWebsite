# Repository Guidelines

## Project Structure & Module Organization
- `frontend/` is a Vite + Tailwind React app; shared UI sits in `src/components/`, page shells in `src/pages/`, and theme/nav state in `src/App.jsx`. Keep globals in `src/index.css`.
- `backend/` hosts FastAPI + LangGraph. `main.py` powers chat + REST endpoints, while `db.py` seeds and queries the SQLite store in `backend/data/rag.db`.
- Seed data lives in `backend/data/knowledge_base.json`, `projects_seed.json`, and `blogs_seed.json`. After edits run `python -m backend.db`, then restart FastAPI to rebuild TF-IDF caches. Projects support a `project_type` field (`personal`/`work`) for UI badges, and blogs accept an optional `medium_link` which opens externally (otherwise the local detail page renders Markdown).

## Build, Test, and Development Commands
- Frontend: `npm install` then `npm run dev` (port 5173). Run `npm run build`/`preview` before shipping and `npm run lint` ahead of PRs.
- Backend: `python -m venv .venv && source .venv/bin/activate`, `pip install -r requirements.txt`, then run `uvicorn backend.main:app --reload --port 8000`. New dependencies include `scikit-learn` for TF-IDF retrieval.
- Reseed or inspect the knowledge base with `python -m backend.db`; connect via `sqlite3 backend/data/rag.db`. Restart FastAPI after reseeding to rebuild embeddings.

## Coding Style & Naming Conventions
- React files follow PascalCase names and default exports; keep hooks at the top of components and use `prop-types` to document props.
- Tailwind utilities should read layout → spacing → color → effects. Centralize aura/gradient helpers in `src/index.css` (`app-shell`, `soft-btn`, etc.) instead of inline styles.
- Python modules use snake_case with type hints. LangGraph nodes stay pure; factor helpers into `db.py` or new modules as logic grows. Blog content is stored as Markdown—stick to heading hierarchy, code fences, and lists (GFM supported).

## Testing Guidelines
- Add Vitest component tests for navigation, blog routing, or theme behaviour; colocate specs near the component when practical.
- Cover FastAPI pathways with `httpx.AsyncClient` tests under `backend/tests/`, especially guardrail refusals, NAVIGATE actions, vector retrieval, and `/api/projects` or `/api/blogs/{slug}`.
- Manual smoke: `curl -X POST http://localhost:8000/api/chat -H "Content-Type: application/json" -d '{"message":"Tell me about Spotlight AI"}'` and confirm the answer, navigation, and guardrail response.

## Commit & Pull Request Guidelines
- Use Conventional Commits (e.g. `feat: wire sqlite rag store`) with subjects ≤72 chars.
- PRs must list automated checks, describe functional impact, and attach screenshots for UI-facing updates.
- Reference issues via `Closes #123` and call out data or schema migrations, including RAG reseeds.

## Security & Configuration Tips
- Keep credentials out of the repo (use `.env`), validate payloads with Pydantic, and refresh the guardrail prompt whenever the knowledge base changes.
