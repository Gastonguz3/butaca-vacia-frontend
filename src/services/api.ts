const API_URL = process.env.NEXT_PUBLIC_NEST_API_URL; //Agrego el NEXT_PUBLIC_ porque lo utilizo en un componente con "use client"

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include", //  para cookies
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const body = await response.text();

    throw new Error(`${response.status} ${response.statusText} - ${body}`);
  }

  return response.json();
}
