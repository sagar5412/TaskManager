// Filter Component - Status filter buttons

const filter = {
  buttons: null,
  onFilterChange: null,

  init(callback) {
    this.buttons = document.querySelectorAll(".filter-btn");
    this.onFilterChange = callback;

    this.buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.setActive(btn);
        if (this.onFilterChange) {
          this.onFilterChange(btn.dataset.filter);
        }
      });
    });
  },

  setActive(activeBtn) {
    this.buttons.forEach((b) => b.classList.remove("active"));
    activeBtn.classList.add("active");
  },
};
