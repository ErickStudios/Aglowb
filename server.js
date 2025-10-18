// server.js
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

app.post('/guardar', (req, res) => {
  const texto = req.body.texto;
  fs.appendFileSync('escenas.txt', texto + '\n');
  res.sendStatus(200);
});

app.get('/leer', (req, res) => {
  const contenido = fs.readFileSync('escenas.txt', 'utf8');
  res.send(contenido.split('\n').filter(Boolean));
});

app.listen(3000);