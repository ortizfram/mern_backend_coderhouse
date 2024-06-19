// public/js/handleFormInyection.js

function getCookie() {
  fetch("/inyectar/getCookie")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

function submitForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  fetch("/inyectar/setCookie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: email }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Cookie creada correctamente");
      } else {
        console.error("Error al crear la cookie");
      }
    })
    .catch((error) => console.error("Error:", error));
}
