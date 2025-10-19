import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.post('/publicar', (req, res) => {
  const { texto } = req.body;
  // Aquí puedes moderar, guardar, etc.
  res.send(`Texto recibido: ${texto}`);
});

app.listen(3000, () => {
  console.log('Servidor ceremonial escuchando en el puerto 3000');
});