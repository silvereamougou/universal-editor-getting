// netlify/functions/subscribe.js
export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email } = JSON.parse(event.body);

  const response = await fetch('https://api.mailersend.com/v1/email', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: {
        email: 'digiamg2412@gmail.com',
        name: 'DIGIAMG',
      },
      to: [{ email, name: email.split('@')[0] }],
      template_id: '3yxj6lj66r14do2r',
      variables: [
        {
          email,
          substitutions: [
            {
              var: 'name',
              value: email.split('@')[0],
            },
          ],
        },
      ],
    }),
  });

  if (response.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } else {
    const error = await response.json();
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error }),
    };
  }
}
