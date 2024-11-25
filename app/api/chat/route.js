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
        'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ5NzQwYTcwYjA5NzJkY2NmNzVmYTg4YmM1MjliZDE2YTMwNTczYmQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMjU1NTk0MDU1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjMyNTU1OTQwNTU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwMzY3MzY3NjYxNTExMDU0Mzg2IiwiaGQiOiJvdmVybGF5LmRrIiwiZW1haWwiOiJoZWxsb0BvdmVybGF5LmRrIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ6cWdJbDZtLU5SUG5Kd1RQRHMzcUFnIiwiaWF0IjoxNzMyNTQ3Mzk1LCJleHAiOjE3MzI1NTA5OTV9.L5FV9QbnXgmQBXnD8Sa9fsTL64eyYlNQCqIJtEIY1yOTbhIfsLuQNtZxsbFY_J272We_0jHD3P88tq451-WYGD-DR0-f5R1W6EuxPw5q06fo3VSGzkP-atpX51StGSOo0BVuTqXt2yRJIL2mO77_DEKnQb1mYy6PHKlgfaaOe84KRct8WzgFD_tdzt43D9EjFlyBVehNGOQ7DLMK-0wLDumSrOjCnGPlueslRm9nwtz7vhS78rpkq84BZOGIh5SC5YSbbcxLOTcD3l0VZCPUu5UNukc_XNXRBxlWYMhXvmYax1KAzh70GAWdNUnoR1N7-QVxWyOjuvjfSXkvBzQhCg`
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


