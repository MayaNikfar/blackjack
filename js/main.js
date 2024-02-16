/*----- constants -----*/
let dealerSum = 0;
let playerSum = 0;
let dealerAceCount = 0;
let playerAceCount = 0;
let hidden;
let deck;
let canHit = true; // it allows the player to draw while playerSum <= 21
// let audios = {
//   background:  "https:freesound.org/people/Airwolf89/sounds/346454/",
//   button: "https://cdn.freesound.org/previews/91/91651_1281492-lq.mp3"
// };

//All functions that load on browser 
window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}
// let bgSound = new Audio();

// const renderButton = () => {
//   for (let audio in audios) {
//     const button = document.createElement('button');
//     button.innerText = audio;
//     button.addEventListener('click', function () {
//       const soundName = this.innerText;
//       const soundURL = audios[soundName];
//       bgSound.src = soundURL;
//       bgSound.playbackRate = 1;
//       bgSound.play();
//     });
//     document.getElementById('soundboard').appendChild(button);
//   }
// };

// renderButton();

//cards deck
function buildDeck(){
    let values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    let types = ['S','H','D','C'];
    deck = [];
   for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++){
            deck.push(values[j] + "-" + types[i]);
        }  
    }
    //console.log(deck);
}

//shuffleing random cards 
function shuffleDeck() {
    for(let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

///check cards value
function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    //<img src=""./cards/,,,.png">
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce (card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for(let i =0; i< 2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += getValue(card);
        playerAceCount += checkAce (card);
        document.getElementById("player-cards").append(cardImg);
    }
    console.log(playerSum);
    document.getElementById("hit").addEventListener("click",hit);
    document.getElementById("stand").addEventListener("click",stand);
    
}

function hit(){
    if(!canHit){
        return;
    }
    
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce (card);
    document.getElementById("player-cards").append(cardImg);
    
    //because A,J,K are 11,10,10
    if(reduceAce(playerSum, playerAceCount) > 21){
        canHit = false;
    }
}

function stand() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);
    
    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if(playerSum > 21){
        message = "You Lose!";
    }
    else if(dealerSum > 21){
        message = "You Win!";
    }
    // If both player and dealer  become <= 21

    else if(playerSum == dealerSum){
        message = "Tie!";
    }
    else if(playerSum > dealerSum){
        message = "You Win!";
    }
    else if (playerSum < dealerSum){
        message = "You Lose!";
    }
    
    document.getElementById("player-sum").innerText = playerSum;
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("results").innerText = message;

}

function getValue(card){
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)){
        if(value == "A"){
            return 11;  //if the card is Ace
        }
        return 10; // means the card is J or Q or K
    }
    return parseInt(value);
}

function checkAce(card){
    if(card[0] == "A"){
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount){
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
        
    }
    return playerSum;
}
let replay = document.getElementById("replay");

function handleClick() {
  window.location.reload();
}

replay.addEventListener("click", handleClick);
