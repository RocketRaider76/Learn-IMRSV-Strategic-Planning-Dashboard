const { getStore } = require("@netlify/blobs");
exports.handler = async function(event) {
  const headers = {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"};
  try {
    const store = getStore({ name: "lnm-responses", siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_AUTH_TOKEN });
    const { blobs } = await store.list();
    const responses = {};
    await Promise.all(blobs.map(async b => {
      const username = b.key.replace('user-','');
      try { responses[username] = await store.get(b.key, { type: "json" }) || {}; } catch(e) {}
    }));
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, responses }) };
  } catch(err) { return { statusCode: 200, headers, body: JSON.stringify({ ok: true, responses: {} }) }; }
};
