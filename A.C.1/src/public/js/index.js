// src/public/js/index.js
const socket = io();
socket.emit("message", "Hola desde socket");