const { getStore } = require("@netlify/blobs");
exports.handler = async function(event) {
  const headers = {"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type"};
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  try {
    const body = JSON.parse(event.body || "{}");
    if (!body.username || !body.formId || !body.answers) return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Missing fields" }) };
    const store = getStore({ name: "lnm-responses", siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_AUTH_TOKEN });
    // Load existing responses for this user
    let userResp = {};
    try { userResp = await store.get(`user-${body.username}`, { type: "json" }) || {}; } catch(e) {}
    userResp[body.formId] = body.answers;
    await store.setJSON(`user-${body.username}`, userResp);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch(err) { return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: err.message }) }; }
};
