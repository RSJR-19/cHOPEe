import getQuoteToday from "./quotes.js";

const loadingScreen = document.getElementById('loading');
const mainScreen = document.getElementById('main');
const coffeeEmptyScreen = document.getElementById('coffee_empty');
const prepCoffeeScreen = document.getElementById('prep_coffee');
const returnCoffeeScreen = document.getElementById('return_coffee');


const cup = document.getElementById('cup');
const hand = document.getElementById('hand');
const cupStatus = document.getElementById('cup_status');

let cupEmpty = true;

const windowHeight = window.innerHeight;
const currentScreenState = document.getElementById('currentScreenState');

let initialCupBot = ""; // This is the initial position of the empty cup bago yung grab cup animation;
let handCollisionPoint = ''; // this is the collision point ng hand at ng cup.

let todayQuote = "";


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
            cupStatus.innerHTML = 'Empty';
            initialCupBot = parseFloat(getComputedStyle(cup).bottom);

            break

        case STATES.PREP_COFFEE:
            setStatus(prepCoffeeScreen);
            todayQuote = getQuoteToday(1);

            setTimeout(()=>stateMachine(STATES.RETURN_COFFEE), 2000); //testing value only;

            break

        case STATES.RETURN_COFFEE:
            setStatus(coffeeEmptyScreen);
            cupStatus.innerHTML = 'Full';
            currentScreenState.innerHTML = 'Return_coffee';
            returnCoffeeScreen.style.display = 'flex';
            requestAnimationFrame(returnCupBack);

            break

        case STATES.COFFEE_READY:

            cupEmpty = false;
            returnCoffeeScreen.style.display = 'none';

            break
            
    }
}

window.addEventListener('load', ()=>{
    stateMachine(STATES.LOADING);
    setTimeout(()=>{
        mainScreen.style.display = 'flex';
        stateMachine(STATES.COFFEE_EMPTY);
        

    },1000); //For testing only //
});

const grabCup=()=>{

    const cupRect = cup.getBoundingClientRect();
    const currentBottom = parseFloat(getComputedStyle(hand).bottom);
    const target = cupRect.bottom - ((windowHeight * 7.5)/100);
    const distance = target - currentBottom;

    handCollisionPoint = target;
    

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

const returnCupBack = () =>{
    const cupBottom = parseFloat(getComputedStyle(cup).bottom);
    const handBottom = parseFloat(getComputedStyle(hand).bottom);

    console.log(cupBottom, initialCupBot);
    console.log(handBottom, handCollisionPoint);

    if (cupBottom <= initialCupBot && handBottom <= handCollisionPoint){
        setTimeout(()=>requestAnimationFrame(returnHand), 200);
        
        return

    }

    cup.style.bottom = `${cupBottom - 10}px`;
    hand.style.bottom = `${handBottom - 10}px`;
    
    requestAnimationFrame(returnCupBack);

}

const returnHand = ()=>{
    const handPosition = parseFloat(getComputedStyle(hand).bottom);
    
    if (windowHeight <= handPosition){
        stateMachine(STATES.COFFEE_READY);
        return
    }

    hand.style.bottom = `${handPosition + 10}px`;
    requestAnimationFrame(returnHand);
}




cup.addEventListener('click', ()=>{
    if (cupEmpty){
        requestAnimationFrame(grabCup);
        returnCoffeeScreen.style.display = 'flex';
    }
    else{
        cup.style.transform = "scale(2)";
    }
});

window.addEventListener('resize', ()=>location.reload());




