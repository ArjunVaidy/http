const http = require("http");

const server = http.createServer();

// listends for request event
// in the callback we have request stream and response stream separately
server.on("request", (request, response) => {
  console.log("-----URL--------");
  console.log(request.url);
  console.log("-----METHOD--------");
  console.log(request.method);
  console.log("-----HEADERS--------");
  console.log(request.headers);
  console.log("-----BODY--------");
  // body of the request is not the property because of memory issue might happen
  // If big memory all of a sudden used for buffer, then it would create a break in application
  // hence it is streams and data event is used to get the chunk of data

  let data = "";

  request.on("data", (chunk) => {
    data += chunk.toString();
    console.log(data);
  });

  request.on("end", () => {
    data = JSON.parse(data);

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        message: `Post with title ${data.title} was created by ${name}`,
      })
    );
  });
});

server.listen("8080", () => {
  console.log("server listening on 8080 port");
});
