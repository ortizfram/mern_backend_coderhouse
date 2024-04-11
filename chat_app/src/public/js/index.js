const socket = io();

let user = null;

Swal.fire({
  title: "Identifícate",
  input: "text",
  text: "Ingresa usuario para identificarte en el chat",
  inputValidator: (value) => {
    return !value && "!Necesitas escribir un nombre de usuario para continuar!";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  // Authenticate user
  socket.emit("authenticate", { id: socket.id, name: user });
});

const chatBox = document.getElementById("chatBox");

chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
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

socket.on("newUserConnected", (user) => {
  Swal.fire({
    text: `${user.name} se ha unido al chat`,
    toast: true,
    position: "top-right",
  });
});
