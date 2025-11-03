document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach(btn => {
    btn.addEventListener("mouseover", () => {
      btn.style.boxShadow = "0 6px 12px rgba(25,118,210,0.5)";
    });
    btn.addEventListener("mouseout", () => {
      btn.style.boxShadow = "0 4px 8px rgba(25,118,210,0.3)";
    });
  });
});
