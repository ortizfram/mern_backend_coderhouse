# Servidor con Websocket
- Sobre la estructura anteriormente creada, agregar en la vista de cliente un elemento de entrada de texto donde al introducir texto, el mensaje se vea reflejado en todos los clientes conectados en un párrafo por debajo del input.
El texto debe ser enviado caracter a caracter y debe reemplazar el mensaje previo.

- Basado en el ejercicio que venimos realizando, ahora los mensajes enviados por los clientes deberán ser almacenados en el servidor y reflejados por debajo del elemento de entrada de texto cada vez que el usuario haga un envío. La estructura de almacenamiento será un array de objetos, donde cada objeto tendrá la siguiente estructura:
{ socketid: (el socket.id del que envió el mensaje), mensaje: (texto enviado)}

- Cada cliente que se conecte recibirá la lista de mensajes completa.
- Modificar el elemento de entrada en el cliente para que disponga de un botón de envío de mensaje.
- Cada mensaje de cliente se representará en un renglón aparte, anteponiendo el socket id.
