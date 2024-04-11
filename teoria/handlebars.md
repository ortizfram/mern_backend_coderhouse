## Instalacion
```console
npm i express express-handlebars
```

## config en proyecto
```js
import express from "express"
import handlebars from "express-handlebars"

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
```

## tipeado
```js
{{variable}}
```

## Estructura
- src/views/layouts/`main.handlebars`
- src/views/`index.handlebars`

> main.handlebars
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
</head>
<body>
    {{{body}}}
</body>
</html>
```

> index.handlebars
```
<div>
    <p>Hola {{name}} como va</p>
</div>
```