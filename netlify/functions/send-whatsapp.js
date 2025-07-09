// netlify/functions/send-whatsapp.js

const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { to, message } = JSON.parse(event.body);
  const token = process.env.ULTRAMSG_TOKEN;
  const instanceId = process.env.ULTRAMSG_INSTANCE_ID;

  try {
    const response = await fetch(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        token,
        to,
        body: message,
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message' }),
    };
  }
};
