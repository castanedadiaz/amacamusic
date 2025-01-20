const express = require('express');
const bodyParser = require('body-parser');
const emailRoutes = require('./api/routes/emailRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

// Usar las rutas definidas
app.use('/api', emailRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});