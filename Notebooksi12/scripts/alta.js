import { obtenerBD, GuardarElemento, buscarUsuario } from "../bbdd/BBDD.js"
const mensaje=document.getElementById("mensaje")
const formulario = document.getElementById("alta")
formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    //comprobar que el usuario no exista y en ese caso pushearlo dentro del local storage
    /*let i = 0;*/
    const array = obtenerBD()
    let booleano;
    const elemento = {};
    /*do {
        if (array[i].user == formulario.user.value) {
            console.log("usuario ya existente")
            booleano = true;
        }
        i++;
    } while (booleano == false && array.lenght > i)*/
    booleano=buscarUsuario(array,formulario.user.value);
    if (booleano == false) {
        elemento.user = formulario.user.value
        elemento.password = formulario.pass.value
        console.log(GuardarElemento(elemento))///importado de BBDD.JS
        mensaje.textContent="EL USUARIO HA SIDO GUARDADO";



    }else{mensaje.textContent="EL USUARIO YA EXISTE";}
})
