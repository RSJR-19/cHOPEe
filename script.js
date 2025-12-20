const loadingScreen = document.getElementById('loading');
const mainScreen = document.getElementById('main');
const coffeeEmptyScreen = document.getElementById('coffee_empty');
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
    }
}

window.addEventListener('load', ()=>{
    stateMachine('loading_screen');
    setTimeout(()=>{
        mainScreen.style.display = 'flex';
        stateMachine('coffee_empty');
        console.log(coffeeEmptyScreen.clientHeight);

        const handRect = hand.getBoundingClientRect();
        const cupRect = cup.getBoundingClientRect();
        console.log('cup', cupRect);
        console.log('hand',handRect);
        console.log(parseFloat(getComputedStyle(hand).bottom));
    },1000); //For testing only //
});

const grabCup=()=>{

    const cupRect = cup.getBoundingClientRect();
    const currentBottom = parseFloat(getComputedStyle(hand).bottom);

    if (currentBottom <= cupRect.bottom - ((windowHeight * 7.5)/100)){
        return;
    }

    
    hand.style.bottom = `${currentBottom - 10}px`;

    requestAnimationFrame(grabCup);


}







cup.addEventListener('click', ()=>{
    requestAnimationFrame(grabCup);
});

window.addEventListener('resize', ()=>location.reload());






