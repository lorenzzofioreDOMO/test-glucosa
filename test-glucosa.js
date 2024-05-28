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

// Círculo de porcentaje
const circle = new CircularProgressBar("pie");
circle.initial();

// Al avanzar de pregunta cambiar los valores del circulo de porcentaje
swiperGlucosaPreguntas.on('slideChange', function () {

  if (swiperGlucosaPreguntas.activeIndex === 0) {
    const optionsCircle = {
      index: 1,
      percent: 0,
    };
    circle.animationTo(optionsCircle);
  } else if (swiperGlucosaPreguntas.activeIndex === 1) {
    const optionsCircle = {
      index: 1,
      percent: 14,
    };
    circle.animationTo(optionsCircle);
  } else if (swiperGlucosaPreguntas.activeIndex === 2) {
    const optionsCircle = {
      index: 1,
      percent: 28,
    };
    circle.animationTo(optionsCircle);
  } else if (swiperGlucosaPreguntas.activeIndex === 3) {
    const optionsCircle = {
      index: 1,
      percent: 42,
    };
    circle.animationTo(optionsCircle);
  } else if (swiperGlucosaPreguntas.activeIndex === 4) {
    const optionsCircle = {
      index: 1,
      percent: 56,
    };
    circle.animationTo(optionsCircle);
  } else if (swiperGlucosaPreguntas.activeIndex === 5) {
    const optionsCircle = {
      index: 1,
      percent: 70,
    };
    circle.animationTo(optionsCircle);
  } else if (swiperGlucosaPreguntas.activeIndex === 6) {
    const optionsCircle = {
      index: 1,
      percent: 84,
    };
    circle.animationTo(optionsCircle);
  } else if (swiperGlucosaPreguntas.activeIndex === 7) {
    const optionsCircle = {
      index: 1,
      percent: 98,
    };
    circle.animationTo(optionsCircle);
  } else if (swiperGlucosaPreguntas.activeIndex === 8) {
    const optionsCircle = {
      index: 1,
      percent: 92,
    };
    circle.animationTo(optionsCircle);
  }

});

// CALCULAR RESULTADO FINAL
let valoresRespuestas = [];

// Al finalizar las preguntas, cambia al slide de Resultados
swiperCalculadora.on('slideChange', function () {
  setTimeout(function() {
    document.querySelector('.loading').classList.add('no-visible');
}, 2500);
  // Tomar los valores todos los checkbox  seleccionados de las preguntas
  const checkboxes = [...document.querySelectorAll('.swiperGlucosaPreguntas [type="radio"]:checked')];
  for (i in checkboxes) {
    valoresRespuestas.push(checkboxes[i].value);
  }

  // Convertir el array de strings a array de numeros
  let arrayResultados = valoresRespuestas.map(Number);

  // Sumar todos los numeros del array
  let resultadoFinal = arrayResultados.reduce((a, b) => a + b, 0), resultadoSlug;

  if (resultadoFinal >= 0 && resultadoFinal <= 6) {
    document.getElementById('su-resultado').innerHTML = "Bajo"
    document.getElementById("download-results").href = "pdf/glucosa-bajo.pdf";
    document.querySelector('.robot-calcu').src = "images/robot-up.svg";
  } else if (resultadoFinal >= 7 && resultadoFinal <= 11) {
    resultadoSlug = 'ligeramente-elevado';
    document.getElementById('su-resultado').innerHTML = "Ligeramente elevado";
    document.getElementById("download-results").href = "pdf/glucosa-ligeramente-elevado.pdf";
        document.querySelector('.robot-calcu').src = "images/robot-down.svg";
  } else if (resultadoFinal >= 12 && resultadoFinal <= 14) {
    resultadoSlug = 'moderado';
    document.getElementById('su-resultado').innerHTML = "Moderado";
    document.getElementById("download-results").href = "pdf/glucosa-moderado.pdf";
        document.querySelector('.robot-calcu').src = "images/robot-down.svg";
  } else if (resultadoFinal >= 15 && resultadoFinal <= 19) {
    resultadoSlug = 'alto';
    document.getElementById('su-resultado').innerHTML = "Alto";
    document.getElementById("download-results").href = "pdf/glucosa-alto.pdf";
    document.querySelector('.robot-calcu').src = "images/robot-down.svg";
  } else if (resultadoFinal > 21) {
    resultadoSlug = 'muy-alto';
    document.getElementById('su-resultado').innerHTML = "Muy alto";
    document.getElementById("download-results").href = "pdf/glucosa-muy-alto.pdf";
    document.querySelector('.robot-calcu').src = "images/robot-down.svg";
  } else {
    resultadoSlug = 'error';
  }
});