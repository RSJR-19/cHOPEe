const loadingScreen = document.getElementById('loading');
const mainScreen = document.getElementById('main');
const coffeeEmptyScreen = document.getElementById('coffee_empty');
const prepCoffeeScreen = document.getElementById('prep_coffee');

const cup = document.getElementById('cup');
const hand = document.getElementById('hand');

const windowHeight = window.innerHeight;



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

            hand.style.bottom = `${windowHeight}px`;

            break

        case STATES.PREP_COFFEE:
            setStatus(prepCoffeeScreen);
            break
    }
}

window.addEventListener('load', ()=>{
    stateMachine(STATES.LOADING);
    setTimeout(()=>{
        mainScreen.style.display = 'flex';
        stateMachine(STATES.COFFEE_EMPTY);
        console.log(coffeeEmptyScreen.clientHeight);

    },1000); //For testing only //
});

const grabCup=()=>{

    const cupRect = cup.getBoundingClientRect();
    const currentBottom = parseFloat(getComputedStyle(hand).bottom);

    const target = cupRect.bottom - ((windowHeight * 7.5)/100);

    const distance = target - currentBottom;
    

    if (Math.abs(distance)<1){
        requestAnimationFrame(takeCupBack);

        return;
    }
    const ease = 0.15;

    
    hand.style.bottom = `${currentBottom + (distance * ease)}px`;

    requestAnimationFrame(grabCup);


}

const takeCupBack = () =>{
    const cupRect = cup.getBoundingClientRect();
    const currentBottom = parseFloat(getComputedStyle(hand).bottom);
    const cupCurrentBottom = parseFloat(getComputedStyle(cup).bottom);

    if (currentBottom >= windowHeight && cupCurrentBottom >= windowHeight){

        stateMachine(STATES.PREP_COFFEE);
        return
    };

    hand.style.bottom = `${currentBottom + 10}px`;
    cup.style.bottom = `${cupCurrentBottom + 10}px`;

    requestAnimationFrame(takeCupBack);
}








cup.addEventListener('click', ()=>{
    requestAnimationFrame(grabCup);
});

window.addEventListener('resize', ()=>location.reload());






