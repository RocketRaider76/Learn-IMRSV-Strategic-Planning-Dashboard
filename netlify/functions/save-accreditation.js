const { getStore } = require("@netlify/blobs");
exports.handler = async function(event) {
  const headers = {"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type"};
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  try {
    const body = JSON.parse(event.body || "{}");
    if (!body.accreditation) return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "No accreditation payload" }) };
    const store = getStore({ name: "lnm-accreditation", siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_AUTH_TOKEN });
    await store.setJSON("data", body.accreditation);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch(err) { return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: err.message }) }; }
};
