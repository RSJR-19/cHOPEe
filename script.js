const STATES = {
    LOADING : "loading",
    COFFEE_EMPTY : "coffee_empty",
    PREP_COFFEE : "prep_coffee",
    RETURN_COFFEE : 'return_coffee',
    COFFEE_READY : 'coffee_ready',
    QUOTE_REVEAL : 'quote_reveal'
}
let testOnPlayThrough = false; //remove later
let coffee_state_bool = false

const loading_screen = document.getElementById(STATES.LOADING);
const main_screen = document.getElementById('main');
const prep_coffee = document.getElementById(STATES.PREP_COFFEE);
const cup = document.getElementById('cup');
const coffee_state = document.getElementById('coffee_state');

loading_screen.style.display = 'flex';

function prepareCoffee(){
    coffee_state.innerHTML = "full";
    setTimeout(()=>{
        prep_coffee.style.display = 'none';
        main_screen.style.display = 'flex';
        returnCoffee()
        
    
    }, 2000)
}

function returnCoffee(){
    setTimeout(()=>{
        cup.classList.remove('addCoffee');
        coffeeReady()
    }, 50)
}

function coffeeReady(){
    setTimeout(()=>{
        coffee_state_bool = true;
    }, 100)
}

function revealQuote(){
    setTimeout(()=>{
        coffee_state.innerHTML = "If there's a will \n there's a way"
        coffee_state.style.textAlign = 'center';
        coffee_state.style.fontSize = '5px';
        coffee_state_bool = false;
    }, 1000)
}

setTimeout(()=>{
    loading_screen.style.display = 'none';
    main_screen.style.display = 'flex';
}, 0) // for testing only

cup.addEventListener('click',()=>{
    if (coffee_state_bool != true){
    cup.classList.add('addCoffee');
    setTimeout(()=>{
        main_screen.style.display = 'none';
        prep_coffee.style.display = 'flex'
        prepareCoffee();
    },500)
}   
    else{
        coffee_state.innerHTML = "";
        cup.classList.add('zoom');
        revealQuote();
    }

})