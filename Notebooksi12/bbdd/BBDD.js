const STORAGE_KEY = "datosLocal";
const NOTEBOOKS_KEY = "notebooksLocal";
const PRESTAMOS_KEY = "prestamosLocal";
const RESERVAS_KEY = "reservasLocal";

// ==================== FUNCIONES AUXILIARES ====================

function obtenerIdMaximo(array) {
  let idMaximo = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id > idMaximo) {
      idMaximo = array[i].id;
    }
  }
  return idMaximo + 1;
}

function buscarEnArray(array, propiedad, valor) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][propiedad] === valor) {
      return array[i];
    }
  }
  return null;
}

function buscarIndice(array, propiedad, valor) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][propiedad] === valor) {
      return i;
    }
  }
  return -1;
}

function existeEnArray(array, propiedad, valor) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][propiedad] === valor) {
      return true;
    }
  }
  return false;
}

function filtrarArray(array, propiedad, valor) {
  const nuevoArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i][propiedad] !== valor) {
      nuevoArray.push(array[i]);
    }
  }
  return nuevoArray;
}

function agregarCero(numero) {
  if (numero < 10) {
    return "0" + numero;
  } else {
    return numero;
  }
}

function obtenerFechaActual() {
  const hoy = new Date();
  
  const dia = hoy.getDate();
  const mes = hoy.getMonth() + 1;
  const anio = hoy.getFullYear();
  
  const diaFormato = agregarCero(dia);
  const mesFormato = agregarCero(mes);
  
  const fechaTexto = diaFormato + "/" + mesFormato + "/" + anio;
  
  return fechaTexto;
}

function obtenerHoraActual() {
  const ahora = new Date();
  
  const hora = ahora.getHours();
  const minuto = ahora.getMinutes();
  
  const horaFormato = agregarCero(hora);
  const minutoFormato = agregarCero(minuto);
  
  const horaTexto = horaFormato + ":" + minutoFormato;
  
  return horaTexto;
}

function obtenerFechaHoraActual() {
  const fecha = obtenerFechaActual();
  const hora = obtenerHoraActual();
  
  return fecha + " " + hora;
}

function guardarArray(array) {
  const datosString = JSON.stringify(array);
  localStorage.setItem(STORAGE_KEY, datosString);
  return true;
}

// ==================== USUARIOS ====================

export function obtenerBD() {
  const datos = localStorage.getItem(STORAGE_KEY);
  if (datos === null) {
    const BBDD = [
      {
        id: 1,
        user: "admin",
        password: "admin",
        nombre: "Administrador",
        apellido: "Sistema",
        dni: "00000000",
        email: "admin@isft12.edu.ar",
        tipo: "Administrador"
      },
    ];
    guardarArray(BBDD);
    return BBDD;
  }
  return JSON.parse(datos);
}

export function GuardarElemento(elemento) {
  const arrayActual = obtenerBD();
  elemento.id = obtenerIdMaximo(arrayActual);
  arrayActual.push(elemento);
  guardarArray(arrayActual);
  return arrayActual;
}

export function buscarUsuario(array, usuario) {
  return existeEnArray(array, "user", usuario);
}

export function buscarUsuarioPorId(id) {
  const usuarios = obtenerBD();
  return buscarEnArray(usuarios, "id", parseInt(id));
}

export function eliminarUsuario(usuario) {
  const usuarios = obtenerBD();
  const indice = buscarIndice(usuarios, "user", usuario);
  
  if (indice !== -1) {
    usuarios.splice(indice, 1);
    guardarArray(usuarios);
    return true;
  }
  return false;
}

export function actualizarUsuario(id, datosNuevos) {
  const usuarios = obtenerBD();
  const indice = buscarIndice(usuarios, "id", parseInt(id));
  
  if (indice !== -1) {
    if (datosNuevos.user) {
      usuarios[indice].user = datosNuevos.user;
    }
    if (datosNuevos.nombre) {
      usuarios[indice].nombre = datosNuevos.nombre;
    }
    if (datosNuevos.apellido) {
      usuarios[indice].apellido = datosNuevos.apellido;
    }
    if (datosNuevos.dni) {
      usuarios[indice].dni = datosNuevos.dni;
    }
    if (datosNuevos.email) {
      usuarios[indice].email = datosNuevos.email;
    }
    if (datosNuevos.tipo) {
      usuarios[indice].tipo = datosNuevos.tipo;
    }
    if (datosNuevos.password) {
      usuarios[indice].password = datosNuevos.password;
    }
    guardarArray(usuarios);
    return true;
  }
  return false;
}

