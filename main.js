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

  return Number(sueldoBruto(sueldo) - obraSocialYLey * 2 - jubilacionLey); 
}

// Función principal que muestra toda la info al apretar el botón
const liquidacion = () => {
  cont.classList.remove("d-none");

  // Sueldo básico
  let sueldo = document.querySelector(".sueldo").value;

  // Nombre
  let nombre = document.querySelector(".nombre").value;

  // Apellido
  let apellido = document.querySelector(".apellido").value;

  // Legajo
  let legajo = document.querySelector(".legajo").value;

  // Ingreso del trabajador
  let ingreso = (new Date(document.querySelector(".fecha").value))

  // Retenciones
  let jubilacionLey = sueldoBruto(sueldo) * (11/100);
  let obraSocialYLey = sueldoBruto(sueldo) * (3/100);

  // Tomando los valores importantes de la fecha
  let diai = ingreso.getDate()
  let mesi = ingreso.getMonth() + 1
  let anioi = ingreso.getFullYear()

  // Concatenando la fecha de ingreso
  let fe = `${diai+1}/${mesi}/${anioi}`

  //toma el dia de hoy 
  let hoy = new Date()

  let dia = hoy.getDate();
  // `getMonth()` devuelve el mes (de 0 a 11)
  let mes = hoy.getMonth() + 1;
  // `getFullYear()` devuelve el año completo
  let anio = hoy.getFullYear();

  let fecha= `${dia}/${mes}/${anio}`
  
  // Tomando las campos de la tabla
  const fechaTabla = document.querySelector(".fechaTabla");
  const nombreTabla = document.querySelector(".nombreTabla");
  const apellidoTabla = document.querySelector(".apellidoTabla");
  const legajoTabla = document.querySelector(".legajoTabla");
  const inicioTabla = document.querySelector(".inicioTabla");
  
  // Ingresando valores en la tabla
  fechaTabla.textContent = fecha;
  nombreTabla.textContent = nombre;
  apellidoTabla.textContent = apellido;
  legajoTabla.textContent = legajo;
  inicioTabla.textContent = fe;

  // Sueldo básico, presentismo, productividad y horas extras
  const sueldoBasicoTabla = document.querySelector(".sueldoBasicoTabla");
  const presentismoTabla = document.querySelector(".presentismoTabla");
  const productividadTabla = document.querySelector(".productividadTabla");
  const hExtrasTabla = document.querySelector(".hExtrasTabla");

  sueldoBasicoTabla.textContent = `$${sueldoBasico(sueldo).toFixed(2)}`;
  presentismoTabla.textContent = `$${presentismo(sueldo).toFixed(2)}`;
  productividadTabla.textContent = `$${productividad(sueldo).toFixed(2)}`;
  hExtrasTabla.textContent = `$${hsExtras(sueldo).toFixed(2)}`;

  // Retenciones
  const jubilacionTabla = document.querySelector(".jubilacionTabla");
  const obraSocialTabla = document.querySelector(".obraSocialTabla");
  const leyTabla = document.querySelector(".leyTabla");

  jubilacionTabla.textContent = `$${jubilacionLey.toFixed(2)}`;
  obraSocialTabla.textContent = `$${obraSocialYLey.toFixed(2)}`;
  leyTabla.textContent = `$${obraSocialYLey.toFixed(2)}`;

  // Valores de los radioButtons
  const radioAguinaldo = document.querySelector('input[name="aguinaldo"]:checked').value;
  const aguinaldoRow = document.querySelector(".aguinaldoRow");

  if (radioAguinaldo === 'Si') {
    aguinaldoRow.classList.remove("d-none")
  } else if (radioAguinaldo === 'No') {
    aguinaldoRow.classList.add("d-none")
  }

  const radioVacaciones = document.querySelector('input[name="vacaciones"]:checked').value;
  const vacacionesRow = document.querySelector(".vacacionesRow");
  const vacacionesRow2 = document.querySelector(".vacacionesRow2");

  if (radioVacaciones === 'Si') {
    vacacionesRow.classList.remove("d-none")
    vacacionesRow2.classList.remove("d-none")
  } else if (radioVacaciones === 'No') {
    vacacionesRow.classList.add("d-none")
    vacacionesRow2.classList.add("d-none")
  }

  // Aguinaldo y vacaciones
  const aguinaldoTabla = document.querySelector(".aguinaldoTabla");
  const vacacionesTabla = document.querySelector(".vacacionesTabla");
  const remuneracionVacacionesTabla = document.querySelector(".remuneracionVacacionesTabla");

  aguinaldoTabla.textContent = `$${aguinaldo(sueldo).toFixed(2)}`;
  vacacionesTabla.textContent = `${diasVacaciones()}`;
  remuneracionVacacionesTabla.textContent = `$${pagoVacaciones(sueldo).toFixed(2)}`;
  
  // Sueldo bruto y neto
  const sueldoBrutoTabla = document.querySelector(".sueldoBrutoTabla");
  const sueldoNetoTabla = document.querySelector(".sueldoNetoTabla");

  sueldoBrutoTabla.textContent = `$${sueldoBruto(sueldo).toFixed(2)}`;
  sueldoNetoTabla.textContent = `$${sueldoNeto(sueldo).toFixed(2)}`;
};
