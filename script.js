const STATES = {
    LOADING : "loading",
    COFFEE_EMPTY : "coffee_empty",
    PREP_COFFEE : "prep_coffee",
    RETURN_COFFEE : 'return_coffee',
    QUOTE_REVEAL : 'quote_reveal'
}
let testOnPlayThrough = false; //remove later

const loading_screen = document.getElementById(STATES.LOADING);
const main_screen = document.getElementById('main');
const prep_coffee = document.getElementById(STATES.PREP_COFFEE);
const cup = document.getElementById('cup');
const coffee_state = document.getElementById('coffee_state');

loading_screen.style.display = 'flex';

function prepareCoffee(){
    setTimeout(()=>{
        prep_coffee.style.display = 'none';
        main_screen.style.display = 'flex';
    
    }, 2000)
}

setTimeout(()=>{
    loading_screen.style.display = 'none';
    main_screen.style.display = 'flex';
}, 0) // for testing only

cup.addEventListener('click',()=>{
    cup.classList.add('addCoffee');
    setTimeout(()=>{
        main_screen.style.display = 'none';
        prep_coffee.style.display = 'flex'
        prepareCoffee();
    },500)

})