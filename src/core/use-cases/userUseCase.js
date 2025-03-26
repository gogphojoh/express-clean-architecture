// src/core/use-cases/userUseCase.js
const UserRepository = require('../../infrastructure/repositories/userRepository');

class UserUseCase {
  // Get all users
  static async getAllUsers() {
    return await UserRepository.findAll();
  }

  // Get user by ID
  static async getUserById(userId) {
    return await UserRepository.findById(userId);
  }

  // Create multiple users
  static async createUsers(users) {
    return await UserRepository.createMany(users);
  }

  // Update user
  static async updateUser(userId, userData) {
    return await UserRepository.update(userId, userData);
  }

  // Delete user
  static async deleteUser(userId) {
    return await UserRepository.delete(userId);
  }
}

module.exports = UserUseCase;