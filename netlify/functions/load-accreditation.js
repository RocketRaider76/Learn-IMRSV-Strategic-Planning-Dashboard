const { getStore } = require("@netlify/blobs");
exports.handler = async function(event) {
  const headers = {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"};
  try {
    const store = getStore({ name: "lnm-accreditation", siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_AUTH_TOKEN });
    const accreditation = await store.get("data", { type: "json" });
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, accreditation: accreditation || null }) };
  } catch(err) { return { statusCode: 200, headers, body: JSON.stringify({ ok: true, accreditation: null }) }; }
};
