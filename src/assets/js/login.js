document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-login');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const correoIngresado = document.getElementById('correo').value.trim();
    const contrasenaIngresada = document.getElementById('contrasena').value;

    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRegistrado'));

    if (!usuarioGuardado) {
      alert('No hay usuarios registrados. Por favor, regístrate primero.');
      return;
    }

    if (correoIngresado === usuarioGuardado.correo &&
      contrasenaIngresada === usuarioGuardado.contrasena
    ) {
      alert(`Bienvenido, ${usuarioGuardado.nombre}!`);
      localStorage.setItem('usuarioLogueado', true);
      localStorage.setItem('nombreUsuario', usuarioGuardado.nombre);
      window.location.href = 'inicio.html';
    } else {
      alert('Correo o contraseña incorrectos. Intenta nuevamente.');
    }
  });
});