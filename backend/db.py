from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Dict, Iterable, List, Optional

DATA_DIR = Path(__file__).resolve().parent / "data"
DB_PATH = DATA_DIR / "rag.db"
DOCUMENTS_SEED_PATH = DATA_DIR / "knowledge_base.json"
PROJECTS_SEED_PATH = DATA_DIR / "projects_seed.json"
BLOGS_SEED_PATH = DATA_DIR / "blogs_seed.json"
STATE_PATH = DATA_DIR / ".seed_state.json"


# -------------------- Schema & Initialization -------------------- #

def create_schema() -> None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS documents (
                doc_id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                category TEXT NOT NULL,
                tags TEXT NOT NULL,
                content TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS projects (
                slug TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                short_summary TEXT NOT NULL,
                long_summary TEXT,
                tags TEXT NOT NULL,
                github_url TEXT,
                demo_url TEXT,
                hero_image TEXT,
                display_order INTEGER DEFAULT 0,
                project_type TEXT NOT NULL DEFAULT 'personal'
            )
            """
        )
        try:
            conn.execute(
                "ALTER TABLE projects ADD COLUMN project_type TEXT NOT NULL DEFAULT 'personal'"
            )
        except sqlite3.OperationalError:
            pass
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS blogs (
                slug TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                excerpt TEXT NOT NULL,
                content TEXT NOT NULL,
                content_format TEXT NOT NULL DEFAULT 'markdown',
                published_at TEXT,
                tags TEXT NOT NULL,
                hero_image TEXT,
                medium_link TEXT
            )
            """
        )
        try:
            conn.execute("ALTER TABLE blogs ADD COLUMN medium_link TEXT")
        except sqlite3.OperationalError:
            pass
        conn.commit()


def is_table_empty(table_name: str) -> bool:
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.execute(f"SELECT COUNT(*) FROM {table_name}")
        count = cursor.fetchone()[0]
    return count == 0


# -------------------- JSON Seed Handling -------------------- #

def load_json_seed(path: Path) -> List[Dict[str, str]]:
    if not path.exists():
        raise FileNotFoundError(f"Seed file not found at {path}")
    with path.open("r", encoding="utf-8") as handle:
        data = json.load(handle)
    if not isinstance(data, list):
        raise ValueError(f"Seed file {path} must contain a list of objects.")
    return data


def get_seed_file_state() -> Dict[str, float]:
    """Return modification timestamps of the seed JSON files."""
    files = {
        "documents": DOCUMENTS_SEED_PATH,
        "projects": PROJECTS_SEED_PATH,
        "blogs": BLOGS_SEED_PATH,
    }
    state = {}
    for key, path in files.items():
        if path.exists():
            state[key] = path.stat().st_mtime
    return state


