const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 8080;
const appDir = path.join(__dirname, "app");

const server = http.createServer((req, res) => {
  let filePath = req.url === "/" ? "/index.html" : req.url;
  const fullPath = path.join(appDir, filePath);

  fs.readFile(fullPath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("404 Not Found");
    } else {
      const ext = path.extname(fullPath);
      const contentType =
        {
          ".html": "text/html",
          ".js": "application/javascript",
          ".css": "text/css",
        }[ext] || "text/plain";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
