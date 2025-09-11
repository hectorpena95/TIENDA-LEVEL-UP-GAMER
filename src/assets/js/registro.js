document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-registro');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Capturar valores
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const contrasena = document.getElementById('contrasena').value;
    const confirmarContrasena = document.getElementById('confirmarContrasena').value;

    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const edad = calcularEdad(fechaNacimiento);

    if (edad < 18) {
      alert('Debes tener al menos 18 años para registrarte en Level-Up Gamer.');
      return;
    }

    // Validación de contraseñas
    if (contrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden. Por favor, verifica.');
      return;
    }

    // Aquí podrías agregar más validaciones si lo deseas

    // Simulación de almacenamiento (puedes modularizar esto luego)
    const usuario = {
      nombre,
      correo,
      telefono,
      direccion,
      contrasena // ⚠️ En producción, nunca guardes contraseñas en texto plano
    };

    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));
    alert('Registro exitoso. ¡Bienvenido a Level-Up Gamer!');
    form.reset();
    window.location.href = 'login.html';
  });

  function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
  }

  const usuario = {
  nombre,
  correo,
  telefono,
  direccion,
  fechaNacimiento,
  contrasena
};

localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));
  
});