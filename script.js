const loadingScreen = document.getElementById('loading');


const STATES = {
    LOADING : loadingScreen,
    COFFEE_EMPTY : "coffee_empty",
    PREP_COFFEE : "prep_coffee",
    RETURN_COFFEE : 'return_coffee',
    COFFEE_READY : 'coffee_ready',
    QUOTE_REVEAL : 'quote_reveal'
}


let currentState = STATES.LOADING;

const setState = (state) =>{
    document.querySelectorAll(".state").forEach(screenState => screenState.style.display = "none")
    state.style.display = "flex";
}

setState(STATES.LOADING);


