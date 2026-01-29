import {
    obtenerReservas,
    guardarReserva,
    eliminarReserva,
    obtenerBD,
    obtenerNotebooks,
    formatearFecha
} from "../bbdd/BBDD.js";

/* ===============================
   VERIFICAR SESIÓN
================================ */
const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));
if (!usuarioActivo) {
    window.location.href = "../index.html";
}

/* ===============================
   VOLVER AL MENÚ
================================ */
window.volverMenu = function () {
    window.location.href = "menu.html";
};

/* ===============================
   CARGAR RESERVAS
================================ */
function cargarReservas() {
    const reservas = obtenerReservas();
    const usuarios = obtenerBD();
    const notebooks = obtenerNotebooks();

    const tbody = document.getElementById("tbodyReservas");
    tbody.innerHTML = "";

    if (reservas.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 8;
        td.style.textAlign = "center";
        td.style.padding = "40px";
        td.textContent = "No hay reservas registradas";
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    const hoy = new Date();

    for (let i = 0; i < reservas.length; i++) {
        const r = reservas[i];

        const docente = usuarios.find(u => u.id === r.docenteId);
        const notebook = notebooks.find(n => n.id === r.notebookId);

        const fechaReserva = new Date(r.fecha);
        const vencida = fechaReserva < hoy;

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${r.id}</td>
            <td>${docente ? docente.apellido + " " + docente.nombre : "N/A"}</td>
            <td>${docente ? docente.dni : "N/A"}</td>
            <td>${notebook ? notebook.codigo + " - " + notebook.marca + " " + notebook.modelo : "N/A"}</td>
            <td>${formatearFecha(r.fecha)}</td>
            <td>${r.duracion} horas</td>
            <td>
                <span class="badge ${vencida ? "badge-vencida" : "badge-activa"}">
                    ${vencida ? "Vencida" : "Activa"}
                </span>
            </td>
            <td>
                <button class="btn btn-danger btn-icon" onclick="eliminarReservaClick(${r.id})">
                    🗑️ Cancelar
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    }
}

/* ===============================
   CREAR RESERVA
================================ */
window.abrirModalCrear = async function () {
    const docentes = obtenerBD().filter(u => u.tipo === "Docente");
    const notebooks = obtenerNotebooks().filter(n => n.estado === "Disponible");

    if (notebooks.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "Advertencia",
            text: "No hay notebooks disponibles",
            confirmButtonColor: "#667eea"
        });
        return;
    }

    const opcionesDocentes = docentes.map(d =>
        `<option value="${d.id}">${d.apellido} ${d.nombre} - DNI ${d.dni}</option>`
    ).join("");

    const opcionesNotebooks = notebooks.map(n =>
        `<option value="${n.id}">${n.codigo} - ${n.marca} ${n.modelo}</option>`
    ).join("");

    const hoy = new Date().toISOString().split("T")[0];

    const { value } = await Swal.fire({
        title: "Nueva Reserva",
        html: `
            <select id="docente" class="swal2-select">
                <option value="">Seleccionar Docente</option>
                ${opcionesDocentes}
            </select>

            <select id="notebook" class="swal2-select">
                <option value="">Seleccionar Notebook</option>
                ${opcionesNotebooks}
            </select>

            <input id="fecha" type="date" class="swal2-input" value="${hoy}">
            <input id="hora" type="time" class="swal2-input">
            <input id="duracion" type="number" class="swal2-input" value="2" min="1">
        `,
        showCancelButton: true,
        confirmButtonText: "Crear",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#667eea",
        preConfirm: () => {
            const docenteId = document.getElementById("docente").value;
            const notebookId = document.getElementById("notebook").value;
            const fecha = document.getElementById("fecha").value;
            const hora = document.getElementById("hora").value;
            const duracion = document.getElementById("duracion").value;

            if (!docenteId || !notebookId || !fecha || !hora || !duracion) {
                Swal.showValidationMessage("Completá todos los campos");
                return false;
            }

            return {
                docenteId: parseInt(docenteId),
                notebookId: parseInt(notebookId),
                fecha: new Date(fecha + "T" + hora).toISOString(),
                duracion: parseInt(duracion)
            };
        }
    });

    if (value) {
        guardarReserva(value);

        Swal.fire({
            icon: "success",
            title: "Reserva creada",
            confirmButtonColor: "#667eea"
        });

        cargarReservas();
    }
};

/* ===============================
   ELIMINAR RESERVA
================================ */
window.eliminarReservaClick = function (id) {
    Swal.fire({
        title: "¿Cancelar reserva?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        confirmButtonColor: "#dc3545"
    }).then(result => {
        if (result.isConfirmed) {
            eliminarReserva(id);

            Swal.fire({
                icon: "success",
                title: "Reserva cancelada",
                confirmButtonColor: "#667eea"
            });

            cargarReservas();
        }
    });
};

/* ===============================
   INICIO
================================ */
cargarReservas();
