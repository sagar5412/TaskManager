// Stats Component - Dashboard statistics

const stats = {
  elements: {
    total: null,
    pending: null,
    inProgress: null,
    completed: null,
  },

  init() {
    this.elements.total = document.getElementById("totalTasks");
    this.elements.pending = document.getElementById("pendingTasks");
    this.elements.inProgress = document.getElementById("inProgressTasks");
    this.elements.completed = document.getElementById("completedTasks");
  },

  update(tasks) {
    this.elements.total.textContent = tasks.length;
    this.elements.pending.textContent = tasks.filter(
      (t) => t.status === "pending",
    ).length;
    this.elements.inProgress.textContent = tasks.filter(
      (t) => t.status === "in-progress",
    ).length;
    this.elements.completed.textContent = tasks.filter(
      (t) => t.status === "completed",
    ).length;
  },
};
