export async function fetchWithAuth(url: string, options?: RequestInit) {
  const loginUrl = "/login";
  let tokenData = null;
  if (localStorage.token) {
    tokenData = JSON.parse(localStorage.token);
  } else {
    window.location.replace(loginUrl);
  }

  if (!options?.headers && options) {
    options.headers = {};
  }

  if (tokenData && options) {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${tokenData}`);
    options.headers = headers;
  }

  return fetch(import.meta.env.VITE_API_URL + url, options);
}
