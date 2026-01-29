import { validarLogin } from "../bbdd/BBDD.js";

// ============ VARIABLES ============

const formulario = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const sesionActiva = sessionStorage.getItem("usuarioActivo");

// ============ FUNCIONES ============

const irAlMenu = () => {
  window.location.href = "./paginas/menu.html";
};

const irAlLogin = () => {
  window.location.href = "./index.html";
};

const limpiarError = () => {
  loginError.textContent = "";
  loginError.classList.add("hidden");
};

const mostrarError = (mensaje) => {
  loginError.textContent = mensaje;
  loginError.classList.remove("hidden");
};

const procesarLogin = () => {
  const usuario = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!usuario || !password) {
    mostrarError("Completa todos los campos");
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Completa usuario y contraseña",
      confirmButtonColor: "#667eea"
    });
    return;
  }

  const usuarioEncontrado = validarLogin(usuario, password);

  if (usuarioEncontrado) {
    sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
    limpiarError();

    const nombre = usuarioEncontrado.nombre;
    const apellido = usuarioEncontrado.apellido;

    Swal.fire({
      icon: "success",
      title: "¡Bienvenido!",
      text: "Hola " + nombre + " " + apellido,
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      irAlMenu();
    });
  } else {
    mostrarError("Usuario o contraseña incorrectos");

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Usuario o contraseña incorrectos",
      confirmButtonColor: "#667eea"
    });
  }
};

// ============ EVENT LISTENERS ============

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  procesarLogin();
});

// ============ INICIALIZACIÓN ============

if (sesionActiva) {
  irAlMenu();
}