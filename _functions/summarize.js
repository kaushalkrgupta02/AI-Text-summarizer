export async function onRequest(context) {
    const { request } = context;
    const data = await request.json();
  
    // Example summarization logic
    const summarizedText = data.text
      ? data.text.slice(0, 50) + "..."
      : "No text provided!";
  
    return new Response(JSON.stringify({ summary: summarizedText }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  