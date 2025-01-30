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
  },
});

// Event listener for receiving the response from the server
request.on("response", (response) => {
  console.log("Response received from server:");

  // Response is a readable stream, so we need to listen for "data" events
  response.on("data", (chunk) => {
    console.log("Chunk received:", chunk.toString()); // Convert buffer to string
  });

  // Response is complete
  response.on("end", () => {
    console.log("Response fully received.");
  });
});

// Writing multiple JSON messages to the request body
request.write(JSON.stringify({ message: "Hi there!" })); // Sending first message
request.write(JSON.stringify({ message: "How are you doing?" })); // Sending second message
request.write(JSON.stringify({ message: "Hey, you still there?" })); // Sending third message

/**
 * The `end` method signals the completion of the request.
 * - If we don't call `end()`, the request will remain open and the server will keep waiting.
 * - `end()` also ensures that the last chunk of data is sent properly.
 * - After calling `end()`, we cannot write more data to this request.
 */
request.end(
  JSON.stringify({
    message: "This is going to be my last message!",
  })
);
