const btnEl = document.querySelector("#increment");
const socket = io();
///////////( receive(on))/////////////
socket.on("countUpdated", (count) => {
  console.log(`the count has been updated ${count}`);
});
///////////( onClick => send(emit))/////////////
btnEl.addEventListener("click", () => {
  console.log("clicked");
  socket.emit("increment");
});
