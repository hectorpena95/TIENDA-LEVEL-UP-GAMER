// Recuperar nombre del usuario desde localStorage
const nombreUsuario = localStorage.getItem("nombreUsuario");

// Mostrar nombre en el dashboard
const nombreSpan = document.getElementById("nombre-usuario");
if (nombreUsuario && nombreSpan) {
  nombreSpan.textContent = nombreUsuario;
}

// Cerrar sesión
const cerrarSesionBtn = document.getElementById("cerrar-sesion");
cerrarSesionBtn.addEventListener("click", () => {
  localStorage.removeItem("nombreUsuario");
  localStorage.removeItem("usuarioLogueado");
  window.location.href = "login.html";
});