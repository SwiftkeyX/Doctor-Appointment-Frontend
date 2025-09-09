// Simple fetch wrapper with JSON + error handling
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function request<T>(
  path: string,
  opts: { method?: HttpMethod; body?: unknown; headers?: Record<string,string> } = {},
  base = process.env.NEXT_PUBLIC_API_GATEWAY_URL
): Promise<T> {
  if (!base) throw new Error("Missing NEXT_PUBLIC_API_GATEWAY_URL");
  const url = `${base}${path}`;

  const res = await fetch(url, {
    method: opts.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers ?? {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    // include credentials if your gateway uses cookies:
    // credentials: "include",
    cache: "no-store", // for SSR freshness; adjust per use-case
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }
  return (await res.json()) as T;
}

export const api = {
  get: <T>(path: string, headers?: Record<string,string>) =>
    request<T>(path, { method: "GET", headers }),
  post: <T>(path: string, body?: unknown, headers?: Record<string,string>) =>
    request<T>(path, { method: "POST", body, headers }),
  put:  <T>(path: string, body?: unknown, headers?: Record<string,string>) =>
    request<T>(path, { method: "PUT", body, headers }),
  del:  <T>(path: string, headers?: Record<string,string>) =>
    request<T>(path, { method: "DELETE", headers }),
};
