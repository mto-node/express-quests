// Créer Serveur avec module HTTP
const http = require("http");
const port = 8000;

const requestHandler = (request, response) => {
  console.log(request.url);
  //   response.end("Hello Node.js Server!");
  // Routage
  if (request.url === "/") {
    response.end("Hello Node.js Server!");
  } else if (request.url === "/about") {
    response.end("This demonstrates routing with Node.js.");
  } else {
    response.end("Default page (URLs other than / and /about)");
  }
};

const server = http.createServer(requestHandler);
server.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

