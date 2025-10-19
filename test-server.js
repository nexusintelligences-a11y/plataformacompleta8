console.log("Starting test server...");
const PORT = parseInt(process.env.PORT || '5000', 10);

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Test server working!\n');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server listening on port ${PORT}`);
});
