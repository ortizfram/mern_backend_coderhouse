#### HTTP Long polling

consiste en que el cliente vuelva a hacer una petición tan pronto como reciba una respuesta del servidor, es decir, bombardea al servidor constantemente de peticiones para emular respuestas “en tiempo real”

Sin embargo, se concluyó que esta operación es costosa en recursos y, al final, un tanto lenta para realmente considerarse “tiempo real”.

#### Solución óptima: Websockets en express con `socket.io`

En cuanto el servidor reciba una actualización de una nueva puja, actualizará a todos los clientes conectados, permitiendo dar información en tiempo real

## 4. Agregar js a la carpeta public y a nuestro index.handlebars

- Creamos un index.js en la carpeta public/js/ y la referenciamos en nuestro index.handlebars (línea 5)

`index.handlebars`

```html
<script src="/src/public/js/index.js"></script>
```

- Como comentamos, el cliente también necesita instanciar su socket, entonces lo colocamos en un script con la sintaxis indicada en la imagen. (línea 4)

`index.handlebars`

```html
<script src="/socket.io/socket.io.js"></script>
<!-- script src de index.js-->
```

> El script de socket siempre debe estar antes que el script propio

## 5. Levantar nuestro socket del lado del cliente en index.js

Una vez que hemos importado socket.io desde nuestro script de lado del cliente, podemos probar utilizándolo en nuestro archivo index.js.
En este archivo index.js es donde tendremos el socket/cliente para conectar con socket/servidor

> en este punto somos clientes porque representamos una vista

esta instancia de socket la utilizaremos para instanciar el socket del servidor

`index.js`

```js
const socket = io();
```

## 6.Utilizando socketServer.on para escuchar la conexión de un nuevo socket

> creamos un servidor para socket dentro de nuestro server inicial
> `socketServer.on`

```js
// imports
const socketServer = new Server(httpServer);

// listening
socketServer.on("connection", (socket) => {
  console.log("nuevo cliente conectado");
});
```
