//patron modulo

(() => {
  "use strict";

  //crearemos las cartas

  let cartas = [];
  const letras = ["H", "C", "D", "S"],
    especiales = ["A", "J", "Q", "K"];

  //----referencias o varialbes del HTML-----//

  const btnPedir = document.querySelector("#btnPedir");

  //------------------------------//

  let puntosJugador = 0;
  let puntosComputadora = 0;

  let puntosJugadorComputador = document.querySelectorAll("small");

  let divCartasJugador = document.querySelector("#jugador-cartas");
  let divCartascomputadora = document.querySelector("#computadora-cartas");

  const crearCarta = () => {
    for (let i = 2; i <= 10; i++) {
      for (let letra of letras) {
        cartas.push(i + letra);
      }
    }

    for (let especial of especiales) {
      for (let letra of letras) {
        cartas.push(especial + letra);
      }
    }

    console.log(cartas);

    cartas = _.shuffle(cartas);

    console.log(cartas);

    return cartas;
  };

  crearCarta();

  //crearemos una funcion para pedir una carta

  let pedirCarta = () => {
    if (cartas.length === 0) {
      throw "No hay cartas";
    }

    let carta = cartas.pop();
    console.log(`pidiendo carta: ${carta}`);
    console.log(cartas);

    return carta;
  };

  pedirCarta();

  //vamos a darle valor a la carta, osea si fuera un 2D, necesito extraer el 2.

  const valorCarta = (carta) => {
    let valor = carta.substring(0, carta.length - 1); //hay que recordar que los string se pueden trabajar como arreglos por eso es el [0];
    //Con el substring, vamos a recortar el calor que deseamos.(utilizamos xxx.length -1 por que quiero obviar la ultima letra de la carta.)
    console.log(`valor que se estrae es: ${valor}`);
    //en lo anterior realizamos la extracion del valor de la carta, pero necesito saber cuanto es exactamente.
    if (isNaN(valor)) {
      console.log("no es un numero");
      if (valor === "A") {
        valor = 11;
      } else {
        valor = 10;
      }
      console.log(valor);
    } else {
      valor = valor * 1; // se multiplica por 1 para convertirlo a numero
      console.log("es un numero");
      console.log(valor);
    }

    return valor;
  };

  // const valor = valorCarta(pedirCarta());

  //-----------------Eventos------------//

  //si deseo saber que escucha al precionar el boton btnPedir, hago lo siguiente:

  btnPedir.addEventListener("click", function () {
    //en esta funcion vamos es a pedir una carta basicamente
    let btnPedirCarta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(btnPedirCarta) * 1;

    console.log(`los puntos del jugador son: ${puntosJugador}`);

    //necesito tambien al pedir la carta, que me sume los valores de las cartas, para eso voy a crear dos variables, que se llama puntosJugador y puntosComputadora.

    console.log("click");

    // ya tenemos la sumatoria de las cartas ahora vamos a mostrarlo en pantalla dentro del <small></small>

    puntosJugadorComputador[0].innerText = puntosJugador;

    //vamos a hacer magia, haremos que aparezcan las cartas en el html
    // <img class="carta" src="assets/cartas/cartas/10C.png" alt=""></img>

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/cartas/${btnPedirCarta}.png`;
    imgCarta.className = "carta";

    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
      console.warn("Perdiste");
      //all pasar de 21 tiene que deshabilitarse el boton pedir.
      turnoComputadora(puntosJugador);
      btnPedir.disabled = true;
      btnDetener.disabled = true;
    } else if (puntosJugador === 21) {
      console.warn("21, Genial");
      turnoComputadora(puntosJugador);
      btnPedir.disabled = true;
      btnDetener.disabled = true;
    }
  });

  // en el btnPedir observamos que dentro del addEventListener hay dos parametros, el primero es el evento que va a escuchar, ya sea un click un focus ect, y el segundo es una funcion y se llama callback, es decir una funcion que se envia como argumento, puede ser una funcion normal o flecha.  Basicamente lo que dice ahi, es que cuando yo haga click en el boton se va a ejecutar la funcion o el callback.

  btnDetener.addEventListener("click", function () {
    console.log("click");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  });

  //-----------------Turno Computadora------------------//

  let turnoComputadora = (aleatorio) => {
    //uysaremos un ciclo do while, debido que necesito ejecutarse la logica por lo menos una vez, osea mostrar una carta y no se vea vacio el computador.
    do {
      let btnPedirCarta = pedirCarta();
      puntosComputadora = puntosComputadora + valorCarta(btnPedirCarta) * 1;
      console.log(`Los puntos de la computadora son: ${puntosComputadora}`);

      puntosJugadorComputador[1].innerText = puntosComputadora;

      const imgCarta = document.createElement("img");
      imgCarta.src = `assets/cartas/cartas/${btnPedirCarta}.png`;
      imgCarta.className = "carta";

      divCartascomputadora.append(imgCarta);

      if (aleatorio > 21) {
        break;
      }
    } while (puntosComputadora < aleatorio && aleatorio <= 21);

    setTimeout(() => {
      if (aleatorio > 21) {
        alert("Haz Perdido");
      } else if (puntosComputadora === 21) {
        alert("Computadora Gana");
      } else if (aleatorio === puntosComputadora) {
        alert("Empate");
      } else if (aleatorio === 21 && puntosComputadora > 21) {
        alert("Haz Ganado");
      } else if (puntosComputadora > 21) {
        alert("Ganaste");
      } else if (puntosComputadora > puntosJugador && puntosComputadora <= 21);
    }, 1000);
  };

  btnNuevo.addEventListener("click", function () {
    console.clear();
    cartas = [];
    crearCarta();

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    puntosJugador = 0;
    puntosComputadora = 0;

    divCartasJugador.innerHTML = "";
    divCartascomputadora.innerHTML = " ";

    puntosJugadorComputador[0].innerText = 0;
    puntosJugadorComputador[1].innerText = 0;
  });
})();
