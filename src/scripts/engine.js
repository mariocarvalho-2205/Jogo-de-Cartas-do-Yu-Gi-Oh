// States das variaveis - Contendo todas as variaveis
const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('score-points')
    },
    cardsSprites: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type'),

    },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    actions: {
        button: document.getElementById('next-duel'),
    }
};

// Enumeração das cartas -

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards"
}

const pathImages = "./src/assets/icons/";

const cardData = [
{
    id: 0,
    name: "Blue Eyes White Dragon",
    type: "Paper",
    img: `${pathImages}dragon.png`,
    winOf:[1],
    loseOf:[2],
},
{
    id: 1,
    name: "Dark Magician",
    type: "Rock",
    img: `${pathImages}magician.png`,
    winOf:[2],
    loseOf:[0]
},
{
    id: 2,
    name: "Wxodia",
    type: "Scissors",
    img: `${pathImages}exodia.png`,
    winOf:[0],
    loseOf:[1]
},
]

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement('img');
    cardImage.setAttribute('height', '100px');
    cardImage.setAttribute('src', './src/assets/icons/card-back.png');
    cardImage.setAttribute('data-id', idCard);
    cardImage.classList.add('card');

    if (fieldSide === playerSides.player1) {
        
        cardImage.addEventListener('mouseover', () => {
            drawSelectCard(idCard);
        })
        
        cardImage.addEventListener('click', () => {
            setcardsField(cardImage.getAttribute('data-id'))
        })
        
    }


    return cardImage
}

// Criar funcão para setCardFields

async function drawSelectCard(index) {
    state.cardsSprites.avatar.src = cardData[index].img;
    state.cardsSprites.name.innerText = cardData[index].name;
    state.cardsSprites.type.innerText = 'Attribute: ' + cardData[index].type;

}

async function drawCards(cardsNumber, fieldSide) {
    for (let i = 0; i < cardsNumber; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage)
    }
}


// Função de Start
function init () {
    drawCards(5, playerSides.player1)
    drawCards(5, playerSides.computer)
}

init ();