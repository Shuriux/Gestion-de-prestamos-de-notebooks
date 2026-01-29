import {obtenerBD}from "../bbdd/BBDD.js";
const usuarios=document.getElementById("tablaUsuarios");
const tbody=document.createElement("tbody");
const array=obtenerBD();
for (let i=0;i<array.length;i++){
    const tr=document.createElement("tr");
    const tdUser=document.createElement("td");
    tdUser.textContent=array[i].user;
    tr.appendChild(tdUser);
    tbody.appendChild(tr);
}
usuarios.appendChild(tbody);