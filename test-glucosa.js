// Los botones estan disabled por defecto para que no se pueda avanzar hasta no haber seleccionado una respuesta.
const radioBtn = document.querySelectorAll('input[type="radio"]');

// Al seleccionar un check, busca el boton de next que esta dentro del mismo contenedor y le saca la clase disabled.
radioBtn.forEach(el => el.addEventListener('click', event => {
  const clicked = event.target;
  const clickedParent = clicked.closest(".swiper-slide");
  const parentNext = clickedParent.querySelectorAll('button.btn');
  parentNext.forEach(function (element) {
    element.classList.remove("disabled");
  });
}));

function calcularIMC() {
//get value for height - metros	
  const centimetros = $("#imc-cms").val();
  $('.next-imc').removeClass('disabled');
//get value for weight - kilos
  const kilos = $("#imc-kgs").val();
  const alturaEnMetros = centimetros / 100;
  console.log('kilos' + kilos);
  console.log('metros' + centimetros);

  const imc = Math.round(kilos / (alturaEnMetros * alturaEnMetros));

  console.log('imc: ' + imc);


  if (imc < 25) {
    document.getElementById("imc25").checked = true;
    }
    else if (imc => 25 && bmi <= 30) {
    document.getElementById("imc2530").checked = true;
    }
    else if (imc > 30 ){
      document.getElementById("imc30").checked = true;


  }

}

// CALCULAR RESULTADO FINAL
let valoresRespuestas = [];

// Al avanzar de pregunta cambiar los valores del circulo de porcentaje
swiperGlucosaPreguntas.on('slideChange', function () {
  const progressPercentages = [0, 14, 28, 42, 56, 70, 84, 98, 100];
  const currentIndex = swiperGlucosaPreguntas.activeIndex;
  const progressPercentage = progressPercentages[currentIndex];

  // Actualizar la barra de progreso horizontal
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');

  progressBar.style.width = progressPercentage + '%';
  progressText.innerHTML = progressPercentage + '% COMPLETADO';
});

// Al finalizar las preguntas, cambia al slide de Resultados
swiperCalculadora.on('slideChange', function () {
  setTimeout(function() {
    document.querySelector('.loading').classList.add('no-visible');
    document.querySelector('.content-resultado').classList.add('z-index100');
  }, 2500);

  // Tomar los valores todos los checkbox seleccionados de las preguntas
  const checkboxes = [...document.querySelectorAll('.swiperGlucosaPreguntas [type="radio"]:checked')];
  for (let i in checkboxes) {
    valoresRespuestas.push(checkboxes[i].value);
  }

  // Convertir el array de strings a array de numeros
  let arrayResultados = valoresRespuestas.map(Number);

  // Sumar todos los numeros del array
  let resultadoFinal = arrayResultados.reduce((a, b) => a + b, 0), resultadoSlug;

  if (resultadoFinal >= 0 && resultadoFinal <= 6) {
    document.getElementById('su-resultado').innerHTML = "Bajo";
    document.getElementById("download-results").href = "/pdf/resultado-bajo.pdf";
    document.querySelector('.robot-calcu').src = "images/robot-up.svg";
  } else if (resultadoFinal >= 7 && resultadoFinal <= 11) {
    resultadoSlug = 'ligeramente-elevado';
    document.getElementById('su-resultado').innerHTML = "Ligeramente elevado";
    document.getElementById("download-results").href = "/pdf/resultado-ligeramente-elevado.pdf";
    document.querySelector('.robot-calcu').src = "images/robot-down.svg";
  } else if (resultadoFinal >= 12 && resultadoFinal <= 14) {
    resultadoSlug = 'moderado';
    document.getElementById('su-resultado').innerHTML = "Moderado";
    document.getElementById("download-results").href = "/pdf/resultado-elevado.pdf";
    document.querySelector('.robot-calcu').src = "images/robot-down.svg";
  } else if (resultadoFinal >= 15 && resultadoFinal <= 19) {
    resultadoSlug = 'alto';
    document.getElementById('su-resultado').innerHTML = "Alto";
    document.getElementById("download-results").href = "/pdf/resultado-alto.pdf";
    document.querySelector('.robot-calcu').src = "images/robot-down.svg";
  } else if (resultadoFinal > 21) {
    resultadoSlug = 'muy-alto';
    document.getElementById('su-resultado').innerHTML = "Muy alto";
    document.getElementById("download-results").href = "/pdf/resultado-muy-alto.pdf";
    document.querySelector('.robot-calcu').src = "images/robot-down.svg";
  } else {
    resultadoSlug = 'error';
  }
});
