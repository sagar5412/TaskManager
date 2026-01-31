// UI Utilities - Toast notifications, loading states, helpers

const ui = {
  elements: {
    toast: null,
    toastMessage: null,
    loadingState: null,
    taskList: null,
    emptyState: null,
  },

  init() {
    this.elements.toast = document.getElementById("toast");
    this.elements.toastMessage = document.getElementById("toastMessage");
    this.elements.loadingState = document.getElementById("loadingState");
    this.elements.taskList = document.getElementById("taskList");
    this.elements.emptyState = document.getElementById("emptyState");
  },

  showToast(message, type = "success") {
    const { toast, toastMessage } = this.elements;
    toastMessage.textContent = message;
    toast.style.background = type === "error" ? "#ef4444" : "#1e293b";
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  },

  showLoading(show) {
    const { loadingState, taskList } = this.elements;
    loadingState.classList.toggle("show", show);
    taskList.style.display = show ? "none" : "flex";
  },

  showEmptyState(show) {
    this.elements.emptyState.classList.toggle("show", show);
  },

  formatStatus(status) {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  },

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  },

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  },
};
