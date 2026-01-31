// API Base URL - Change this if your backend is hosted elsewhere
// API Service - Handles all HTTP requests
// Uses CONFIG.API_URL from config.js

const api = {
  async getAllTasks() {
    const response = await fetch(CONFIG.API_URL);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
  },

  async createTask(taskData) {
    const response = await fetch(CONFIG.API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return response.json();
  },

  async updateTask(id, taskData) {
    const response = await fetch(`${CONFIG.API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error("Failed to update task");
    return response.json();
  },

  async deleteTask(id) {
    const response = await fetch(`${CONFIG.API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete task");
    return response.json();
  },
};
