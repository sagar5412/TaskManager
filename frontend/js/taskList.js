// Task List Component - Renders and manages task cards

const taskList = {
  container: null,
  currentFilter: "all",
  onToggleStatus: null,
  onEdit: null,
  onDelete: null,

  init(callbacks) {
    this.container = document.getElementById("taskList");
    this.onToggleStatus = callbacks.onToggleStatus;
    this.onEdit = callbacks.onEdit;
    this.onDelete = callbacks.onDelete;
  },

  render(tasks) {
    const filteredTasks =
      this.currentFilter === "all"
        ? tasks
        : tasks.filter((t) => t.status === this.currentFilter);

    if (filteredTasks.length === 0) {
      this.container.innerHTML = "";
      ui.showEmptyState(true);
      return;
    }

    ui.showEmptyState(false);
    this.container.innerHTML = filteredTasks
      .map((task) => this.createCard(task))
      .join("");
    this.attachEventListeners();
  },

  createCard(task) {
    const date = ui.formatDate(task.createdAt);
    const isCompleted = task.status === "completed";

    return `
      <div class="task-card ${isCompleted ? "completed" : ""}">
        <div class="task-checkbox ${isCompleted ? "completed" : ""}" data-id="${task._id}"></div>
        <div class="task-content">
          <h3 class="task-title">${ui.escapeHtml(task.title)}</h3>
          ${task.description ? `<p class="task-description">${ui.escapeHtml(task.description)}</p>` : ""}
          <div class="task-meta">
            <span class="task-status ${task.status}">${ui.formatStatus(task.status)}</span>
            <span class="task-date">${date}</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="task-action-btn edit-btn" data-id="${task._id}" title="Edit">✎</button>
          <button class="task-action-btn delete delete-btn" data-id="${task._id}" title="Delete">🗑</button>
        </div>
      </div>
    `;
  },

  attachEventListeners() {
    // Checkbox click - toggle status
    this.container.querySelectorAll(".task-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("click", () => {
        if (this.onToggleStatus) this.onToggleStatus(checkbox.dataset.id);
      });
    });

    // Edit button click
    this.container.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.onEdit) this.onEdit(btn.dataset.id);
      });
    });

    // Delete button click
    this.container.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.onDelete) this.onDelete(btn.dataset.id);
      });
    });
  },

  setFilter(filter) {
    this.currentFilter = filter;
  },
};
