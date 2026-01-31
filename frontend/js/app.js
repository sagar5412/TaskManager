// Main Application - Coordinates all components

const app = {
  tasks: [],

  async init() {
    // Initialize all components
    ui.init();
    stats.init();

    taskList.init({
      onToggleStatus: (id) => this.toggleTaskStatus(id),
      onEdit: (id) => this.openEditModal(id),
      onDelete: (id) => this.deleteTask(id),
    });

    filter.init((filterValue) => {
      taskList.setFilter(filterValue);
      taskList.render(this.tasks);
    });

    modal.init((taskData, editingId) => {
      if (editingId) {
        this.updateTask(editingId, taskData);
      } else {
        this.createTask(taskData);
      }
    });

    // Add task button
    document.getElementById("addTaskBtn").addEventListener("click", () => {
      modal.openForAdd();
    });

    // Load initial data
    await this.loadTasks();
  },

  async loadTasks() {
    ui.showLoading(true);
    try {
      this.tasks = await api.getAllTasks();
      this.refreshUI();
    } catch (error) {
      ui.showToast(
        "Failed to load tasks. Make sure the server is running.",
        "error",
      );
      console.error("Load error:", error);
    } finally {
      ui.showLoading(false);
    }
  },

  async createTask(taskData) {
    try {
      const newTask = await api.createTask(taskData);
      this.tasks.unshift(newTask);
      this.refreshUI();
      ui.showToast("Task created successfully!");
      modal.close();
    } catch (error) {
      ui.showToast("Failed to create task", "error");
      console.error("Create error:", error);
    }
  },

  async updateTask(id, taskData) {
    try {
      const updatedTask = await api.updateTask(id, taskData);
      const index = this.tasks.findIndex((t) => t._id === id);
      if (index !== -1) this.tasks[index] = updatedTask;
      this.refreshUI();
      ui.showToast("Task updated successfully!");
      modal.close();
    } catch (error) {
      ui.showToast("Failed to update task", "error");
      console.error("Update error:", error);
    }
  },

  async deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.deleteTask(id);
      this.tasks = this.tasks.filter((t) => t._id !== id);
      this.refreshUI();
      ui.showToast("Task deleted successfully!");
    } catch (error) {
      ui.showToast("Failed to delete task", "error");
      console.error("Delete error:", error);
    }
  },

  async toggleTaskStatus(id) {
    const task = this.tasks.find((t) => t._id === id);
    if (!task) return;

    const newStatus = task.status === "completed" ? "pending" : "completed";
    await this.updateTask(id, { status: newStatus });
  },

  openEditModal(id) {
    const task = this.tasks.find((t) => t._id === id);
    if (task) modal.openForEdit(task);
  },

  refreshUI() {
    taskList.render(this.tasks);
    stats.update(this.tasks);
  },
};

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => app.init());
