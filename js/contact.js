document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const fileName = document.querySelector(".file-name");
  const fileRemoveBtn = document.getElementById("fileRemoveBtn");

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length === 0) {
      fileName.textContent = "Aucun fichier choisi";
      fileRemoveBtn.style.display = "none";
    } else {
      fileName.textContent = fileInput.files[0].name;
      fileRemoveBtn.style.display = "inline-block";
    }
  });

  fileRemoveBtn.addEventListener("click", () => {
    fileInput.value = "";
    fileName.textContent = "Aucun fichier choisi";
    fileRemoveBtn.style.display = "none";
  });
});

// Gestion de l'envoi du formulaire
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form); // Permet les PJ

  try {
    const res = await fetch("https://cvernet-server.onrender.com/contact", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    document.getElementById("response").textContent = data.message;
    form.reset();
    document.querySelector(".file-name").textContent = "Aucun fichier choisi"; // reset affichage fichier
  } catch (err) {
    document.getElementById("response").textContent = "Erreur de connexion ❌";
  }
});
