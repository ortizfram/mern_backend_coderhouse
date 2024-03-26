# ¿Cómo convertir una carpeta en un recurso estático?
```js
app.use(express.static("public"))
```

# Prefijo virtual
path no existe aun
 ```js
app.use("/static",express.static("public"))
 ```

# Path absoluto
relativo al directorio desde donde inicia el proceso node.
necesario para no buscar el archivo con ../..././..//   
```js   
app.use('/static', express.static(__dirname + '/public'))
```
