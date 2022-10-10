// container of x cards to play with
  // randomized order
  // render to page
// "flip" over 2 cards at a time
  // check if match
    // same: remove from play
    // diff: do nothing, "flip" both cards back
// if no more cards, end game
  // continue otherwise

// Fisher-Yates (Knuth) Shuffle
function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex = 0;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex--);

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

// Render our cards array to the page
function renderCards(cards, ul) {
  cards.forEach((card) => {
    let li = document.createElement("li");
    let p = document.createElement("p");
    let cardId = "card-inner" + card.id;

    p.setAttribute("id", cardId);
    p.appendChild(document.createTextNode(card.value));
    li.appendChild(p);
    ul.appendChild(li);

    // Show value on click
    li.addEventListener("click", function() {
      document.getElementById(cardId).style.display = "block";
      flippedCards.push(card);
      document.getElementById('card-inner' + flippedCards[count].id).parentNode.style.pointerEvents = "none";
      count++;

      if (count == 2) { 
        checkMatchedCards();
      }
      if (count >= 3) {
        handleMismatchedCards();
      }
    })
  })
}

// Run when 2 cards are displayed
function checkMatchedCards() {
  // Disable pointer events and changed background color
  if (flippedCards[0].value === flippedCards[1].value) {
    for (let i = 0; i < 2; i++) {
      document.getElementById('card-inner' + flippedCards[i].id).parentNode.style.pointerEvents = "none";
      document.getElementById('card-inner' + flippedCards[i].id).parentNode.style.backgroundColor = "limegreen";
    }
    count = 0;
    while (flippedCards.length != 0) {
      flippedCards.shift();
    }
  }
}

// Run when 2 cards are displayed AND third card is clicked
function handleMismatchedCards() {
  // Hide the 2 cards clicked, keep third card displayed
  for (let i = 0; i < 2; i++) {
    document.getElementById('card-inner' + flippedCards[i].id).style.display = "none";
    document.getElementById('card-inner' + flippedCards[i].id).parentNode.style.pointerEvents = "auto";
  }
  // Empty out first 2 cards clicked but, keep third card
  while (flippedCards.length > 1) {
    flippedCards.shift();
  }
  count = 1;
}

// ---------------------------------------------------

// Initialize a set of cards and shuffle
const cards = [
  { value: 1, 
    id: 1
  },
  { value: 1, 
    id: 2
  },
  { value: 2, 
    id: 3
  },
  { value: 2, 
    id: 4
  },
  { value: 3, 
    id: 5
  },
  { value: 3, 
    id: 6
  },
  { value: 4, 
    id: 7
  },
  { value: 4, 
    id: 8
  },
  { value: 5, 
    id: 9
  },
  { value: 5, 
    id: 10
  },
];
let count = 0;
let flippedCards = [];

shuffle(cards);
// Render cards out to screen
const ul = document.querySelector(".cards");
renderCards(cards, ul);

// Want to remember the last 2 cards we clicked on and check if match