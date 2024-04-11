# Chat websocket ampliado
> Con base en el servidor con chat de websocket que se ha desarrollado. Crear nuevos eventos para que:

- Cuando el usuario se autentique correctamente, el servidor le mande los logs de todo el chat.
- Cuando el usuario se autentique correctamente, todos los demás usuarios (menos el que se acaba de registrar) reciban una notificación indicando qué usuario se acaba de conectar. (utiliza Swal toast).

> estructura de un toast
```js
Swal.fire({
  text: "Nuevo Usuario Conectado",
  toast: true, 
  position:"top-right"
})
```