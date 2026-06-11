const { getStore } = require("@netlify/blobs");

exports.handler = async function(event, context) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };
  try {
    const store = getStore("pmsd-dashboard");
    const content = await store.get("published-content", { type: "json" });
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, content: content || null })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
};
