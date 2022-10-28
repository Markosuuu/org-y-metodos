const cont = document.querySelector(".cont");

// Si las faltas son 0, devuelve el sueldo, pero si faltó va restando en cuestión de las veces
// 22 es el número de días que trabajaría si hiciera 176h (Horas totales) / 8h (horas por día)
function sueldoBasico(sueldo) {
  let faltas = document.querySelector(".faltas-no-justificadas").value;
  let faltasJustificadas = document.querySelector(".faltas-justificadas").value;

  let faltasTotales = Number(faltas) + Number(faltasJustificadas);

  if (faltasTotales > 0) {
    sueldo = (sueldo / 22) * (22 - faltasTotales);
  }

  return Number(sueldo);
}

// Funcion para calcular productividad
function productividad(sueldo) {
  return sueldoBasico(sueldo) * (10 / 100);
}

// Función para calcular presentimos
function presentismo(sueldo) {
  let faltas = document.querySelector(".faltas-no-justificadas").value;
  let faltasJustificadas = document.querySelector(".faltas-justificadas").value;

  let faltasTotales = Number(faltas) + Number(faltasJustificadas);

  if (faltasTotales >= 0) {
    return sueldoBasico(sueldo) * ((25 - faltasTotales * 5) / 100);
  } else if (faltasTotales >= 5 || faltasTotales < 0) {
    return sueldoBasico(sueldo);
  }
}

// Función para calcular los días de licencia
function faltaJustificada(sueldo) {
  let faltasJustificadas = document.querySelector(".faltas-justificadas").value;

  if (faltasJustificadas > 0) {
    return (sueldo / 22) * faltasJustificadas;
  } else {
    return 0;
  }
}

// Función para calcular las faltas de los días feriados
function faltaFeriado(sueldo) {
  let faltasFeriados = document.querySelector(".faltas-feriados").value;

  if (faltasFeriados > 0) {
    sueldo /= 22;
    sueldo =
      (sueldo + Number(presentismo(sueldo)) + Number(productividad(sueldo))) *
      faltasFeriados;
    return sueldo;
  } else {
    return 0;
  }
}

// Función para calcular las horas extras en 50% y 100%
function hsExtras(sueldo){
  let h50 = document.querySelector(".extrasAl50").value;
  let h100 = document.querySelector(".extrasAl100").value;

  let valorHs = sueldo / 176

  let horasExtras = ((h50 * 1.5) * valorHs) + ((h100 * 2) * valorHs)

  if (horasExtras > 0) {
    return horasExtras;
  } else {
    return 0;
  }
}

//Funcion para calcular cuantos dias le corresponde de vacaciones
function diasVacaciones () {
  let fecha = (new Date(document.querySelector(".fecha").value))

  //para tomar la fecha actual
  let hoy = new Date()

  // `getMonth()` devuelve el mes (de 0 a 11)
  let mesA = hoy.getMonth() + 1;
  
  // `getFullYear()` devuelve el año completo
  let anioA = hoy.getFullYear();

  //Para tomar el dia, el mes y el año de la fecha de ingreso
  let mesI = fecha.getMonth() + 1;

  let anioI = fecha.getFullYear();

  let anioAntiguedad = anioA - anioI

  //diferencia entre el mes actual y el mes de ingreso
  let mesAntiguedad = mesA - mesI

  //Calcula lo que le corresponde de vacaciones
  let diasVacaciones = 0;

  // Si tiene mas de 20 años de antiguedad le corresponde 35 dias
	if (anioAntiguedad >= 20) {
		diasVacaciones =+ 35
	}
  // Si tiene entre 20 y 10 años de antiguedad le corresponde 28
	else if (anioAntiguedad >= 10 && anioAntiguedad < 20){
		diasVacaciones =+ 28
	}
  // Si tiene entre 5 y 10 le corresponde 21
	else if (anioAntiguedad >= 5 && anioAntiguedad < 10){
		diasVacaciones =+ 21
	}
  // Si tiene menos de 5 le puede corresponder 14 o la diferencia entre el mes actual y el mes que ingreso
	else if (anioAntiguedad < 5){
		if (anioAntiguedad == 0 && mesAntiguedad < 6){
			diasVacaciones =+ mesAntiguedad
		}
		else {
			diasVacaciones =+ 14
		}
	}

  return diasVacaciones
}

