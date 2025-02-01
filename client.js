const http = require("node:http");

// Creating an HTTP agent with keepAlive enabled to reuse the same TCP connection
const agent = new http.Agent({ keepAlive: true });

// Creating an HTTP request object
const request = http.request({
  agent: agent, // Using the custom agent to keep the connection alive
  hostname: "localhost", // Server hostname (local server in this case)
  port: 8080, // Server port
  method: "POST", // HTTP method (POST request to send data)
  path: "/create-post", // API endpoint path
  headers: {
    "Content-Type": "application/json", // Defining request content type as JSON
    name: "Joe", // some custom header
  },
});

// This event is emitted only once --> when we get the response
request.on("response", (response) => {
  console.log("--------- STATUS: ---------");
  console.log(response.statusCode);

  console.log("--------- HEADERS: ---------");
  console.log(response.headers);

  console.log("--------- BODY: ---------");
  response.on("data", (chunk) => {
    console.log(chunk.toString("utf-8"));
  });

  response.on("end", () => {
    console.log("No more data in response.");
  });
});

request.end(
  JSON.stringify({
    title: "Title of my post",
    body: "This is some text and more and more.",
  })
);
