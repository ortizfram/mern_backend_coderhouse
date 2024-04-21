# CRUD : U (Update)
Las operaciones Update se pueden realizar de dos maneras: Actualizar un documento, o actualizar múltiples documentos. 
```js
db.collection.updateOne(query,update,option)
```

- query: sirve para filtrar qué elementos actualizar (usa los filtros iguales al find)

- update: Apartado para indicar qué actualizar de los documentos que cumplen con el filtro. Update tiene sus propios operadores como `$set, $unset, $inc, $rename, $mul, $min, $max`

- option: Opciones a tomar en cuenta para la actualización (como upsert, que inserta el valor en caso de que el documento a actualizar ni siquiera exista).

```js
db.collection.updateMany(query,update,options) 
```
Actualiza múltiples documentos que cumplan con el criterio. 