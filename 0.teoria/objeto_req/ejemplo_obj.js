const express = require('express');
const app = express();

// Array de usuarios (solo para fines de demostración)
const usuarios = [
  { id: 1, nombre: 'Juan' },
  { id: 2, nombre: 'María' },
  { id: 3, nombre: 'Pedro' }
];

// Ruta para obtener un usuario por su ID
app.get('/usuarios/:userId', (req, res) => { //http://localhost:8080/usuarios/2
  // Obtener el ID del parámetro de la ruta
  const userId = parseInt(req.params.userId);

  // Buscar el usuario en el array de usuarios
  const usuario = usuarios.find(user => user.id === userId);

  if (usuario) {
    // Si se encuentra el usuario, responder con los detalles del usuario
    res.json(usuario);  // {"id":2,"nombre":"María"}

  } else {
    // Si no se encuentra el usuario, responder con un mensaje de error
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }
});


app.listen(8080, () => {
  console.log(`Servidor escuchando en el puerto ${8080}`);
});
