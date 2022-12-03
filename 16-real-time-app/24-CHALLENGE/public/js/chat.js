const socket = io();

// Elements
const fromEl = document.querySelector("#message-form");
const sendLocationBtn = document.querySelector("#send-location");
const sendMessageBtn = document.querySelector("#send-message");
const inputMessage = document.querySelector("#message-input");
const messages = document.querySelector("#messages");

//template
const messageTemplate = document.querySelector("#message-template").innerHTML;
const positionLinkTemplate = document.querySelector(
  "#location-message-template"
).innerHTML;

//Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
console.log(username, room);
///////////( receive(on))/////////////
socket.on("message", (message) => {
  const html = Mustache.render(messageTemplate, {
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm a"),
  });
  messages.insertAdjacentHTML("beforeend", html);
});
//
socket.on("locationMessage", (locationURL) => {
  const html = Mustache.render(positionLinkTemplate, {
    location_url: locationURL,
    createdAt: moment(locationURL.createdAt).format("h:mm a"),
  });
  messages.insertAdjacentHTML("beforeend", html);
});

// ///////////( onClick => send(emit))/////////////
fromEl.addEventListener("submit", (e) => {
  e.preventDefault();

  sendMessageBtn.setAttribute("disabled", "true");
  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, (error) => {
    // validate
    sendMessageBtn.removeAttribute("disabled");
    inputMessage.value = "";
    inputMessage.focus();
    if (error) {
      return console.log(error);
    }
    console.log("The message was delivered!");
  });
});

////////////////////////////////////////////////////
sendLocationBtn.addEventListener("click", () => {
  sendLocationBtn.setAttribute("disabled", "true");
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        lat: position.coords.latitude,
        long: position.coords.longitude,
        createdAt: position.timestamp,
      },
      () => {
        sendLocationBtn.removeAttribute("disabled");
      }
    );
  });
});

socket.emit("join", { username, room }, (error) => {
  // Show Error
  if (error) {
    alert(error);
    location.href = "/";
  }
});

////////////////////////////////////////////////////
