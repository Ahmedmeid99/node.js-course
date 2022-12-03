const fromEl = document.querySelector("#form-message");
const sendLocationBtn = document.querySelector("#send-location");
const socket = io();

///////////( receive(on))/////////////
socket.on("message", (message) => console.log(message));

// ///////////( onClick => send(emit))/////////////
fromEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message, (error) => {
    if (error) {
      return console.log(error);
    }
    console.log("The message was delivered!");
  });
});

////////////////////////////////////////////////////
sendLocationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      },
      (message) => console.log(message)
    );
  });
});

////////////////////////////////////////////////////
