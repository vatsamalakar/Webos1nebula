/* ===========================================================
   NebulaOS X
   jokes.js
   Joke Generator
=========================================================== */


const jokeLibrary = [

    {
        setup: "Why do programmers prefer dark mode?",
        punchline: "Because light attracts bugs."
    },

    {
        setup: "How many programmers does it take to change a light bulb?",
        punchline: "None. That’s a hardware problem."
    },

    {
        setup: "Why did the developer go broke?",
        punchline: "Because they used up all their cache."
    },

    {
        setup: "What’s a computer’s favorite snack?",
        punchline: "Microchips."
    },

    {
        setup: "Why was the JavaScript developer sad?",
        punchline: "Because they didn’t Node how to Express themselves."
    },

    {
        setup: "Why do Java developers wear glasses?",
        punchline: "Because they don’t C#."
    },

    {
        setup: "What do you call 8 hobbits?",
        punchline: "A hobbyte."
    },

    {
        setup: "Why did the scarecrow win an award?",
        punchline: "Because he was outstanding in his field."
    },

    {
        setup: "I told my computer I needed a break.",
        punchline: "It said: “No problem — I’ll go to sleep.”"
    },

    {
        setup: "Why can’t you trust atoms?",
        punchline: "They make up everything."
    },

    {
        setup: "What’s a pirate’s favorite programming language?",
        punchline: "R."
    },

    {
        setup: "Why did the function break up with the variable?",
        punchline: "There was no return."
    },

    {
        setup: "How does a computer get drunk?",
        punchline: "It takes screenshots."
    },

    {
        setup: "Why was the equal sign so humble?",
        punchline: "It knew it wasn’t greater than or less than anyone else."
    },

    {
        setup: "What did the router say to the doctor?",
        punchline: "It hurts when IP."
    },

    {
        setup: "Why did the coffee file a police report?",
        punchline: "It got mugged."
    },

    {
        setup: "What’s the object-oriented way to become wealthy?",
        punchline: "Inheritance."
    },

    {
        setup: "Why do seagulls fly over the sea?",
        punchline: "If they flew over the bay, they’d be bagels."
    },

    {
        setup: "A SQL query walks into a bar, walks up to two tables, and asks…",
        punchline: "“Can I join you?”"
    },

    {
        setup: "Why did the developer quit their job?",
        punchline: "They didn’t get arrays."
    }

];


let currentJoke = null;
let punchlineVisible = false;


function pickJoke(excludeSetup){

    if(jokeLibrary.length < 2)
    return jokeLibrary[0];

    let pick;

    do{
        pick = jokeLibrary[
            Math.floor(Math.random() * jokeLibrary.length)
        ];
    } while(pick.setup === excludeSetup);

    return pick;

}


function setJokeStatus(message){

    let status = document.getElementById("jokeStatus");

    if(status)
    status.textContent = message;

}


function renderJoke(joke, reveal){

    let setupEl = document.getElementById("jokeSetup");
    let punchlineEl = document.getElementById("jokePunchline");
    let revealBtn = document.getElementById("revealJokeBtn");

    if(!setupEl || !punchlineEl)
    return;

    currentJoke = joke;
    punchlineVisible = !!reveal;

    setupEl.textContent = joke.setup;
    punchlineEl.textContent = reveal ? joke.punchline : "???";
    punchlineEl.classList.toggle("revealed", reveal);

    if(revealBtn){
        revealBtn.disabled = reveal;
        revealBtn.textContent = reveal ? "Revealed" : "Reveal Punchline";
    }

    setJokeStatus(reveal ? "Ba-dum-tss." : "Ready when you are.");

}


function nextJoke(){

    let exclude = currentJoke ? currentJoke.setup : "";
    renderJoke(pickJoke(exclude), false);

}


function revealPunchline(){

    if(!currentJoke || punchlineVisible)
    return;

    renderJoke(currentJoke, true);

}


window.addEventListener("load", () => {

    nextJoke();

});
