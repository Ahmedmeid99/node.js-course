const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicDir = path.join(__dirname, "../public"); //to get the path

app.use(express.static(publicDir)); //to make files in showwing in (publicDir)

const port = process.env.PORT || "3000";

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", () => {
  console.log("New WbSocket connection");
});

server.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
