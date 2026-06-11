const { getStore } = require("@netlify/blobs");
exports.handler = async function(event) {
  const headers = {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"};
  try {
    const store = getStore({ name: "lnm-platform", siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_AUTH_TOKEN });
    const config = await store.get("config", { type: "json" });
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, config: config || null }) };
  } catch(err) { return { statusCode: 200, headers, body: JSON.stringify({ ok: true, config: null }) }; }
};
