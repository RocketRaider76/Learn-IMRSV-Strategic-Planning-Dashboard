const { getStore } = require("@netlify/blobs");

exports.handler = async function(event, context) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };
  try {
    const username = event.queryStringParameters && event.queryStringParameters.username;
    if (!username) {
      return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "No username provided" }) };
    }
    const store = getStore({
      name: "pmsd-answers",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_AUTH_TOKEN
    });
    const data = await store.get(`answers-${username}`, { type: "json" });
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, data: data || null })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
};
