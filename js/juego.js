// D = Diamonds
// C = Clubs
// H = Hearts
// S = Spades

let deck = [];
const tipos = ['C', 'H', 'D', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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

  console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);
};

crearDeck();
