// Example contract for Card Ledger image lookup.
// Run with: node card-image-endpoint.example.js
// Configure the app endpoint as: http://127.0.0.1:8787/card-image?q={query}
//
// Production implementation should call an approved source such as:
// - eBay Browse API search, using itemSummaries[0].image.imageUrl
// - Hobby Card Index, if you have account/API permission for card images and trends
// - a licensed marketplace/image provider
// - an internal matcher that returns an allowed image URL

const http = require("http");

const port = 8787;

function sendJson(response, status, data) {
  response.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  response.end(JSON.stringify(data));
}

http
  .createServer(async (request, response) => {
    if (request.method === "OPTIONS") {
      response.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      });
      response.end();
      return;
    }

    const url = new URL(request.url, `http://127.0.0.1:${port}`);
    if (url.pathname !== "/card-image") {
      sendJson(response, 404, { error: "Not found" });
      return;
    }

    const query = url.searchParams.get("q") || "";
    // Replace this stub with eBay Browse API / Hobby Card Index / licensed image-source lookup.
    sendJson(response, 200, {
      query,
      imageUrl: "",
      sourceUrl: "",
      provider: "Example"
    });
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`Card image endpoint listening on http://127.0.0.1:${port}/card-image?q={query}`);
  });
