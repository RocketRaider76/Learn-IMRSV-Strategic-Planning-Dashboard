const { getStore } = require("@netlify/blobs");
exports.handler = async function(event) {
  const headers = {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"};
  try {
    const username = event.queryStringParameters && event.queryStringParameters.username;
    if (!username) return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "No username" }) };
    const store = getStore({ name: "lnm-responses", siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_AUTH_TOKEN });
    let responses = {};
    try { responses = await store.get(`user-${username}`, { type: "json" }) || {}; } catch(e) {}
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, responses }) };
  } catch(err) { return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: err.message }) }; }
};
