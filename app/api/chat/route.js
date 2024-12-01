import axios from 'axios';

export async function POST(request) {
  try {
    const { message } = await request.json();
    console.log('Received message:', message);

    // Calling the FastAPI backend
    const response = await axios.post('https://overlay-test-1036226550466.europe-north1.run.app/ask', {
      message: message,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
      }
    });

    console.log('FastAPI response:', response.data);

    // Return FastAPI's response to the frontend
    return new Response(JSON.stringify({ reply: response.data.reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error calling FastAPI:', error);
    return new Response(JSON.stringify({ error: 'Error calling FastAPI' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


