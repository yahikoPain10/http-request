const req = new Request("http://localhost:3000/cross", {
  // Default: GET
  method: "POST",
  cache: "no-store",
  headers: {
    accept: "text/html, */*",
    "X-custom": "value"
  },
  // Will throw an error if method is either GET or HEAD
  body: "Hello, world",
})

const sameReqWithDifferentBody = new Request(req, {
  body: "Orewa pain"
})

// fetch() parameters are identical to those of the Request() constructor.
fetch(sameReqWithDifferentBody)
.then(async res => {
  console.log("OK: ", res.ok); // true if 200 <= status < 300
  console.log("Status: ", res.status);
  console.log("StatusText: ", res.statusText);
  console.log("Redirected: ", res.redirected);
  console.log("Text: ", await res.text());
  console.log("BodyUsed: ", res.bodyUsed); // true
  // console.log("Blob: ", await res.blob());
  // console.log("Json: ", await res.json());
  console.log("Response url: ", res.url);
})
.catch(console.error);