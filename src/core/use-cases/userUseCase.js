const UserRepository = require('../../infrastructure/repositories/userRepository');

class UserUseCase {
  // Métodos existentes...

  async updateUser(userId, userData) {
    try {
      // Validaciones adicionales si son necesarias
      const validUpdateData = {};
      
      // Filtrar campos permitidos para actualización
      const allowedFields = ['name', 'email', 'age'];
      
      allowedFields.forEach(field => {
        if (userData[field] !== undefined) {
          validUpdateData[field] = userData[field];
        }
      });

      // Verificar si hay datos válidos para actualizar
      if (Object.keys(validUpdateData).length === 0) {
        throw new Error('No hay datos válidos para actualizar');
      }

      // Llamar al repositorio para actualizar usuario
      return await UserRepository.updateUser(userId, validUpdateData);
    } catch (error) {
      console.error('Error en caso de uso de actualizar usuario:', error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      // Validar que se proporcione un ID
      if (!userId) {
        throw new Error('ID de usuario es requerido');
      }

      // Llamar al repositorio para eliminar usuario
      return await UserRepository.deleteUser(userId);
    } catch (error) {
      console.error('Error en caso de uso de eliminar usuario:', error);
      throw error;
    }
  }
}

module.exports = new UserUseCase();