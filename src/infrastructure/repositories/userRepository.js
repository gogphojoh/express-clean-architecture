// src/infrastructure/repositories/userRepository.js
class UserRepository {
  // Simulated in-memory storage for demonstration
  constructor() {
    this.users = [];
  }

  // Find all users
  async findAll() {
    return this.users;
  }

  // Find user by ID
  async findById(userId) {
    return this.users.find(user => user.id === userId);
  }

  // Create multiple users
  async createMany(users) {
    const newUsers = users.map(user => ({
      ...user,
      id: this.generateUniqueId()
    }));
    this.users.push(...newUsers);
    return newUsers;
  }

  // Update user
  async update(userId, userData) {
    const userIndex = this.users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return [0, []];
    }

    const updatedUser = { 
      ...this.users[userIndex], 
      ...userData 
    };
    
    this.users[userIndex] = updatedUser;
    return [1, [updatedUser]];
  }

  // Delete user
  async delete(userId) {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== userId);
    
    return initialLength > this.users.length ? 1 : 0;
  }

  // Helper method to generate unique ID
  generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }
}

module.exports = new UserRepository();