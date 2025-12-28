import getQuoteToday from "./quotes.js";


const loadingScreen = document.getElementById('loading');
const mainScreen = document.getElementById('main');
const coffeeEmptyScreen = document.getElementById('coffee_empty');
const prepCoffeeScreen = document.getElementById('prep_coffee');
const returnCoffeeScreen = document.getElementById('return_coffee');
const coffeeReadyScreen = document.getElementById('coffee_ready');
const revealQuoteScreen = document.getElementById('quote_reveal');
const quoteContainerSize = parseFloat(getComputedStyle(document.getElementById('quote_container')).height);
const quoteContainer = document.getElementById('quote_container');




const cup = document.getElementById('cup');
const cupContent = document.getElementById('cup_content');
const spinningLayer = document.getElementById('cup_content_display');
const handle = document.getElementById('handle');
const hand = document.getElementById('hand');
const quote = document.getElementById('quote');

let cupEmpty = true;

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const currentScreenState = document.getElementById('currentScreenState');

let initialCupBot = ""; // This is the initial position of the empty cup bago yung grab cup animation;
let handCollisionPoint = ''; // this is the collision point ng hand at ng cup.

let todayQuote = "";
let toReveal = true;


mainScreen.style.display = 'none';

cup.style.width = `${windowHeight >= windowWidth ? 80 : 40}%`
hand.style.width = `${windowHeight >= windowWidth ? 20 : 10}%`;



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
            spinningLayer.style.display = 'none';
            hand.style.bottom = `${windowHeight}px`;
            initialCupBot = parseFloat(getComputedStyle(cup).bottom);

            

            break

        case STATES.PREP_COFFEE:
            const filledCup = "(Filled_cup.svg)";
            setStatus(prepCoffeeScreen);
            spinningLayer.style.display = 'flex';
            returnCoffeeScreen.style.display = 'flex';
            cupContent.style.background = `url${filledCup}`;
            cupContent.style.backgroundSize = "contain";
            cupContent.style.backgroundPosition = 'center';
            cupContent.style.backgroundRepeat = 'no-repeat';
            todayQuote = getQuoteToday(1);
            quote.innerHTML = todayQuote;

            setTimeout(()=>stateMachine(STATES.RETURN_COFFEE), 2000); //testing value only;

            break

        case STATES.RETURN_COFFEE:
            setStatus(coffeeEmptyScreen);
            
            currentScreenState.innerHTML = 'Return_coffee';
            returnCoffeeScreen.style.display = 'flex';
            requestAnimationFrame(returnCupBack);

            break

        case STATES.COFFEE_READY:
            cupEmpty = false;
            spinningLayer.style.animationPlayState = 'running';
            returnCoffeeScreen.style.display = 'none';
            revealQuoteScreen.style.display = 'none';

            break

        case STATES.QUOTE_REVEAL:
            spinningLayer.style.animationPlayState = 'paused';
            quote.style.fontSize = `${(quoteContainer.clientHeight * 40)/100}%`
            revealQuoteScreen.style.display = "flex";
            if (toReveal ? requestAnimationFrame(ZoomIn) : requestAnimationFrame(ZoomOut));


            
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
    const cupHeight = cup.getBoundingClientRect().height;

    const target = cupRect.bottom - ((cupHeight * 10) / 100 );
    const distance = target - currentBottom;

    handCollisionPoint = target;
    

    if (Math.abs(distance)< 1){
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
        spinningLayer.style.display = 'flex';
       
        return
    }

    hand.style.bottom = `${handPosition + 10}px`;
    requestAnimationFrame(returnHand);
}

const revealSize = 2.5;
let currentScale = 1;


const ZoomIn =()=>{
    toReveal = false;
    
    if (currentScale >= revealSize){
        spinningLayer.style.animationPlayState = 'running';
        setTimeout(()=>quote.classList.add('display'), 500);
        setTimeout(()=>{
            revealQuoteScreen.style.display = "none";
            
        }, 1200);

        return
    }

    cup.style.transform = `scale(${currentScale})`;
    currentScale += 0.05;
    requestAnimationFrame(ZoomIn);
  
}
const ZoomOut =()=>{
    quote.classList.remove('display')
    revealQuoteScreen.style.display = "flex";
    if (currentScale <= 1){
        toReveal = true
        revealQuoteScreen.style.display = "none";
        stateMachine(STATES.COFFEE_READY);
        return
    }
    cup.style.transform = `scale(${currentScale})`;
     currentScale -= 0.05;

    requestAnimationFrame(ZoomOut);
}
    


cup.addEventListener('click', ()=>{
    if (cupEmpty){
        requestAnimationFrame(grabCup);
    }
    else{
        stateMachine(STATES.QUOTE_REVEAL);
        

    }
});

window.addEventListener('resize', ()=>location.reload());




