import { eliminarUsuario } from "../bbdd/BBDD.js";

const boton = document.getElementById("eliminar");
const input = document.getElementById("user");

boton.addEventListener("click", () => {
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Ingrese un usuario");
        return;
    }

    const borrado = eliminarUsuario(nombre);

    if (borrado) {
        alert("Usuario eliminado");
    } else {
        alert("El usuario no existe");
    }
});
