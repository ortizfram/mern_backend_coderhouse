// levanta socket del lado cliente
const socket = io();

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresa usuario para identificarte en el chat",
  inputValidator: (value) => {
    return !value && "!Necesitas escribir un nombre de usuario para continuar!";
  },
  allowOutsideClick: false, //impide salida
}).then((result) => {
  user = result.value;
});

chatBox.addEventListener('keyup',evt=>{
    if(evt.key==="Enter"){//on Enter send
        if(chatBox.value.trim().length>0){//not empty validation
            socket.emit("message", {user:user,message:chatBox.value})//emit first event
            chatBox.value=""
        }
    }
})

// Socket listeners
socket.on('messageLogs', data =>{
    let log= document.getElementById("messageLogs")
    let messages=""
    data.forEach(message=>{
        messages = messages+`${message.user} dice:${message.message}</br>`
    })
    log.innerHTML = messages
})