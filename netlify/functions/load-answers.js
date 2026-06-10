import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");
    if (!username) {
      return new Response(JSON.stringify({ ok: false, error: "No username provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
    const store = getStore({ name: "pmsd-answers", consistency: "strong" });
    const data = await store.get(`answers-${username}`, { type: "json" });
    return new Response(JSON.stringify({ ok: true, data: data || null }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
};

export const config = { path: "/api/load-answers" };