def load_previous_state() -> Dict[str, float]:
    if not STATE_PATH.exists():
        return {}
    try:
        with STATE_PATH.open("r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def save_current_state(state: Dict[str, float]) -> None:
    with STATE_PATH.open("w", encoding="utf-8") as f:
        json.dump(state, f, indent=2)


# -------------------- Seeding Functions -------------------- #

def seed_documents(documents: Iterable[Dict[str, str]]) -> None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.executemany(
            """
            INSERT OR REPLACE INTO documents (doc_id, title, category, tags, content)
            VALUES (:doc_id, :title, :category, :tags, :content)
            """,
            [
                {
                    "doc_id": doc["doc_id"],
                    "title": doc["title"],
                    "category": doc["category"],
                    "tags": ", ".join(doc.get("tags", [])),
                    "content": doc["content"],
                }
                for doc in documents
            ],
        )
        conn.commit()


def seed_projects(projects: Iterable[Dict[str, str]]) -> None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.executemany(
            """
            INSERT OR REPLACE INTO projects
                (slug, name, short_summary, long_summary, tags, github_url, demo_url, hero_image, display_order, project_type)
            VALUES (:slug, :name, :short_summary, :long_summary, :tags, :github_url, :demo_url, :hero_image, :display_order, :project_type)
            """,
            [
                {
                    "slug": project["slug"],
                    "name": project["name"],
                    "short_summary": project.get("short_summary", ""),
                    "long_summary": project.get("long_summary", ""),
                    "tags": ", ".join(project.get("tags", [])),
                    "github_url": project.get("github_url"),
                    "demo_url": project.get("demo_url"),
                    "hero_image": project.get("hero_image"),
                    "display_order": project.get("display_order", 0),
                    "project_type": project.get("project_type", "personal"),
                }
                for project in projects
            ],
        )
        conn.commit()


def seed_blogs(blogs: Iterable[Dict[str, str]]) -> None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.executemany(
            """
            INSERT OR REPLACE INTO blogs
                (slug, title, excerpt, content, content_format, published_at, tags, hero_image, medium_link)
            VALUES (:slug, :title, :excerpt, :content, :content_format, :published_at, :tags, :hero_image, :medium_link)
            """,
            [
                {
                    "slug": blog["slug"],
                    "title": blog["title"],
                    "excerpt": blog["excerpt"],
                    "content": blog["content"],
                    "content_format": blog.get("content_format", "markdown"),
                    "published_at": blog.get("published_at"),
                    "tags": ", ".join(blog.get("tags", [])),
                    "hero_image": blog.get("hero_image"),
                    "medium_link": blog.get("medium_link"),
                }
                for blog in blogs
            ],
        )
        conn.commit()


# -------------------- Utility Functions -------------------- #

def parse_tags(tag_string: Optional[str]) -> List[str]:
    if not tag_string:
        return []
    return [tag.strip() for tag in tag_string.split(",") if tag.strip()]


def get_all_documents() -> List[Dict[str, str]]:
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.execute(
            "SELECT doc_id, title, category, tags, content FROM documents"
        )
        return [dict(row) for row in cursor.fetchall()]


def get_all_projects() -> List[Dict[str, str]]:
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.execute(
            """
            SELECT slug, name, short_summary, long_summary, tags, github_url, demo_url, hero_image, display_order, project_type
            FROM projects
            ORDER BY display_order ASC, name ASC
            """
        )
        projects = [dict(row) for row in cursor.fetchall()]
    for project in projects:
        project["tags"] = parse_tags(project.get("tags"))
        project["project_type"] = project.get("project_type") or "personal"
    return projects


def get_all_blogs() -> List[Dict[str, str]]:
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.execute(
            """
            SELECT slug, title, excerpt, published_at, tags, hero_image, medium_link
            FROM blogs
            ORDER BY COALESCE(published_at, '') DESC, title ASC
            """
        )
        blogs = [dict(row) for row in cursor.fetchall()]
    for blog in blogs:
        blog["tags"] = parse_tags(blog.get("tags"))
        blog["medium_link"] = blog.get("medium_link")
    return blogs


def get_blog_by_slug(slug: str) -> Optional[Dict[str, str]]:
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.execute(
            """
            SELECT slug, title, excerpt, content, content_format, published_at, tags, hero_image, medium_link
            FROM blogs
            WHERE slug = ?
            """,
            (slug,),
        )
        row = cursor.fetchone()
    if row is None:
        return None
    blog = dict(row)
    blog["tags"] = parse_tags(blog.get("tags"))
    blog["medium_link"] = blog.get("medium_link")
    return blog


# -------------------- Database Initialization -------------------- #

def initialize_database(force_reseed: bool = False) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    create_schema()

    prev_state = load_previous_state()
    curr_state = get_seed_file_state()
    json_changed = any(
        prev_state.get(k) != curr_state.get(k) for k in curr_state.keys()
    )

    if force_reseed or json_changed:
        print("Seed files changed — reseeding database...")
        seed_documents(load_json_seed(DOCUMENTS_SEED_PATH))
        seed_projects(load_json_seed(PROJECTS_SEED_PATH))
        seed_blogs(load_json_seed(BLOGS_SEED_PATH))
        save_current_state(curr_state)
    else:
        print("Seed files unchanged — skipping reseed.")
        if is_table_empty("documents"):
            seed_documents(load_json_seed(DOCUMENTS_SEED_PATH))
        if is_table_empty("projects"):
            seed_projects(load_json_seed(PROJECTS_SEED_PATH))
        if is_table_empty("blogs"):
            seed_blogs(load_json_seed(BLOGS_SEED_PATH))


# -------------------- Main -------------------- #

if __name__ == "__main__":
    import sys
    force_flag = "--force" in sys.argv
    initialize_database(force_flag)
    print(f"Database initialized at {DB_PATH}")
    print(f" - documents: {len(get_all_documents())}")
    print(f" - projects: {len(get_all_projects())}")
    print(f" - blogs: {len(get_all_blogs())}")
