// D = Diamonds = Diamantes
// C = Clubs = Tréboles
// H = Hearts = Corazones
// S = Spades = Espadas

let deck = [];
const tipos = ["C", "H", "D", "S"],
  especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
  puntosComputadora = 0;

//Referencias del HTML

const btnPedir = document.querySelector("#btnPedir"),
  btnDetener = document.querySelector("#btnDetener"),
  btnNuevo = document.querySelector("#btnNuevo");

const divCartasJugador = document.querySelector("#jugador-cartas"),
  divCartasComputadora = document.querySelector("#computadora-cartas"),
  puntosHTML = document.querySelectorAll("small");

//Esta función crea un nuevo deck
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    // deck.push(i + 'C');
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  return _.shuffle(deck);
};

crearDeck();

// Esta función me permite tomar una carta

const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }
  return deck.pop();
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// Turno de la computadora

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Nadie gana, EMPATE! :(");
    } else if (puntosMinimos > 22) {
      alert("La computadora gana, te pasaste de 21");
    } else if (puntosComputadora > 21) {
      alert("Tú ganas :)");
    } else {
      alert("La computadora gana");
    }
  }, 10);
};

// Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);

  puntosHTML[0].innerText = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");

  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn("Lo siento mucho, perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, genial!");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;

  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", () => {
  console.clear();

  deck = [];
  deck = crearDeck();

  puntosJugador = 0;
  puntosComputadora = 0;

  puntosHTML[0].innerText = 0;
  puntosHTML[1].innerText = 0;

  divCartasComputadora.innerHTML = "";
  divCartasJugador.innerHTML = "";

  btnPedir.disabled = false;
  btnDetener.disabled = false;
});
