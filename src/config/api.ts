export const BASE_URL = process.env.REACT_APP_API_URL;

interface FetchOptions extends RequestInit {
  path: string;
}

export const apiFetch = async ({ path, ...options }: FetchOptions) => {
  const url = `${BASE_URL}${path}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
