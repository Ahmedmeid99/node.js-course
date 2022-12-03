const btnEl = document.querySelector("#increment");
const socket = io();
///////////( receive(on))/////////////
socket.on("message", (message) => {
  console.log(message);
});

// ///////////( onClick => send(emit))/////////////
// btnEl.addEventListener("click", () => {
//   console.log("clicked");
//   socket.emit("increment");
// });
