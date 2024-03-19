const express = require('express');
const app = express();

// aceptar urls complejos
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => { // add ?name=mauri&age=23 to link
    let {name,age} = req.query
    res.send({name, age})
})

app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto ${8080}`);
  });
  