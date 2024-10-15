const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  let fileName;

  if (q.pathname === '/') {
    fileName = './index.html';
  } else {
    
    if (q.pathname.endsWith('/')) {
      fileName = `.${q.pathname.slice(0, -1)}.html`;
    } else {
      fileName = `.${q.pathname}.html`;
    }
  }

  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("404 Not Found");
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    }
  });
}).listen(8080);
