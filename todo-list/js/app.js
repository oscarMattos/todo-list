// Presionar icono de tarea y hacer focus en el input
document.querySelector("#task-icon").addEventListener("click", function() {
  document.querySelector("#task").focus();
});

//Funcion para que las columnas tengan el mismo alto

  //Guarda el alto de las columnas
  var altoInicial = 100; // Variable global
  var margenInferiorTareas = 17; // Variable global
  var alto = altoInicial; // Variable global

function altoColmunasIguales() {
  console.log("Se ejecuto altoColumnasIguales()");
  // Alto de columnas
  let toDoHeight = document.querySelector("#to-do");
  let inProgressHeight = document.querySelector("#in-progress");
  let doneHeight = document.querySelector("#done");

  //El valor 17 es por el margin inferior de los divs de las tareas
  toDoHeight.style.height = alto + margenInferiorTareas + "px";
  inProgressHeight.style.height = alto + margenInferiorTareas + "px";
  doneHeight.style.height = alto + margenInferiorTareas + "px";

}

// Funcion para obtener la fecha
function fechaActual() {

  let dia = new Date().getDate();
  let mes = new Date().getMonth();
  let ano = new Date().getFullYear();

  let diaString = dia.toString();
  let mesString = mes.toString();
  let anoString = ano.toString();

  let fecha = diaString + "/" + mesString + "/" + anoString;

  return fecha;

}

//Funciones para Drag and Drop
function allowDrop(evento) {
  evento.preventDefault();
}

function drag(evento) {
  evento.dataTransfer.setData("text", evento.target.id);
  document.querySelector("#to-do").style.outline = "1px dashed $grey";
  document.querySelector("#in-progress").style.outline = "1px dashed $grey";
  document.querySelector("#done").style.outline = "1px dashed $grey";
}

function drop(evento) {
  evento.preventDefault();
  var data = evento.dataTransfer.getData("text");
  evento.target.appendChild(document.getElementById(data));
  document.querySelector("#to-do").style.outline = "1px dashed $grey";
  document.querySelector("#in-progress").style.outline = "1px dashed $grey";
  document.querySelector("#done").style.outline = "1px dashed $grey";
}

//Funcion para crear una nota de tarea

  //Contador para tener tareas con identificadores unicos
  var contadorIdTarea = 1; // Variable global

function crearTarea() {
  //Obtener value to input
  let tareaInput = document.querySelector("#task");
  let tareaInputValue = tareaInput.value;
  let tareaInputText = document.createTextNode(tareaInputValue);
  //Crea div contenedor
  let divTarea = document.createElement("DIV");
  divTarea.setAttribute("id", "tarea");
  divTarea.setAttribute("class", "task-card");
  divTarea.setAttribute("draggable", "true");
  divTarea.setAttribute("ondragstart", "drag(event)");
  //Crea span para fecha
  let spanFecha = document.createElement("SPAN");
  spanFecha.setAttribute("class", "date");
  spanFecha.innerHTML = fechaActual();
  //Crea span para bullet
  let spanBullet = document.createElement("SPAN");
  spanBullet.setAttribute("id", "bullet");
  //Seteo numero a id
  spanBullet.id += "-" + contadorIdTarea;
  //Crea un span para mostrar el numero de la tarea
  let spanTaskNumber = document.createElement("SPAN");
  spanTaskNumber.setAttribute("id", "task-number");
  spanTaskNumber.id += "-" + contadorIdTarea;
  spanTaskNumber.innerHTML = "Task-" + contadorIdTarea;
  //Crea botón para cerrar
  let buttonClose = document.createElement("BUTTON");
  buttonClose.setAttribute("class", "delete-card");
  buttonClose.setAttribute("id", "delete-card");
  buttonClose.id += "-" + contadorIdTarea;
  buttonClose.setAttribute("onclick", "eliminarTarea(event)");
  //Crea tag <i></i>
  let iconButton = document.createElement("I");
  iconButton.setAttribute("class", "material-icons");
  //Crea el texto "close" para tag <i></i>
  let iconText = document.createTextNode("close");
  //Pone el texto "close" dentro tag <i></i>
  let icon = iconButton.appendChild(iconText);
  //Pone el "icono" dentro del botón
  buttonClose.appendChild(iconButton);
  //create p tag
  let taskText = document.createElement("P");
  taskText.setAttribute("class", "body1");
  //Pone el texto capturado del input dentro tag <p></p>
  taskText.appendChild(tareaInputText);
  //Poner todos los elementos hijos dentro del div de la tarea
  divTarea.appendChild(spanFecha);
  divTarea.appendChild(spanBullet);
  divTarea.appendChild(spanTaskNumber);
  divTarea.appendChild(buttonClose);
  divTarea.appendChild(taskText);
  //Poner Elemento HTML creado dentro del Board To Do
  document.querySelector("#to-do").appendChild(divTarea);
  //Poner id único a cada tarea
  divTarea.id += "-" + contadorIdTarea;
  //Verificar si se ejecuta
  console.log("Se ejecuto crearTarea");
  console.log("Esta es la Tarea: " + contadorIdTarea);
  //Sumarle la altura del div creado
  alto = alto + margenInferiorTareas + divTarea.clientHeight;
  //Poner el alto de las columna
  altoColmunasIguales();
  console.log("alto div de la tarea: " + divTarea.clientHeight);
  console.log("valor de la variable alto: " + alto);
  //Limpiar input y poner placeholder
  limpiarInput("#task");
  //sumarle 1 al contador
  contadorIdTarea++;
}
// Se le pasa la función de crearTarea con un evento click al boton #add-button
document.querySelector("#add-button").addEventListener("click", crearTarea);

//Funcion para limpiar Input
function limpiarInput(selector) {
  let selectorInput = document.querySelector(selector);
  //Limpiar input
  selectorInput.value = "";
}

// Funcion para eliminar tarea
function eliminarTarea(event) {
  //Se captura el evento para poder acceder a los atributos del tag
  let botonId = document.getElementById(event.target.parentNode.id);
  //Se selecciona dinamicamente la tarea para eliminar
  let tareaParaEliminar = document.getElementById(botonId.parentNode.id);

  //Verificar valor de variable global "alto", antes de eliminar
  console.log("Alto mide: " + alto);
  //Verificar valor de función "tareaParaEliminar()"
  console.log("Se le elimina: " + tareaParaEliminar.clientHeight);

  //Se setea al valor actual la variable global "alto"
  alto = alto - margenInferiorTareas - tareaParaEliminar.clientHeight;

  //Verificar de variable global "alto", después de eliminar
  console.log("Alto ahora mide: " + alto);

  //Se elimina tarea  del DOM
  tareaParaEliminar.parentNode.removeChild(tareaParaEliminar);

  //Se ejecuta la función "altoColmunasIguales()" para actualizar el alto en el DOM
  altoColmunasIguales();

  // Verificaciones Extra
  console.log("Id del boton Eliminar = '" + event.target.parentNode.id);
  console.log("Type of del Id boton = " + typeof botonId);
  console.log("Este el Contenedor de la tarea = " + botonId.parentNode.id);
  console.log("Type of del la tarea para eliminar = " + typeof tareaParaEliminar);
  console.log("Se elimino = " + botonId.parentNode.id);
}

// Funciones que cargan junto con la pagina
window.onload = function() {

}
