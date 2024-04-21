# Filtros

Las búsquedas del mundo real no siempre requieren que un valor sea igual a otro. En ocasiones necesitamos que sea menor, mayor, diferente de, entre otras cosas.

Los filtros pueden agregarse dentro de los elementos de criterio (opt) con ayuda del símbolo $, además, podemos agregar más de un filtro para asegurarnos que el documento se ajuste a criterios muy específicos.

Entonces, la sintaxis general será:

```js
db.coll.find({ key: { $operator: val } });
```

# Filtros: Query

`$and` : Realiza operación AND -> sintaxis: {$and: [ {},{} ] }

`$or` : Realiza operación OR -> sintaxis: {$or: [ {},{} ] }

`$lt` : Coincide con valores que son menores que un valor especificado.

`$lte` : Coincide con valores menores o iguales a un valor especificado.

`$gt` : Coincide con valores mayores a un valor especificado.

`$gte` : Coincide con valores mayores o iguales a un valor especificado.

`$ne` : Coincide con valores que no son iguales a un valor especificado.

`$eq` : Selecciona los documentos que son iguales a un valor especificado.

`$exists` : Selecciona los documentos según la existencia de un campo.

`$in` : Selecciona los documentos especificados en un array.
sintaxis: {key:{$in: [array of values] } } `{ nombre: { $in: ['Juan', 'Lucia'] } }`

`$nin` : Coincide con ninguno de los valores especificados en un array.

`$size` : Coincide con el número de elementos especificados.

`$all` : Coincide con todos los valores definidos dentro de un array.

`$elemMatch` : Coincide con algún valor definido dentro del query.

# Proyecciones, Sorts, Skips, Limits

`$skip` y `$limit`
```js
  const secondYoungestClient = await db
      .collection("clientes")
      .aggregate([
        // Sort documents by age in ascending order
        { $sort: { edad: 1 } },
        // Skip the first document (youngest client)
        { $skip: 1 },
        // Project the second document (second youngest client)
        { $limit: 1 },
      ])
      .toArray();
```

`$sort`
```js
 const sortedClientsDescAge = await db
      .collection("clientes")
      .find()
      .sort({ edad: -1 })
      .toArray();
```
