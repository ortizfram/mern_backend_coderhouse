const socket = io();
socket.emit("message", "Hola desde socket");

socket.on("evento_para_socket_individual", (data) => {
  console.log(data);
});

socket.on("evento_para_todos", (data) => {
  console.log(data);
});
