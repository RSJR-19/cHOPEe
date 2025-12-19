const loadingScreen = document.getElementById('loading');
const mainScreen = document.getElementById('main');
const coffeeEmptyScreen = document.getElementById('coffee_empty');
const cup = document.getElementById('cup');
const hand = document.getElementById('hand');


mainScreen.style.display = 'none';

const STATES = {
    LOADING : 'loading_screen',
    COFFEE_EMPTY : 'coffee_empty',
    PREP_COFFEE : "prep_coffee",
    RETURN_COFFEE : 'return_coffee',
    COFFEE_READY : 'coffee_ready',
    QUOTE_REVEAL : 'quote_reveal'
}

const setStatus = (status)=>{
    document.querySelectorAll('.screenState').forEach(stateScreen => stateScreen.style.display ="none");
    status.style.display = 'flex';
    
}

const stateMachine = (currentState)=>{
    switch(currentState){
        case STATES.LOADING:
            setStatus(loadingScreen);
            break
        
        case STATES.COFFEE_EMPTY:
            setStatus(coffeeEmptyScreen);
            break
    }
}

window.addEventListener('load', ()=>{
    stateMachine('loading_screen');
    setTimeout(()=>{
        mainScreen.style.display = 'flex';
        stateMachine('coffee_empty')
    },1000); //For testing only //
});

cup.addEventListener('click', ()=> hand.classList.add('down'));






