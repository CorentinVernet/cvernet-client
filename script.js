document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value,
  };

  try {
    const res = await fetch("https://TON_BACKEND_RENDER.onrender.com/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    document.getElementById("response").textContent = data.message;
  } catch (err) {
    document.getElementById("response").textContent = "Erreur de connexion ❌";
  }
});
