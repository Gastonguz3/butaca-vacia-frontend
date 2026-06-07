const API_URL = process.env.NEST_API_URL;

export async function apiFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}
