const fromEl = document.querySelector("#form-message");
const socket = io();
///////////( receive(on))/////////////
socket.on("message", (message) => console.log(message));
// ///////////( onClick => send(emit))/////////////
fromEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message);
});
