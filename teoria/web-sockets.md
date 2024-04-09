# HTTP Long polling
 consiste en que el cliente vuelva a hacer una petición tan pronto como reciba una respuesta del servidor, es decir, bombardea al servidor constantemente de peticiones para emular respuestas “en tiempo real”

Sin embargo, se concluyó que esta operación es costosa en recursos y, al final, un tanto lenta para realmente considerarse “tiempo real”.

# Solución óptima: Websockets en express con `socket.io`
En cuanto el servidor reciba una actualización de una nueva puja, actualizará a todos los clientes conectados, permitiendo dar información en tiempo real
