import { api } from "@/lib/api";

type WhoAmI = { userId: string; role: "patient" | "doctor" | "admin" | "guest" };

export default async function IdentityExamplePage() {
  // Example hitting a gateway route like /identity/whoami
  let data: WhoAmI | null = null;
  let err: string | null = null;

  try {
    data = await api.get<WhoAmI>("/identity/whoami");
  } catch (e: any) {
    err = e?.message ?? "Unknown error";
  }

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Identity: Who Am I</h1>
      {err ? (
        <div className="rounded-md border p-4 text-red-700 bg-red-50">
          Failed to fetch: {err}
        </div>
      ) : (
        <pre className="rounded-md border p-4 bg-gray-50">{JSON.stringify(data, null, 2)}</pre>
      )}
      <p className="text-sm text-gray-500">
        Configure <code>NEXT_PUBLIC_API_GATEWAY_URL</code> in your <code>.env.local</code>.
      </p>
    </main>
  );
}
