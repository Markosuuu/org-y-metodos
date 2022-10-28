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

//Función para calcular el sueldo neto
function sueldoNeto (sueldo) {
  let obraSocialYLey = sueldoBruto(sueldo) * (3/100);

  let jubilacionLey = sueldoBruto(sueldo) * (11/100);

  return Number(sueldoBruto(sueldo) - obraSocialYLey - jubilacionLey); 
}

// Función principal que muestra toda la info al apretar el botón
const liquidacion = () => {
  cont.textContent = "";
  const sueldo = document.querySelector(".sueldo").value;
  // const faltas = document.querySelector(".faltas-no-justificadas").value;

  // Nombre
  const pNombre = document.createElement("p");
  let nombre = document.querySelector(".nombre").value;
  pNombre.textContent = `Nombre: ${nombre}`;

  // Apellido
  const pApellido = document.createElement("p");
  let apellido = document.querySelector(".apellido").value;
  pApellido.textContent = `Apellido: ${apellido}`;

  // Legajo
  const pLegajo = document.createElement("p");
  let legajo = document.querySelector(".legajo").value;
  pLegajo.textContent = `Nro Legajo: ${legajo}`;

  // Sueldo básico
  const pSueldo = document.createElement("p");
  pSueldo.textContent = `Sueldo básico: $${sueldoBasico(sueldo)}`;

  // Sueldo bruto
  const pSueldoBruto = document.createElement("p");
  pSueldoBruto.textContent = `Sueldo bruto: $${sueldoBruto(sueldo)}`;
  
  // Sueldo neto
  const pSueldoNeto = document.createElement("p");
  pSueldoNeto.textContent = `Sueldo neto: $${sueldoNeto(sueldo)}`;
  
  // Sueldo neto
  const pAguinaldo = document.createElement("p");
  pAguinaldo.textContent = `Aguinaldo: $${sueldoBruto(sueldo)/2}`;

  // Agregando contenido al container
  cont.appendChild(pNombre);
  cont.appendChild(pApellido);
  cont.appendChild(pLegajo);
  cont.appendChild(pSueldo);
  cont.appendChild(pSueldoBruto);
  cont.appendChild(pSueldoNeto);
  cont.appendChild(pAguinaldo);
};
