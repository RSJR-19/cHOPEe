const loadingScreen = document.getElementById('loading');
const coffeeEmptyScreen = document.getElementById('coffeeEmpty');


const testButton = document.getElementById('test-button');
const hand = document.getElementById('hand');
const cup = document.getElementById('cup');



const STATES = {
    LOADING : loadingScreen,
    COFFEE_EMPTY : coffeeEmptyScreen,
    PREP_COFFEE : "prep_coffee",
    RETURN_COFFEE : 'return_coffee',
    COFFEE_READY : 'coffee_ready',
    QUOTE_REVEAL : 'quote_reveal'
}


let currentState = STATES.LOADING;

const setState = () =>{
    console.log(`${currentState} curently displaying`)
    document.querySelectorAll(".screenstate").forEach(screenState => screenState.style.display = "none")
    currentState.style.display = "flex";
}

setState(STATES.LOADING);

setTimeout(()=>{
    currentState = STATES.COFFEE_EMPTY
    setState()},1000)

testButton.addEventListener('click', ()=> hand.classList.add('grab'));
    
