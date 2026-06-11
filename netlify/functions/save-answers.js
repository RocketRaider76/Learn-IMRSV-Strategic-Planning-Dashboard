const { getStore } = require("@netlify/blobs");

exports.handler = async function(event, context) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }
  try {
    const body = JSON.parse(event.body || "{}");
    if (!body.username || !body.answers) {
      return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Missing username or answers" }) };
    }
    const store = getStore({
      name: "pmsd-answers",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_AUTH_TOKEN
    });
    await store.setJSON(`answers-${body.username}`, {
      username: body.username,
      answers: body.answers,
      savedAt: new Date().toISOString()
    });
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: err.message }) };
  }
};
