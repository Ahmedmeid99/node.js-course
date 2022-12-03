// Elements
const fromEl = document.querySelector("#form-message");
const sendLocationBtn = document.querySelector("#send-location");
const sendMessageBtn = document.querySelector("#send-message");
const inputMessage = document.querySelector("#message-input");
const socket = io();

///////////( receive(on))/////////////
socket.on("message", (message) => console.log(message));

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
      },
      (message) => {
        console.log(message);
        sendLocationBtn.removeAttribute("disabled");
      }
    );
  });
});

////////////////////////////////////////////////////
