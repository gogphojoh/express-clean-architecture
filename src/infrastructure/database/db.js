const { Sequelize } = require('sequelize');
const config = require('../../../config/config');

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize('prueba-clean', config.database.username, config.database.password, {
  host: config.database.host,
  dialect: 'mysql',
  port: config.database.port || 3306,
  logging: false, // Desactiva los logs de SQL
  define: {
    timestamps: true // Agrega automáticamente createdAt y updatedAt
  }
});

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('🌟 Conexión a la base de datos establecida correctamente');
    
    // Sincroniza los modelos con la base de datos
    await sequelize.sync({ alter: true });
    console.log('📦 Modelos sincronizados');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDB
};