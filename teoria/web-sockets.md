# HTTP Long polling

consiste en que el cliente vuelva a hacer una petición tan pronto como reciba una respuesta del servidor, es decir, bombardea al servidor constantemente de peticiones para emular respuestas “en tiempo real”

Sin embargo, se concluyó que esta operación es costosa en recursos y, al final, un tanto lenta para realmente considerarse “tiempo real”.

# Solución óptima: Websockets en express con `socket.io`

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