export function validarLogin(usuario, password) {
  const usuarios = obtenerBD();
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].user === usuario && usuarios[i].password === password) {
      return usuarios[i];
    }
  }
  return null;
}

// ==================== NOTEBOOKS ====================

export function obtenerNotebooks() {
  const datos = localStorage.getItem(NOTEBOOKS_KEY);
  if (datos === null) {
    const notebooks = [
      { id: 1, codigo: 'NB001', marca: 'HP', modelo: '240 G8', procesador: 'Intel i5', ram: '8GB', almacenamiento: '256GB SSD', estado: 'Disponible', observaciones: '' },
      { id: 2, codigo: 'NB002', marca: 'Lenovo', modelo: 'V15', procesador: 'AMD Ryzen 5', ram: '8GB', almacenamiento: '512GB SSD', estado: 'Disponible', observaciones: '' },
      { id: 3, codigo: 'NB003', marca: 'Dell', modelo: '3520', procesador: 'Intel i7', ram: '16GB', almacenamiento: '512GB SSD', estado: 'En reparación', observaciones: 'Pantalla con píxeles muertos' },
    ];
    localStorage.setItem(NOTEBOOKS_KEY, JSON.stringify(notebooks));
    return notebooks;
  }
  return JSON.parse(datos);
}

export function guardarNotebook(notebook) {
  const notebooks = obtenerNotebooks();
  notebook.id = obtenerIdMaximo(notebooks);
  notebooks.push(notebook);
  localStorage.setItem(NOTEBOOKS_KEY, JSON.stringify(notebooks));
  return notebooks;
}

export function actualizarNotebook(id, datosNuevos) {
  const notebooks = obtenerNotebooks();
  const indice = buscarIndice(notebooks, "id", parseInt(id));
  
  if (indice !== -1) {
    if (datosNuevos.codigo) {
      notebooks[indice].codigo = datosNuevos.codigo;
    }
    if (datosNuevos.marca) {
      notebooks[indice].marca = datosNuevos.marca;
    }
    if (datosNuevos.modelo) {
      notebooks[indice].modelo = datosNuevos.modelo;
    }
    if (datosNuevos.procesador) {
      notebooks[indice].procesador = datosNuevos.procesador;
    }
    if (datosNuevos.ram) {
      notebooks[indice].ram = datosNuevos.ram;
    }
    if (datosNuevos.almacenamiento) {
      notebooks[indice].almacenamiento = datosNuevos.almacenamiento;
    }
    if (datosNuevos.estado) {
      notebooks[indice].estado = datosNuevos.estado;
    }
    if (datosNuevos.observaciones) {
      notebooks[indice].observaciones = datosNuevos.observaciones;
    }
    localStorage.setItem(NOTEBOOKS_KEY, JSON.stringify(notebooks));
    return true;
  }
  return false;
}

export function eliminarNotebook(id) {
  const notebooks = obtenerNotebooks();
  const filtered = filtrarArray(notebooks, "id", parseInt(id));
  localStorage.setItem(NOTEBOOKS_KEY, JSON.stringify(filtered));
  return true;
}

export function buscarNotebookPorId(id) {
  const notebooks = obtenerNotebooks();
  return buscarEnArray(notebooks, "id", parseInt(id));
}

// ==================== PRÉSTAMOS ====================

export function obtenerPrestamos() {
  const datos = localStorage.getItem(PRESTAMOS_KEY);
  if (datos === null) {
    localStorage.setItem(PRESTAMOS_KEY, JSON.stringify([]));
    return [];
  }
  return JSON.parse(datos);
}

export function guardarPrestamo(prestamo) {
  const prestamos = obtenerPrestamos();
  prestamo.id = obtenerIdMaximo(prestamos);
  prestamo.estado = 'Activo';
  prestamo.fechaCreacion = obtenerFechaHoraActual();
  prestamos.push(prestamo);
  localStorage.setItem(PRESTAMOS_KEY, JSON.stringify(prestamos));
  
  // Actualizar estado de la notebook
  actualizarNotebook(prestamo.notebookId, { estado: 'En préstamo' });
  
  return prestamos;
}

