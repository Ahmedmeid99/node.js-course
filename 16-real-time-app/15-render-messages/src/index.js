const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicDir = path.join(__dirname, "../public"); //to get the path

app.use(express.static(publicDir)); //to make files in showwing in (publicDir)

const port = process.env.PORT || "3000";

app.get("/", (req, res) => {
  res.render("index");
});
const message = "Welcome...";
///////////////////////////////////////////
io.on("connection", (socket) => {
  console.log("New WbSocket connection");

  // if user is join in
  socket.broadcast.emit("message", "A new user has joined!");

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed!");
    }

    // send to athers (not me)
    io.emit("message", message);
    callback();
  });

  socket.on("sendLocation", (coords, callback) => {
    io.emit(
      "message",
      `https://google.com/maps?q=${coords.lat},${coords.long}`
    );

    callback("Location shared!");
  });

  // if user is close his window
  socket.on("disconnect", () => {
    io.emit("message", "A user has left!");
  });
});

server.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
