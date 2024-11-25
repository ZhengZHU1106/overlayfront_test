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
        'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ5NzQwYTcwYjA5NzJkY2NmNzVmYTg4YmM1MjliZDE2YTMwNTczYmQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMjU1NTk0MDU1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjMyNTU1OTQwNTU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwMzY3MzY3NjYxNTExMDU0Mzg2IiwiaGQiOiJvdmVybGF5LmRrIiwiZW1haWwiOiJoZWxsb0BvdmVybGF5LmRrIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJfekNXN0F2RkQxaDBBMl9GeFBhdnN3IiwiaWF0IjoxNzMyMjYzNDU4LCJleHAiOjE3MzIyNjcwNTh9.LnBLCxiyp-YDygoZA5o0lofB-k8S90TyqUZIQ_LOuZRBHIDUzaRTfc9EipzzTcVZPrGeToFom5YTSvMibWFY1LitOWZoDsEUKdWM1PXKeHGaJtH7iaLOEgZb2BpbM7Nw_0udYTubjW4rbtLK0WWwxEtayeTfwTuxqcuGP-tUWK7MdLOEtDHqha5dY7WonCiTJcQvcRWfcNOVUEkmUjUPEO3skOIQaxW2crzGSgNK6PQDTPSpm_fq9RCNr5pSAaeAAkcX9IkOWa87Vi_OZuvO8zavf4Z0Vi6LeKALt5oHJOjK2AjDCF27jPUauuTH6pxDPRJyrVRpw_4y-al-ppQIYg`
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


