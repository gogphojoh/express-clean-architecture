const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('../../infrastructure/database/db');
const userRoutes = require('../../app/routes/userRoutes');
const config = require('../../../config/config');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api', userRoutes);

// Ruta raíz de ejemplo
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Bienvenido a mi API',
    status: 'OK'
  });
});

const PORT = config.port || 3000;

// Inicializar base de datos antes de iniciar el servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ No se pudo iniciar el servidor:', error);
  }
};

startServer();

module.exports = app;