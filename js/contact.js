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
  const formData = new FormData(form); // PJ inclus
  const submitBtn = form.querySelector("button[type='submit']");
  const responseEl = document.getElementById("response");

  const emailInput = form.querySelector('input[name="email"]');
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ✅ Vérification email avant envoi
  if (!emailRegex.test(email)) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Email invalide ❌";
    responseEl.style.color = "red";
    responseEl.textContent = "Merci d’entrer une adresse email valide.";

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Envoyer";
      responseEl.textContent = "";
    }, 3000);

    return;
  }

  // Bloque le bouton et change le texte pendant l'envoi
  submitBtn.disabled = true;
  submitBtn.textContent = "Envoi…";
  responseEl.textContent = "";

  try {
    const res = await fetch("https://cvernet-server.onrender.com/contact", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      submitBtn.textContent = "Message envoyé";
      responseEl.style.color = "green";
      form.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Envoyer";
        responseEl.textContent = "";
      }, 3000);
    } else {
      submitBtn.textContent = "Erreur ❌";
      responseEl.style.color = "red";

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Envoyer";
        responseEl.textContent = "";
      }, 3000);
    }
  } catch (err) {
    submitBtn.textContent = "Erreur réseau ❌";
    responseEl.style.color = "red";

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Envoyer";
      responseEl.textContent = "";
    }, 3000);
  }
});
