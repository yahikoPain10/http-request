const http = require("node:http");
const fs = require("node:fs");

const read = fs.readFileSync;

function logRequest(req) {
  let body = "";

  req.on("data", (c) => (body += c.toString()));
  req.on("end", () => {
    console.log({
      method: req.method,
      url: req.url,
      headers: Object.fromEntries(
        Object.entries(req.headers).sort((a, b) => a[0].localeCompare(b[0]))
      ),
      body,
    });
  });
}

function setCookie(res, ...cookies) {
  res.setHeader("Set-Cookie", cookies);
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse<http.IncomingMessage> & {req: http.IncomingMessage;}} res
 */

function setCors(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
}

http
  .createServer((req, res) => {
    
    if(req.url !== '/favicon.ico') {
      logRequest(req);
    }

    if(req.url === "/") {
      res.setHeader("Content-Type", "text/html");
      res.end(read("./same-origin/index.html"));
    }

    else if(req.url === "/cross") {
      setCors(req, res);
      res.end("Hello, world");
    }
    
    else if(req.url === "/redirect") {
      setCors(req, res);
      res.statusCode = 302;
      res.setHeader("Location", "http://localhost:3000/cross");
      res.end();
    }

    else if(req.url === "/same.js") {
      res.setHeader("Content-Type", "text/javascript");
      res.end(read("./same-origin/same.js"));
    }

    else {
      res.end("Same origin request");
    }


  })
  .listen(3000);
