const socket = io(); // pasar desde cliente
socket.emit("client", "c=>s socket.emit()");

socket.on("actual", (data) => console.log(data));
socket.on("!actual", (data) => console.log(data));// no se va a ver para mi
socket.on("para_todos", (data) => console.log(data));
