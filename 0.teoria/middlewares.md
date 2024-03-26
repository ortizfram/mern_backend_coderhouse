# Tipos de middleware
En una aplicación Express puede utilizar los siguientes tipos de middleware:
Middleware a nivel de aplicación
Middleware a nivel endpoint
Middleware a nivel del Router
Middleware de manejo de errores
Middleware incorporado
Middleware de terceros

# Middleware de nivel de aplicación
```js
const app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

```

# Middleware de nivel de endpoint
```js
function mid1(req, res, next) {
   req.dato1 = 'un dato'
   next()
}

function mid2(req, res, next) {
   req.dato2 = 'otro dato'
   next()
}
```
```js
app.get('/ruta1', mid1, (req, res) => {
   res.json({
       dato1: req.dato1
   })
})
app.get('/ruta2', mid1, mid2, (req, res) => {
   res.json({
       dato1: req.dato1,
       dato2: req.dato2
   })
})
```
# Middleware de nivel del Router
```js
const app = express();
const router = express.Router();

// funcion middleware sin via de acceso de montaje.
// El codigo es ejecutado por cada peticion al router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

```

# Middleware de manejo de errores
```js
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

```
# Middleware incorporado
```js
// La única función de middleware incorporado en Express es express.static. Esta función es responsable del servicio de archivos estáticos:
app.use(express.static('public', options));
```

# Middleware de terceros
```js
// $ npm install cookie-parser

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
```

### Middleware de carga de archivos: `MULTER`
