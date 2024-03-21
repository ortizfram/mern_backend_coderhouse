const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const PORT = 3000;

// Frase inicial
let frase = "Frase inicial";


//  GET frase completa
app.get('/api/frase', (req, res) => {
    res.json({ frase });
});

// GET buscar una palabra en posicion dada
app.get('/api/palabras/:pos', (req, res) => {
    const pos = parseInt(req.params.pos);
    const palabras = frase.split(' '); //array de strings
    if (pos <= 0 || pos > palabras.length) {
        return res.status(400).json({ error: 'Posición inválida. tiene que ser >= 1' });
    }
    const buscada = palabras[pos - 1]; // index [] from 0 with :pos
    res.json({ buscada });
});

// POST concatena palabra al final de frase
app.post('/api/palabras', (req, res) => {
    const palabra = req.body.palabra;
    if (!palabra) {
        return res.status(400).json({ error: 'Se requiere la palabra a agregar' });
    }
    frase += ` ${palabra}`;
    const pos = frase.split(' ').length; // Str to Inpos=Arr.length
    res.json({ agregada: palabra, pos });
});

// PUT reemplaza palabra en posicion dada
app.put('/api/palabras/:pos', (req, res) => {
    const pos = parseInt(req.params.pos);
    const palabra = req.body.palabra;
    const palabras = frase.split(' ');
    if (pos <= 0 || pos > palabras.length) {
        return res.status(400).json({ error: 'Posición inválida' });
    }
    const anterior = palabras[pos - 1];
    palabras[pos - 1] = palabra;// from req.body
    frase = palabras.join(' ');// vuelta a Str
    res.json({ actualizada: palabra, anterior });
});

// DELETE elimina palabra en posicion dada
app.delete('/api/palabras/:pos', (req, res) => {
    const pos = parseInt(req.params.pos);
    const palabras = frase.split(' ');// Str to Arr
    if (pos <= 0 || pos > palabras.length) {
        return res.status(400).json({ error: 'Posición inválida' });
    }
    const eliminada = palabras.splice(pos - 1, 1)[0];//start: take :pos st from 0, quantity:1, ocurrency[0] -> first
    frase = palabras.join(' '); // update frase
    res.json({ eliminada }); // pass eliminada
});

app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`);
});
