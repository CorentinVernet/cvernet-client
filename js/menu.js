const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("show");
    burger.classList.toggle("active"); // <-- ajoute cette ligne
  });

  // Ferme le menu quand on clique sur un lien
  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("show");
      burger.classList.remove("active"); // <-- et celle-ci
    });
  });
}
