const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const Jimp = require('jimp');

const app = express();
const port = 3000;

// Middleware para manejar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Ruta raíz que devuelve el formulario HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para procesar la imagen// Ruta para procesar la imagen
app.post('/process-image', async (req, res) => {
  const imageUrl = req.body.imageUrl;
  try {
      const image = await Jimp.read(imageUrl);
      image
          .resize(350, Jimp.AUTO)
          .grayscale();

      const imageId = uuidv4().split('-')[0];
      const imagePath = path.join(__dirname, 'processed_images', `${imageId}.jpg`);

      await image.writeAsync(imagePath);
      res.sendFile(imagePath);
  } catch (err) {
      res.status(500).send('Error al procesar la imagen.');
  }
});
  
 //Ruta para conectarse al servidor 
  app.listen(port, () => {
    console.info(`Servidor corriendo en http://localhost:${port}/`);
});