export function completarPrestamo(id, observaciones = '') {
  const prestamos = obtenerPrestamos();
  const indice = buscarIndice(prestamos, "id", parseInt(id));
  
  if (indice !== -1) {
    prestamos[indice].estado = 'Completado';
    prestamos[indice].fechaDevolucionReal = obtenerFechaHoraActual();
    prestamos[indice].observacionesDevolucion = observaciones;
    localStorage.setItem(PRESTAMOS_KEY, JSON.stringify(prestamos));
    
    // Actualizar estado de la notebook a disponible
    actualizarNotebook(prestamos[indice].notebookId, { estado: 'Disponible' });
    return true;
  }
  return false;
}

export function actualizarPrestamo(id, datosNuevos) {
  const prestamos = obtenerPrestamos();
  const indice = buscarIndice(prestamos, "id", parseInt(id));
  
  if (indice !== -1) {
    if (datosNuevos.estado) {
      prestamos[indice].estado = datosNuevos.estado;
    }
    if (datosNuevos.notebookId) {
      prestamos[indice].notebookId = datosNuevos.notebookId;
    }
    if (datosNuevos.usuarioId) {
      prestamos[indice].usuarioId = datosNuevos.usuarioId;
    }
    if (datosNuevos.fechaDevolucionPrevista) {
      prestamos[indice].fechaDevolucionPrevista = datosNuevos.fechaDevolucionPrevista;
    }
    if (datosNuevos.observaciones) {
      prestamos[indice].observaciones = datosNuevos.observaciones;
    }
    localStorage.setItem(PRESTAMOS_KEY, JSON.stringify(prestamos));
    return true;
  }
  return false;
}

export function eliminarPrestamo(id) {
  const prestamos = obtenerPrestamos();
  const filtered = filtrarArray(prestamos, "id", parseInt(id));
  localStorage.setItem(PRESTAMOS_KEY, JSON.stringify(filtered));
  return true;
}

// ==================== RESERVAS ====================

export function obtenerReservas() {
  const datos = localStorage.getItem(RESERVAS_KEY);
  if (datos === null) {
    localStorage.setItem(RESERVAS_KEY, JSON.stringify([]));
    return [];
  }
  return JSON.parse(datos);
}

export function guardarReserva(reserva) {
  const reservas = obtenerReservas();
  reserva.id = obtenerIdMaximo(reservas);
  reservas.push(reserva);
  localStorage.setItem(RESERVAS_KEY, JSON.stringify(reservas));
  return reservas;
}

export function actualizarReserva(id, datosNuevos) {
  const reservas = obtenerReservas();
  const indice = buscarIndice(reservas, "id", parseInt(id));
  
  if (indice !== -1) {
    if (datosNuevos.estado) {
      reservas[indice].estado = datosNuevos.estado;
    }
    if (datosNuevos.fechaReserva) {
      reservas[indice].fechaReserva = datosNuevos.fechaReserva;
    }
    if (datosNuevos.notebookId) {
      reservas[indice].notebookId = datosNuevos.notebookId;
    }
    if (datosNuevos.docenteId) {
      reservas[indice].docenteId = datosNuevos.docenteId;
    }
    if (datosNuevos.fecha) {
      reservas[indice].fecha = datosNuevos.fecha;
    }
    if (datosNuevos.duracion) {
      reservas[indice].duracion = datosNuevos.duracion;
    }
    localStorage.setItem(RESERVAS_KEY, JSON.stringify(reservas));
    return true;
  }
  return false;
}

export function eliminarReserva(id) {
  const reservas = obtenerReservas();
  const filtered = filtrarArray(reservas, "id", parseInt(id));
  localStorage.setItem(RESERVAS_KEY, JSON.stringify(filtered));
  return true;
}

// ==================== UTILIDADES ====================

export function formatearFecha(fechaISO) {
  const partes = fechaISO.split("T");
  const fecha = partes[0];
  
  return fecha;
}

export function formatearFechaCompleta(fechaISO) {
  const partes = fechaISO.split("T");
  const fechaParte = partes[0];
  const horaParte = partes[1];
  
  const diaStr = fechaParte.substring(8, 10);
  const mesStr = fechaParte.substring(5, 7);
  const anioStr = fechaParte.substring(0, 4);
  
  const horaStr = horaParte.substring(0, 5);
  
  const resultado = diaStr + "/" + mesStr + "/" + anioStr + " " + horaStr;
  
  return resultado;
}

export function limpiarBaseDatos() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(NOTEBOOKS_KEY);
  localStorage.removeItem(PRESTAMOS_KEY);
  localStorage.removeItem(RESERVAS_KEY);
}