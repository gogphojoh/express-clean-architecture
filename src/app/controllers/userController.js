const UserUseCase = require('../../core/use-cases/userUseCase');

// Exporta un objeto con todos los métodos
module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserUseCase.getAllUsers();
      res.status(200).json({
        message: 'Lista de usuarios',
        users: users
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener usuarios',
        error: error.message 
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await UserUseCase.getUserById(userId);
      
      if (!user) {
        return res.status(404).json({
          message: `Usuario con ID ${userId} no encontrado`
        });
      }

      res.status(200).json({
        message: `Detalles del usuario ${userId}`,
        user: user
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener usuario',
        error: error.message 
      });
    }
  },

  createUsers: async (req, res) => {
    try {
      const users = req.body;

      // Validaciones básicas
      if (!Array.isArray(users)) {
        return res.status(400).json({
          message: 'La solicitud debe ser un array de usuarios'
        });
      }

      // Crear usuarios usando el caso de uso
      const savedUsers = await UserUseCase.createUsers(users);

      res.status(201).json({
        message: `${savedUsers.length} usuarios creados exitosamente`,
        users: savedUsers
      });

    } catch (error) {
      res.status(500).json({ 
        message: 'Error al crear usuarios',
        error: error.message 
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const userData = req.body;

      // Validar que se proporcionen datos para actualizar
      if (Object.keys(userData).length === 0) {
        return res.status(400).json({
          message: 'No se proporcionaron datos para actualizar'
        });
      }

      // Actualizar usuario usando el caso de uso
      const [updatedCount, updatedUsers] = await UserUseCase.updateUser(userId, userData);

      if (updatedCount === 0) {
        return res.status(404).json({
          message: `Usuario con ID ${userId} no encontrado`
        });
      }

      res.status(200).json({
        message: 'Usuario actualizado exitosamente',
        user: updatedUsers[0],
        updatedCount
      });

    } catch (error) {
      res.status(500).json({ 
        message: 'Error al actualizar usuario',
        error: error.message 
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;

      // Eliminar usuario usando el caso de uso
      const deletedCount = await UserUseCase.deleteUser(userId);

      if (deletedCount === 0) {
        return res.status(404).json({
          message: `Usuario con ID ${userId} no encontrado`
        });
      }

      res.status(200).json({
        message: 'Usuario eliminado exitosamente',
        deletedCount
      });

    } catch (error) {
      res.status(500).json({ 
        message: 'Error al eliminar usuario',
        error: error.message 
      });
    }
  }
};