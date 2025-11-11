export async function handler(event) {
  const videoId = event.queryStringParameters.id;
  const API_KEY = process.env.YT_API_KEY;
  
  if (!videoId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing videoId" }),
    };
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server Error", details: err.message }),
    };
  }
}
