const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const { username } = JSON.parse(event.body || "{}");

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return { statusCode: 500, body: "Bot token or chat ID not set" };
  }

  const message = `🔔 DemoWallet Login Alert\nUser: ${username}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      }
    );

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "ok", result }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
