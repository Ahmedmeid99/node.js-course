const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");

const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");

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

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }
    socket.join(user.room);

    socket.emit("message", generateMessage("Welcome!"));
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage(`${user.username} has joined!`));

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed!");
    }

    // send to athers (not me)
    io.to("frinds").emit("message", generateMessage(message));
    callback();
  });

  socket.on("sendLocation", (coords, callback) => {
    io.to("frinds").emit(
      "locationMessage",
      generateLocationMessage(
        `https://google.com/maps?q=${coords.lat},${coords.long}`
      )
    );

    callback("Location shared!");
  });

  // if user is close his window
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage(`${user.username} has left!`)
      );
    }
  });
});

server.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
