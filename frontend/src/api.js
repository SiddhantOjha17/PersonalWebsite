const handleResponse = async (response) => {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }
  return response.json();
};

export const fetchProjects = () => fetch('/api/projects').then(handleResponse);

export const fetchBlogs = () => fetch('/api/blogs').then(handleResponse);

export const fetchBlogBySlug = (slug) =>
  fetch(`/api/blogs/${encodeURIComponent(slug)}`).then(handleResponse);
