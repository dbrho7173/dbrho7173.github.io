// Open a popup when a project card is clicked
document.querySelectorAll("[data-modal]").forEach(function (card) {
  card.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById(card.dataset.modal).showModal();
  });
});

// Close a popup with its Close button, or by clicking the dark area outside it
document.querySelectorAll("dialog").forEach(function (popup) {
  popup.querySelector(".close").addEventListener("click", function () {
    popup.close();
  });
  popup.addEventListener("click", function (e) {
    if (e.target === popup) popup.close();
  });
  // Stop any video when the popup closes
  popup.addEventListener("close", function () {
    popup.querySelectorAll("video").forEach(function (v) { v.pause(); });
  });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