// Funcion para calcular cuanto le corresponde de paga por vacaciones

function pagoVacaciones (sueldo) {
  let pagoVacas =+ sueldoBasico(sueldo) / 22 * 1.10 * 1.25 * diasVacaciones()
  
  return pagoVacas
}

// Función para calcular el sueldo bruto
function sueldoBruto(sueldo) {
  return (
    Number(sueldoBasico(sueldo)) +
    Number(productividad(sueldo)) +
    Number(presentismo(sueldo)) +
    Number(faltaJustificada(sueldo)) +
    Number(faltaFeriado(sueldo)) +
    Number(hsExtras(sueldo))
  );
}

const aguinaldo  = (sueldo) =>{
  let aguinaldo = sueldoBruto(sueldo)/2

  return Number (aguinaldo)
}

//Función para calcular el sueldo neto
function sueldoNeto (sueldo) {
  let obraSocialYLey = sueldoBruto(sueldo) * (3/100);

  let jubilacionLey = sueldoBruto(sueldo) * (11/100);

  return Number(sueldoBruto(sueldo) - obraSocialYLey - obraSocialYLey - jubilacionLey); 
}

// Función principal que muestra toda la info al apretar el botón
const liquidacion = () => {
    // cont.textContent = "";
  // document.querySelector(".cont").classList.remove("d-none");

  const sueldo = document.querySelector(".sueldo").value;

  // // Nombre
  let nombre = document.querySelector(".nombre").value;

  // // Apellido
  let apellido = document.querySelector(".apellido").value;

  // // Legajo

  let legajo = document.querySelector(".legajo").value;


  let ingreso = (new Date(document.querySelector(".fecha").value))

  let obraSocialYLey = sueldoBruto(sueldo) * (3/100);

  let jubilacionLey = sueldoBruto(sueldo) * (11/100);


  let diai= ingreso.getDate()
  let mesi= ingreso.getMonth()+1
  let anioi= ingreso.getFullYear()

  let fe = `${diai}/${mesi}/${anioi}`

  let hoy = new Date()
  //toma el dia 

  let dia = hoy.getDate();

  // `getMonth()` devuelve el mes (de 0 a 11)
  let mes = hoy.getMonth() + 1;

  // `getFullYear()` devuelve el año completo
  let anio = hoy.getFullYear();

  let fecha= `${dia}/${mes}/${anio}`

  cont.innerHTML += `
    <div class="row border border-white border-2 bg-dark text-white">
    <!-- Campos del primer row -->
      <div class="col-12 border border-white border-2 d-flex justify-content-center">
        <h1>Recibo de sueldo</h1>
      </div>

      <div class="col-2 border border-white border-1  d-flex justify-content-center ">
        <h6>Fecha de emision</h6>
      </div>

      <div class="col-3 border border-white border-1  d-flex justify-content-center ">
        <h6>Nombre</h6>
      </div>

      <div class="col-3 border border-white border-1  d-flex justify-content-center ">
        <h6>Apellido</h6>
      </div>

      <div class="col-2 border border-white border-1  d-flex justify-content-center ">
        <h6>N° de legajo</h6>
      </div>

      <div class="col-2 border border-white border-1  d-flex justify-content-center ">
        <h6>Fecha de ingreso</h6>
      </div>

    <!-- Datos principales-->
      <div class="col-2 border border-white border-1  d-flex justify-content-center ">
        <span>${fecha}</span>
      </div>

      <div class="col-3 border border-white border-1  d-flex justify-content-center ">
        <span>${nombre}</span>
      </div>

      <div class="col-3 border border-white border-1  d-flex justify-content-center ">
        <span>${apellido}</span>
      </div>

      <div class="col-2 border border-white border-1  d-flex justify-content-center ">
        <span>${legajo}</span>
      </div>

      <div class="col-2 border border-white border-1  d-flex justify-content-center ">
        <span>${fe}</span>
      </div>
  </div>
    <div class="row mt-4 border border-white border-2 bg-dark text-white">
      <!-- Campos -->
        <div class="col-3 border border-white d-flex justify-content-center">
          <h6>Concepto</h6>
        </div>
        <div class="col-4 border border-white d-flex justify-content-center">
          <h6>Monto</h6>
        </div>
        <div class="col-1 border border-white d-flex justify-content-center">
          <h6>Porcentaje</h6>
        </div>
        <div class="col-4 border border-white d-flex justify-content-center">
          <h6>Retenciones</h6>
        </div>

      <!-- CONCEPTO -->
      <div class="col-3 border border-white d-flex justify-content-center g-0">
        <div class="row w-100">
          <div class="col-12 border border-white"><h6>Sueldo basico</h6></div>
          <div class="col-12 border border-white"><h6>Presentismo</h6></div>
          <div class="col-12 border border-white"><h6>Productividad</h6></div>
          <div class="col-12 border border-white"><h6>Horas extras</h6></div>
          <div class="col-12 border border-white"><h6>Jubilacion</h6></div>
          <div class="col-12 border border-white"><h6>Obra social</h6></div>
          <div class="col-12 border border-white"><h6>LEG19032</h6></div>
          <div class="col-12 border border-white"><h6>Aguinaldo</h6></div>
          <div class="col-12 border border-white"><h6>Dias que les corresponde de vacaciones</h6></div>
          <div class="col-12 border border-white"><h6>Remuneracion por vacaciones</h6></div>
        </div>
      </div>

      <!-- MONTO -->

      <div class="col-4 g-0 border border-white d-flex justify-content-center">
        <div class="row w-100">
          <div class="col-12 border border-white"><h6>$${sueldoBasico(sueldo)}</h6></div>
          <div class="col-12 border border-white"><h6>$${parseInt(presentismo(sueldo)).toFixed(2)}</h6></div>
          <div class="col-12 border border-white"><h6>$${parseInt(productividad(sueldo)).toFixed(2)}</h6></div>
          <div class="col-12 border border-white"><h6>$${hsExtras(sueldo)}</h6></div>
          <div class="col-12 border border-white p-2"><h6></h6></div>
          <div class="col-12 border border-white p-2"><h6></h6></div>
          <div class="col-12 border border-white p-2"><h6></h6></div>
          <div class="col-12 border border-white"><h6>$${aguinaldo(sueldo)}</h6></div>
          <div class="col-12 border border-white"><h6>${diasVacaciones()}</h6></div>
          <div class="col-12 border border-white"><h6>$${pagoVacaciones(sueldo)}</h6></div>
        </div>        
      </div>

      <!-- PORCENTAJE -->

      <div class="col-1 g-0 border border-white d-flex justify-content-center">
        <div class="row w-100">
          <div class="col-12 border border-white"><h6></h6></div>
          <div class="col-12 border border-white"><h6></h6></div>
          <div class="col-12 border border-white"><h6></h6></div>
          <div class="col-12 border border-white"><h6></h6></div>
          <div class="col-12 border border-white"><h6>%11</h6></div>
          <div class="col-12 border border-white"><h6>%3</h6></div>
          <div class="col-12 border border-white"><h6>%3</h6></div>
          <div class="col-12 border border-white"><h6></h6></div>
          <div class="col-12 border border-white"><h6></h6></div>
          <div class="col-12 border border-white"><h6></h6></div>
        </div>        
      </div>

      <!-- RETENECIONES  -->

      <div class="col-4 g-0 border border-white d-flex justify-content-center">
        <div class="row w-100">
          <div class="col-12 border border-white"><h6></h6></div>
          <div class="col-12 border border-white"><h6></h6></div>
          <div class="col-12 border border-white"><h6></h6></div>
          <div class="col-12 border border-white"><h6></h6></div>
          <div class="col-12 border border-white"><h6>$${parseInt(jubilacionLey).toFixed(2)}</h6></div>
          <div class="col-12 border border-white"><h6>$${parseInt(obraSocialYLey).toFixed(2)}</h6></div>
          <div class="col-12 border border-white"><h6>$${parseInt(obraSocialYLey).toFixed(2)}</h6></div>
          <div class="col-12 border border-white"></div>
          <div class="col-12 border border-white"></div>
          <div class="col-12 border border-white"></div>
        </div>
      </div>
      
      <div class="col-3 border border-white"><h5>Total bruto:</h5></div>
      <div class="col-4 border border-white d-flex justify-content-center"><p>$${sueldoBruto(sueldo)}</p></div>
      <div class="col-2 border border-white"><h5>Neto a percibir:</h5></div>
      <div class="col-3 border border-white d-flex justify-content-center"><p>$${sueldoNeto(sueldo)}</p></div>
    </div>
  </div>
  </div>
  `
};
