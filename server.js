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
      "x-api-key": process.env.LIBIB_API_KEY,
      "x-api-user": process.env.LIBIB_API_USER
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
