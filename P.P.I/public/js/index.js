// P.P.I/public/js/index.js
const socket = io();

let user = null;

// block screen till authenticated and save user
Swal.fire({
  title: "Identifícate",
  input: "text",
  text: "Ingresa correo para identificarte en el chat",
  inputValidator: (value) => {
    return !value && "!Necesitas escribir un nombre de usuario para continuar!";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  // Authenticate user
  socket.emit("authenticate", { id: socket.id, email: user });
});

// Display messages
const chatBox = document.getElementById("chatBox");
chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {// si ENTER
    if (chatBox.value.trim().length > 0) {//si not empty
      socket.emit("message", { user: user, message: chatBox.value }); //send message
      chatBox.value = "";//clear
    }
  }
});

// Socket listeners
socket.on("messageLogs", (data) => {
  const log = document.getElementById("messageLogs");
  let messages = "";
  data.forEach((message) => {
    messages = messages + `${message.user} dice: ${message.message}<br>`;
  });
  log.innerHTML = messages;
});

// toast new user connected
socket.on("newUserConnected", (user) => {
  Swal.fire({
    text: `${user.email} se ha unido al chat`,
    toast: true,
    position: "top-right",
  });
});