const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbAdapter = require("./db/adapters/mock");

const PORT = process.env.PORT || 3000;
let SERVER_NAME = process.env.SERVER || `server-${Math.floor(Math.random() * 1000)}`;

console.info(`🏃‍♀️ Running \x1b[33m'${SERVER_NAME}'\x1b[0m in port \x1b[36m${PORT}\x1b[0m...`)

if (!process.env.SERVER) {
  console.warn(`\t🤫   (Psst... You can stablish server name with \x1b[7mSERVER_NAME\x1b[0m env var.)`);
}

const db = dbAdapter();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
})

// GET /suggestions
app.get("/suggestions", (req, res) => {
  res.end(JSON.stringify(db.getSuggestions()))
});

// GET /suggestions/likes
app.get("/suggestions/likes", (req, res) => {
  res.end(JSON.stringify(db.getLikes()))
});

// GET /suggestions/dislikes
app.get("/suggestions/dislikes", (req, res) => {
  res.end(JSON.stringify(db.getDislikes()))
});

// GET /suggestions/:id
app.get("/suggestions/:id", (req, res) => {
  const suggestion = db.getSuggestion(req.params.id);

  if (suggestion) {
    res.end(JSON.stringify(db.getSuggestion(req.params.id)))
    return;
  }

  res.status(404).end(JSON.stringify({ error: true, message: "Not found" }));
});

// POST /suggestions/:id/like
app.post("/suggestions/:id/like", (req, res) => {
  if (db.doLikeProfile(req.params.id)) {
    res.end(JSON.stringify({ success: true }));
    return;
  }

  res.status(409).end(JSON.stringify({ error: true, message: "Cannot do like" }));
});

// POST /suggestions/:id/nope
app.post("/suggestions/:id/nope", (req, res) => {
  if (db.doUnlikeProfile(req.params.id)) {
    res.end(JSON.stringify({ success: true }));
    return;
  }

  res.status(409).end(JSON.stringify({ error: true, message: "Cannot do unlike" }));

});

// GET /ping
app.get("/ping", (req, res) => {
  res.end(JSON.stringify({ message: "pong" }));
});

// GET /server
app.get("/", (req, res) => {
  res.end(JSON.stringify({
    message: "Welcome. This is a DEMO server.",
    serverName: SERVER_NAME,
  }))
});

// GET /suggestions
app.post("/reset", (req, res) => {
  if (db.reset()) {
    res.end(JSON.stringify({ success: true }));
    return;
  }

  res.status(500).end(JSON.stringify({ error: true, message: "Could not reset" }));
});

app.listen(PORT);
