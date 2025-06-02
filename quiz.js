// Lista de preguntas (con opciones y la respuesta correcta)

let preguntas;

fetch('./assets/preguntas_cultura_general.json')
.then(response => response.json())
.then(preguntasJson => {
  preguntas = preguntasJson;
});

let preguntaActual = 0;  // número de pregunta actual
let puntuacion = 0;    // número de respuestas correctas
let mostrarBotonEmpezar = true;

// Mostrar la pregunta actual
function mostrarPregunta() {

  if (mostrarBotonEmpezar) {
    document.getElementById("botonEmpezar").hidden = true;
    mostrarBotonEmpezar = false;
  }
  const p = preguntas[preguntaActual];
  document.getElementById("pregunta").textContent = p.pregunta;

  const elementoOpciones = document.getElementById("opciones");
  elementoOpciones.innerHTML = "";

  for (let i = 0; i < p.opciones.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = p.opciones[i];
    btn.onclick = function() {
      comprobarRespuesta(i);
    }

    elementoOpciones.appendChild(btn);
  }
}

// Comprobar si la respuesta es correcta
function comprobarRespuesta(respuestaUsuario) {
  const correcta = preguntas[preguntaActual].respuestaCorrecta;
  if (respuestaUsuario == correcta) {
    const audio = new Audio('assets/aplausos.mp3');
    audio.play();
    alert("¡Oleoleole!");
    puntuacion += 1;
  } else {
    const audio = new Audio('assets/fallo.mp3');
    audio.play();
    alert("A estudiar amor");
  }
  siguientePregunta();
}


// Pasar a la siguiente pregunta o mostrar la puntuación
function siguientePregunta() {
  preguntaActual = preguntaActual + 1;
  if (preguntaActual < preguntas.length) {
    mostrarPregunta();
  } else {
    document.getElementById("pregunta").textContent = "Juego Terminado";
    document.getElementById("opciones").innerHTML = "";
    document.getElementById("puntuacion").textContent = "Tu puntuación ha sido: " +           puntuacion;
  }
}
