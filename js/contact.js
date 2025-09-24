document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form); // FormData pour PJ

  try {
    const res = await fetch("https://cvernet-server.onrender.com/contact", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    document.getElementById("response").textContent = data.message;
    form.reset();
  } catch (err) {
    document.getElementById("response").textContent = "Erreur de connexion ❌";
  }
});
