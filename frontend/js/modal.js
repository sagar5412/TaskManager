// Modal Component - Handles add/edit task modal

const modal = {
  elements: {
    overlay: null,
    title: null,
    form: null,
    submitBtn: null,
    closeBtn: null,
    cancelBtn: null,
    titleInput: null,
    descriptionInput: null,
    statusSelect: null,
  },

  editingTaskId: null,
  onSubmitCallback: null,

  init(onSubmit) {
    this.onSubmitCallback = onSubmit;

    // Cache DOM elements
    this.elements.overlay = document.getElementById("modalOverlay");
    this.elements.title = document.getElementById("modalTitle");
    this.elements.form = document.getElementById("taskForm");
    this.elements.submitBtn = document.getElementById("submitBtn");
    this.elements.closeBtn = document.getElementById("modalClose");
    this.elements.cancelBtn = document.getElementById("cancelBtn");
    this.elements.titleInput = document.getElementById("taskTitle");
    this.elements.descriptionInput = document.getElementById("taskDescription");
    this.elements.statusSelect = document.getElementById("taskStatus");

    // Bind events
    this.elements.closeBtn.addEventListener("click", () => this.close());
    this.elements.cancelBtn.addEventListener("click", () => this.close());
    this.elements.overlay.addEventListener("click", (e) => {
      if (e.target === this.elements.overlay) this.close();
    });
    this.elements.form.addEventListener("submit", (e) => this.handleSubmit(e));
  },

  openForAdd() {
    this.editingTaskId = null;
    this.elements.title.textContent = "Add New Task";
    this.elements.submitBtn.textContent = "Add Task";
    this.elements.form.reset();
    this.elements.overlay.classList.add("show");
  },

  openForEdit(task) {
    this.editingTaskId = task._id;
    this.elements.title.textContent = "Edit Task";
    this.elements.submitBtn.textContent = "Update Task";

    this.elements.titleInput.value = task.title;
    this.elements.descriptionInput.value = task.description || "";
    this.elements.statusSelect.value = task.status;

    this.elements.overlay.classList.add("show");
  },

  close() {
    this.elements.overlay.classList.remove("show");
    this.editingTaskId = null;
    this.elements.form.reset();
  },

  handleSubmit(e) {
    e.preventDefault();

    const taskData = {
      title: this.elements.titleInput.value.trim(),
      description: this.elements.descriptionInput.value.trim(),
      status: this.elements.statusSelect.value,
    };

    if (!taskData.title) {
      ui.showToast("Please enter a task title", "error");
      return;
    }

    if (this.onSubmitCallback) {
      this.onSubmitCallback(taskData, this.editingTaskId);
    }
  },
};
