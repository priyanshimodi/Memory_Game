const gameBoard = document.getElementById('gameBoard');
const cardsArray = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    shuffle(cardsArray);
    cardsArray.forEach((cardValue, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = cardValue;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.value;
        flippedCards.push(this);
        
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
    } else {
        card1.classList.add('not-matched');
        card2.classList.add('not-matched');
        setTimeout(() => {
            card1.classList.remove('flipped', 'not-matched');
            card2.classList.remove('flipped', 'not-matched');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }
    flippedCards = [];

    if (matchedCards.length === cardsArray.length) {
        setTimeout(() => alert('You win!'), 500);
    }
}

createBoard();
