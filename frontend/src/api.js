const API_BASE = import.meta.env.VITE_API_BASE || '';

const handleResponse = async (response) => {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }
  return response.json();
};

const apiFetch = (path, options) =>
  fetch(`${API_BASE}${path}`, options).then(handleResponse);

export const fetchProjects = () => apiFetch('/api/projects');

export const fetchBlogs = () => apiFetch('/api/blogs');

export const fetchBlogBySlug = (slug) =>
  apiFetch(`/api/blogs/${encodeURIComponent(slug)}`);
