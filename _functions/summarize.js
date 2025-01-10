export async function onRequest(context)
{
    const {request} = context;
    try {
        const { text } = await request.json();
    
        if (!text) {
          return new Response(
            JSON.stringify({ error: "Text is required" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
    
        const apiResponse = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.env.ACCESS_TOKEN}` // Environment variable
            },
            body: JSON.stringify({
            inputs: text,
            parameters: {
                max_length: 100,
                min_length: 30,
            },
            }),
        });
    
        if (!apiResponse.ok) {
            return new Response(
            JSON.stringify({ error: "Failed to summarize text" }),
            { status: apiResponse.status, headers: { "Content-Type": "application/json" } }
            );
        }
    
        const result = await apiResponse.json();
    
        return new Response(
            JSON.stringify({ summary: result[0]?.summary_text || "No summary available" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
}