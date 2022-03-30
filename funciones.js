/* 
    PLANIFICACION FCFS (primero en llegar, primero en ser servido)
*/
function fcfs(cantProcesos, procesos, nombres) {
    console.log("ALGORITMO FCFS (primero en llegar, primero en ser servido) \n");
    //let procesosAux= procesos[cantProcesos];

    for(let i=0;i<cantProcesos;i++){
        console.log("ARREGLO fcfs: "+procesos[i]+" pos :"+i);
    }

    tEspera(cantProcesos, procesos,nombres);
    tRetorno(cantProcesos, procesos,nombres);
}

/*
    CALCULOS PARA EL TIEMPO DE ESPERA
*/
function tEspera(cantProcesos, procesos,nombres){
    let auxiliar = [cantProcesos+1];
    auxiliar[0]=0
    let suma=0; 
    let tiempo = [cantProcesos]

    for(let i = 0; i<cantProcesos;i++){
        auxiliar[i+1] = procesos[i];
    }

    for(let i=0; i<cantProcesos; i++){
        suma += auxiliar[i];
        tiempo[i]=suma;
        console.log("Tiempo ESPERA proceso: "+nombres[i]+" valor "+suma);
    }

    suma=0;
    let promedio=0;
    for(let i = 0; i<cantProcesos; i++){
        suma += tiempo[i];
    }
    promedio = (suma/cantProcesos);
    console.log("Promedio tiempo ESPERA: "+promedio+"\n");

    return  promedio
}

/*
    CALCULOS PARA EL TIEMPO DE RETORNO
*/
function tRetorno(cantProcesos, procesos, nombres){
    let suma=0; 
    let tiempo =[];

    for(let i=0; i<cantProcesos; i++){
        suma += procesos[i];
        tiempo[i] = suma;
        console.log("Tiempo RETORNO proceso: "+nombres[i]+" valor "+suma);
    }

    suma =0;
    let promedio = 0;
    for(let i=0; i<cantProcesos; i++){
        suma+= tiempo[i];
    }

    promedio = (suma/cantProcesos);
    console.log("Promedio tiempo RETORNO: "+promedio+"\n");

    return  promedio
}

/*
    PLANIFICACION SJF(Primero el mas corto)
*/
function sjf(cantProcesos, procesos, nombres){
    console.log(" \n ALGORITMO SJF (Primero el más corto)");

    let menor = procesos[0];
    let auxiliar = [cantProcesos];

    for (let i = 0; i < cantDatos ; i++) {
        if (procesos[i] < menor) {
            menor = procesos[i];
        }
    }
    
    auxiliar[0] = menor;
    let aux2 = [cantProcesos];

    for (let i=0; i<=(cantProcesos-1); i++){
        if(menor!= procesos[i] && procesos[i+1]!= undefined){
            auxiliar[i+1] = procesos[i];
        }
        else{
            auxiliar[i+1] = procesos[i+1];
        }
        //Muestra el numero menor al inicio y el resto lo compacta
        console.log("ARREGLO sjf: "+ auxiliar[i] +" pos :"+i); 
    }
    tEspera(cantProcesos, auxiliar,nombres);
    tRetorno(cantProcesos, auxiliar,nombres);
}

/*
    PRIORIDAD (Ejecuta primero el de mayor prioridad (1,2...n))
*/
function prioridad(cantProcesos, procesos, nombreProcesos, prioridades){
    console.log("\n ALGORITMO PRIORIDAD (primero el de mayor prioridad (1,2...n)) ");
    
    let auxPrio;
    let auxNom;
    let auxProcesos;
    
    // Algoritmo de burbuja
    for (let k = 1; k < cantProcesos; k++) {
        for (let i = 0; i < (cantProcesos - k); i++) {
            if (prioridades[i] > prioridades[i + 1] && 
                nombreProcesos[i] > nombreProcesos[i + 1] && 
                procesos[i]> procesos[i+1]) {

                auxPrio = prioridades[i];
                prioridades[i] = prioridades[i + 1];
                prioridades[i + 1] = auxPrio;

                auxNom = nombreProcesos[i];
                nombreProcesos[i] = nombreProcesos[i + 1];
                nombreProcesos[i + 1] = auxNom;

                auxProcesos = procesos[i];
                procesos[i] = procesos[i + 1];
                procesos[i + 1] = auxProcesos;
            }
        }
    }
    
    
    for(let i=0;i<cantProcesos;i++){
        console.log("Nombre Proceso: "+nombreProcesos[i]+" pos: "+i+
                    "- Proceso: "+procesos[i]+" pos: "+i+
                    "- Prioridad: "+prioridades[i]+" pos: "+i);
    }

    tEspera(cantProcesos, procesos,nombreProcesos);
    tRetorno(cantProcesos, procesos,nombreProcesos);
}

/*
    Pedir los datos de los procesos 
*/
function pedirDatos(cantProcesos, procesos, nombreProcesos, prioridades){
    for (let i = 0; i < cantProcesos; i++) {
        nombreProcesos[i] = prompt("Nombre proceso: "+(i+1));
        procesos[i] = parseInt(prompt("Valor del proceso: "+(i+1)));
        prioridades[i] = parseInt(prompt("Valor de prioridad: "+(i+1)));
    }
    return prioridades, procesos, nombreProcesos;
}

function createChart(e) {
    const days = document.querySelectorAll(".chart-values li");
    const tasks = document.querySelectorAll(".chart-bars li");
    const daysArray = [...days];
  
    tasks.forEach(el => {
      const duration = el.dataset.duration.split("-");
      const startDay = duration[0];
      const endDay = duration[1];
      let left = 0,
        width = 0;
  
      if (startDay.endsWith("½")) {
        const filteredArray = daysArray.filter(day => day.textContent == startDay.slice(0, -1));
        left = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2;
      } else {
        const filteredArray = daysArray.filter(day => day.textContent == startDay);
        left = filteredArray[0].offsetLeft;
      }
  
      if (endDay.endsWith("½")) {
        const filteredArray = daysArray.filter(day => day.textContent == endDay.slice(0, -1));
        width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2 - left;
      } else {
        const filteredArray = daysArray.filter(day => day.textContent == endDay);
        width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth - left;
      }
  
      // apply css
      el.style.left = `${left}px`;
      el.style.width = `${width}px`;
      if (e.type == "load") {
        el.style.backgroundColor = el.dataset.color;
        el.style.opacity = 1;
      }
    });
  }
  
  window.addEventListener("load", createChart);
  window.addEventListener("resize", createChart);

//-----------------------------------------------------------------------------------------------------------------------

let cantDatos = prompt("Ingrese la cantidad de datos: ");
let valores = [];
let nombres = [];
let prioridades = [];

pedirDatos(cantDatos,valores, nombres, prioridades);

fcfs(cantDatos, valores, nombres);
sjf(cantDatos, valores, nombres);
prioridad(cantDatos,valores, nombres, prioridades);