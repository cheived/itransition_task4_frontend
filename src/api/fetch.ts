export async function fetchWithAuth(url: string, options?: RequestInit) {
  const loginUrl = "/login";
  let tokenData = null;
  if (localStorage.token) {
    tokenData = JSON.parse(localStorage.token);
  } else {
    window.location.replace(loginUrl);
  }

  if (!options) {
    options = {};
  }

  if (!options.headers) {
    options.headers = {};
  }

  if (tokenData) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${tokenData}`,
    };
  }

  return fetch(import.meta.env.VITE_API_URL + url, options);
}
