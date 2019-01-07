const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const fetch = require("node-fetch");
const queryString = require("query-string");

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/patron", (req, res) => {
  const { password_confirmation, ...patron } = req.body;
  console.log(patron);

  const url = `https://api.libib.com/patrons?${queryString.stringify(patron)}`;

  console.log(url);

  fetch(url, {
    method: "POST",
    headers: {
      // "x-api-key": process.env.LIBIB_API_KEY,
      // "x-api-user": process.env.LIBIB_API_USER
      "x-api-key":
        "90da77e4bbe81857a040fe09e49d1b869e29923c2dce169d73d877bef02d24db",
      "x-api-user": "33b5682b44ff7d7b8a9209ff454746ab16f3e006"
    }
  })
    .then(r => r.json())
    .then(r => {
      console.log("response", r.body);
      res.sendStatus(201);
    })
    .catch(r => {
      console.log("res fail", r.body);
      res.sendStatus(400);
    });
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
