const API_URL = process.env.NEXT_PUBLIC_NEST_API_URL; //Agrego el NEXT_PUBLIC_ porque lo utilizo en un componente con "use client"

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include", //  para cookies
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();

    let message = "Ocurrió un error";

    if (Array.isArray(error.message)) {
      message = error.message.join("\n");
    } else if (typeof error.message === "string") {
      message = error.message;
    }

    throw new Error(message);
  }

  return response.json();
}
