// SESIÓN 1.7 - Manipulación Avanzada del DOM

const btnCargar = document.querySelector("#btn-cargar");
const btnAgregarFinal = document.querySelector("#btn-agregar-final");
const btnAgregarInicio = document.querySelector("#btn-agregar-inicio");
const btnAviso = document.querySelector("#btn-aviso");
const btnResumen = document.querySelector("#btn-resumen");
const btnReemplazarPrimera = document.querySelector("#btn-reemplazar-primera");

const resumen = document.querySelector("#resumen");
const panelEquipos = document.querySelector("#panel-equipos");
const listaEquipos = document.querySelector("#lista-equipos");

function crearTarjetaEquipo(equipo) {

  const tarjeta = document.createElement("article");

  tarjeta.classList.add("card-equipo");

  if (equipo.destacado) {
    tarjeta.classList.add("destacado");
  }

  const titulo = document.createElement("h3");
  titulo.textContent = equipo.nombre;

  const codigo = document.createElement("p");
  codigo.textContent = `Código: ${equipo.codigo}`;

  const grupo = document.createElement("p");
  grupo.textContent = `Grupo: ${equipo.grupo}`;

  const continente = document.createElement("p");
  continente.textContent = `Continente: ${equipo.continente}`;

  const confederacion = document.createElement("p");
  confederacion.textContent = `Confederación: ${equipo.confederacion}`;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.classList.add("btn-eliminar");

  btnEliminar.addEventListener("click", function () {
    btnEliminar.parentElement.remove();
    actualizarResumen();
  });

  tarjeta.append(
    titulo,
    codigo,
    grupo,
    continente,
    confederacion,
    btnEliminar
  );

  return tarjeta;
}

async function cargarEquipos() {
  try {

    const respuesta = await fetch("data/equipos.json");

    const datos = await respuesta.json();

    listaEquipos.replaceChildren();

    datos.equipos.forEach(function (equipo) {
      const tarjeta = crearTarjetaEquipo(equipo);
      listaEquipos.append(tarjeta);
    });

    actualizarResumen();

  } catch (error) {
    console.error("Error al cargar equipos:", error);
  }
}

function agregarEquipoAlFinal() {

  const equipo = {
    nombre: "Chile",
    codigo: "CHI",
    grupo: "E",
    continente: "Sudamérica",
    confederacion: "CONMEBOL",
    destacado: false
  };

  const tarjeta = crearTarjetaEquipo(equipo);

  listaEquipos.append(tarjeta);

  actualizarResumen();
}

function agregarEquipoAlInicio() {

  const equipo = {
    nombre: "Perú",
    codigo: "PER",
    grupo: "G",
    continente: "Sudamérica",
    confederacion: "CONMEBOL",
    destacado: true
  };

  const tarjeta = crearTarjetaEquipo(equipo);

  listaEquipos.prepend(tarjeta);

  actualizarResumen();
}

function insertarAviso() {

  const aviso = document.createElement("p");

  aviso.classList.add("aviso");

  aviso.textContent =
    "Aviso: El panel de equipos ha sido actualizado.";

  panelEquipos.before(aviso);
}

function actualizarResumen() {

  const total = listaEquipos.children.length;

  const mensaje = document.createElement("p");

  mensaje.textContent = `Total de equipos mostrados: ${total}`;

  resumen.replaceChildren(mensaje);
}

function reemplazarPrimeraTarjeta() {

  const primeraTarjeta = listaEquipos.firstElementChild;

  if (!primeraTarjeta) return;

  const nuevoEquipo = {
    nombre: "Francia",
    codigo: "FRA",
    grupo: "A",
    continente: "Europa",
    confederacion: "UEFA",
    destacado: true
  };

  const nuevaTarjeta = crearTarjetaEquipo(nuevoEquipo);

  primeraTarjeta.replaceWith(nuevaTarjeta);

  actualizarResumen();
}

btnCargar.addEventListener("click", cargarEquipos);
btnAgregarFinal.addEventListener("click", agregarEquipoAlFinal);
btnAgregarInicio.addEventListener("click", agregarEquipoAlInicio);
btnAviso.addEventListener("click", insertarAviso);
btnResumen.addEventListener("click", actualizarResumen);
btnReemplazarPrimera.addEventListener("click", reemplazarPrimeraTarjeta);