// API Base URL
const API_URL = "http://localhost:5000/api/tasks";

// DOM Elements
const addTaskBtn = document.getElementById("addTaskBtn");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const cancelBtn = document.getElementById("cancelBtn");
const taskForm = document.getElementById("taskForm");
const modalTitle = document.getElementById("modalTitle");
const submitBtn = document.getElementById("submitBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const loadingState = document.getElementById("loadingState");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const filterButtons = document.querySelectorAll(".filter-btn");

// State
let tasks = [];
let editingTaskId = null;
let currentFilter = "all";

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  fetchTasks();
  setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
  addTaskBtn.addEventListener("click", openAddModal);
  modalClose.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  taskForm.addEventListener("submit", handleSubmit);

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderTasks();
    });
  });
}

// API Functions
async function fetchTasks() {
  showLoading(true);
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    tasks = await response.json();
    renderTasks();
    updateStats();
  } catch (error) {
    showToast(
      "Failed to load tasks. Make sure the server is running.",
      "error",
    );
    console.error("Fetch error:", error);
  } finally {
    showLoading(false);
  }
}

async function createTask(taskData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error("Failed to create task");
    const newTask = await response.json();
    tasks.unshift(newTask);
    renderTasks();
    updateStats();
    showToast("Task created successfully!");
    closeModal();
  } catch (error) {
    showToast("Failed to create task", "error");
    console.error("Create error:", error);
  }
}

async function updateTask(id, taskData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error("Failed to update task");
    const updatedTask = await response.json();
    const index = tasks.findIndex((t) => t._id === id);
    if (index !== -1) tasks[index] = updatedTask;
    renderTasks();
    updateStats();
    showToast("Task updated successfully!");
    closeModal();
  } catch (error) {
    showToast("Failed to update task", "error");
    console.error("Update error:", error);
  }
}

async function deleteTask(id) {
  if (!confirm("Are you sure you want to delete this task?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete task");
    tasks = tasks.filter((t) => t._id !== id);
    renderTasks();
    updateStats();
    showToast("Task deleted successfully!");
  } catch (error) {
    showToast("Failed to delete task", "error");
    console.error("Delete error:", error);
  }
}

async function toggleTaskStatus(id) {
  const task = tasks.find((t) => t._id === id);
  if (!task) return;

  const newStatus = task.status === "completed" ? "pending" : "completed";
  await updateTask(id, { status: newStatus });
}

// UI Functions
function renderTasks() {
  const filteredTasks =
    currentFilter === "all"
      ? tasks
      : tasks.filter((t) => t.status === currentFilter);

  if (filteredTasks.length === 0) {
    taskList.innerHTML = "";
    emptyState.classList.add("show");
    return;
  }

  emptyState.classList.remove("show");
  taskList.innerHTML = filteredTasks
    .map((task) => createTaskCard(task))
    .join("");

  // Add event listeners to task cards
  document.querySelectorAll(".task-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("click", () =>
      toggleTaskStatus(checkbox.dataset.id),
    );
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => openEditModal(btn.dataset.id));
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => deleteTask(btn.dataset.id));
  });
}

function createTaskCard(task) {
  const date = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `
    <div class="task-card ${task.status === "completed" ? "completed" : ""}">
      <div class="task-checkbox ${task.status === "completed" ? "completed" : ""}" data-id="${task._id}"></div>
      <div class="task-content">
        <h3 class="task-title">${escapeHtml(task.title)}</h3>
        ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ""}
        <div class="task-meta">
          <span class="task-status ${task.status}">${formatStatus(task.status)}</span>
          <span class="task-date">${date}</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="task-action-btn edit-btn" data-id="${task._id}" title="Edit">✎</button>
        <button class="task-action-btn delete delete-btn" data-id="${task._id}" title="Delete">🗑</button>
      </div>
    </div>
  `;
}

function updateStats() {
  document.getElementById("totalTasks").textContent = tasks.length;
  document.getElementById("pendingTasks").textContent = tasks.filter(
    (t) => t.status === "pending",
  ).length;
  document.getElementById("inProgressTasks").textContent = tasks.filter(
    (t) => t.status === "in-progress",
  ).length;
  document.getElementById("completedTasks").textContent = tasks.filter(
    (t) => t.status === "completed",
  ).length;
}

// Modal Functions
function openAddModal() {
  editingTaskId = null;
  modalTitle.textContent = "Add New Task";
  submitBtn.textContent = "Add Task";
  taskForm.reset();
  modalOverlay.classList.add("show");
}

function openEditModal(id) {
  const task = tasks.find((t) => t._id === id);
  if (!task) return;

  editingTaskId = id;
  modalTitle.textContent = "Edit Task";
  submitBtn.textContent = "Update Task";

  document.getElementById("taskTitle").value = task.title;
  document.getElementById("taskDescription").value = task.description || "";
  document.getElementById("taskStatus").value = task.status;

  modalOverlay.classList.add("show");
}

function closeModal() {
  modalOverlay.classList.remove("show");
  editingTaskId = null;
  taskForm.reset();
}

function handleSubmit(e) {
  e.preventDefault();

  const taskData = {
    title: document.getElementById("taskTitle").value.trim(),
    description: document.getElementById("taskDescription").value.trim(),
    status: document.getElementById("taskStatus").value,
  };

  if (!taskData.title) {
    showToast("Please enter a task title", "error");
    return;
  }

  if (editingTaskId) {
    updateTask(editingTaskId, taskData);
  } else {
    createTask(taskData);
  }
}

// Utility Functions
function showLoading(show) {
  loadingState.classList.toggle("show", show);
  taskList.style.display = show ? "none" : "flex";
}

function showToast(message, type = "success") {
  toastMessage.textContent = message;
  toast.style.background = type === "error" ? "#ef4444" : "#1e293b";
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function formatStatus(status) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
