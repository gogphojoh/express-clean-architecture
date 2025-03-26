const User = require('../database/userModel');

class UserRepository {
  // Métodos existentes...

  async updateUser(userId, userData) {
    try {
      // Actualizar usuario y obtener información de la actualización
      const [updatedCount, updatedUsers] = await User.update(userData, {
        where: { id: userId },
        returning: true // Devuelve los usuarios actualizados
      });

      return [updatedCount, updatedUsers];
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      // Eliminar usuario y obtener el número de usuarios eliminados
      const deletedCount = await User.destroy({
        where: { id: userId }
      });

      return deletedCount;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }
}

module.exports = new UserRepository();