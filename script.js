
import getQuoteToday from "./quotes.js";

const spacer1 = document.getElementById('spacer1');
const spacer1Height = parseFloat(getComputedStyle(spacer1).height);

const spacer2 = document.getElementById('spacer2');


const loadingScreen = document.getElementById('loading');
const mainScreen = document.getElementById('main');
const coffeeEmptyScreen = document.getElementById('coffee_empty');
const prepCoffeeScreen = document.getElementById('prep_coffee');
const returnCoffeeScreen = document.getElementById('return_coffee');
const coffeeReadyScreen = document.getElementById('coffee_ready');
const revealQuoteScreen = document.getElementById('quote_reveal');
const quoteContainerSize = parseFloat(getComputedStyle(document.getElementById('quote_container')).height);
const quoteContainer = document.getElementById('quote_container');

localStorage.getItem('quoteRevealed')|| false;

const coffeeFlow = document.getElementById('coffee-flow');
const letterFlow = document.getElementById('letter-flow');
const cup = document.getElementById('cup');
const cupContent = document.getElementById('cup_content');
const cupPrepScreen = document.getElementById('cup-prep');
const spinningLayer = document.getElementById('cup_content_display');
const handle = document.getElementById('handle');
const hand = document.getElementById('hand');
const paws = document.getElementById('paws');
const middle = document.getElementById('middle');
const quote = document.getElementById('quote');

const dayTodaySpan = document.getElementById('day_today');
const dateTodaySpan = document.getElementById('date_today');

let cupEmpty = true;

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const currentScreenState = document.getElementById('currentScreenState');



let initialCupBot = ""; // This is the initial position of the empty cup bago yung grab cup animation;
let handCollisionPoint = ''; // this is the collision point nung hand at ng cup.

let toReveal = true;
let todayQuote = getQuoteToday(1);


mainScreen.style.display = 'none';



cup.style.width = `${windowHeight >= windowWidth ? 80 : 40}%`
hand.style.width = `${windowHeight >= windowWidth ? 20 : 10}%`;
paws.style.height = `${(Math.abs(windowWidth - windowHeight) * 2)/100}%`;

cupPrepScreen.style.height = `${(windowWidth >= windowHeight ? 75 : 25)+ (windowHeight/70)}%`;
cupPrepScreen.style.width = `${(windowWidth >= windowHeight ? 33 : 40)}%`;
coffeeFlow.style.width = `${(parseFloat(getComputedStyle(cupPrepScreen).width)*30)/100}%`;


const middleSize = (parseFloat(getComputedStyle(paws).width) * 5)/100;

middle.style.borderLeft = `${middleSize}px rgb(54, 54, 54) solid`;
middle.style.borderRight = `${middleSize}px rgb(54, 54, 54) solid`;

dayTodaySpan.style.fontSize = `${(spacer1Height * 25)/100}px`;
dateTodaySpan.style.fontSize = `${(spacer1Height * 35)/100}px`;




const daysOfWeek = {
    0 : "Sunday",
    1 : "Monday",
    2 : "Tuesday",
    3 : "Wednesday",
    4 : 'Thursday',
    5 : 'Friday',
    6 : 'Saturday'

}
const dayToday = new Date().getDay();


const months = {
    0 : 'Jan',
    1 : 'Feb',
    2 : 'Mar',
    3 : 'Apr',
    4 : 'May',
    5 : 'Jun',
    6 : 'Jul',
    7 : 'Aug',
    8 : 'Sep',
    9 : 'Oct',
    10 : 'Nov',
    11 : 'Dec'
}
const date = new Date();
const dateToday = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

const savedDate = localStorage.getItem('dateToday')|| dateToday;

if (savedDate !== dateToday){
    localStorage.setItem('quoteRevealed', false);
    localStorage.setItem('dateToday', dateToday);
}


const STATES = {
    LOADING : 'loading_screen',
    COFFEE_EMPTY : 'coffee_empty',
    PREP_COFFEE : "prep_coffee",
    RETURN_COFFEE : 'return_coffee',
    COFFEE_READY : 'coffee_ready',
    QUOTE_REVEAL : 'quote_reveal'
}

const getDayOfYear = (date) =>{
    const start = new Date(date.getFullYear(), 0, 1);
    const difference = date - start;
    const oneDay = 1000 * 60 * 60 * 24
    return 1 + Math.floor(difference / oneDay);
}

const totalDay = getDayOfYear(new Date(date.getFullYear(), date.getMonth(), date.getDate()));

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
            dayTodaySpan.innerHTML = daysOfWeek[dayToday];
            dateTodaySpan.innerHTML = dateToday;
            
            prepCoffeeScreen.style.display = 'flex'; // remove later
            spinningLayer.style.display = 'none';
            hand.style.bottom = `${windowHeight}px`;
            initialCupBot = parseFloat(getComputedStyle(cup).bottom);

            

            break

        case STATES.PREP_COFFEE:
            
            setStatus(prepCoffeeScreen);
            spinningLayer.style.display = 'flex';
            returnCoffeeScreen.style.display = 'flex';
            quote.innerHTML = todayQuote;
            flowingLetterEffect();
            setTimeout(()=>stateMachine(STATES.RETURN_COFFEE), 2000); //testing value only;

            break

        case STATES.RETURN_COFFEE:
            setStatus(coffeeEmptyScreen);
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

const word = [...todayQuote];
coffeeFlow.style.display = 'none';

const flowingLetterEffect = () =>{

    

    if (word.length > 0){
        const letter = document.createElement('h1');
        letter.textContent = word.pop();
        letter.style.position = `absolute`;
        letter.className = 'letter';
        letter.style.transition = `top 0.5s ease-in-out`;
        letter.style.left = `${Math.floor(Math.random()* 15 + 1) * 5}%`;
        letter.style.animation = `letterFalling 1s linear forwards `;
        letterFlow.appendChild(letter);

        setTimeout(()=>{
            requestAnimationFrame(flowingLetterEffect)
        },700)
        

        
       

    }

    
}

requestAnimationFrame(flowingLetterEffect)




const grabCup=()=>{

    const cupRect = cup.getBoundingClientRect();
    const currentBottom = parseFloat(getComputedStyle(hand).bottom);
    const cupHeight = cup.getBoundingClientRect().height;

    const target = cupRect.bottom - ((cupHeight * 10.5) / 100 );
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
    spacer1.classList.add('show');
    spacer2.classList.add('show');
    if (currentScale >= revealSize){
        spinningLayer.style.animationPlayState = 'running';
        setTimeout(()=>quote.classList.add('display'), 300);
        setTimeout(()=>{
            localStorage.setItem('quoteRevealed' , true);
            revealQuoteScreen.style.display = "none";
            
        }, 1000);

        return
    }

    cup.style.transform = `scale(${currentScale})`;
    currentScale += 0.05;
    requestAnimationFrame(ZoomIn);
  
}
const ZoomOut =()=>{
    spacer1.classList.remove('show');
    spacer2.classList.remove('show');
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




