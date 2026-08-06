/* ===========================================================
   NebulaOS X
   quotes.js
   Quote of the Day
=========================================================== */


const quoteLibrary = [

    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },

    {
        text: "In the middle of difficulty lies opportunity.",
        author: "Albert Einstein"
    },

    {
        text: "Stay hungry, stay foolish.",
        author: "Stewart Brand"
    },

    {
        text: "Simplicity is the ultimate sophistication.",
        author: "Leonardo da Vinci"
    },

    {
        text: "Code is like humor. When you have to explain it, it’s bad.",
        author: "Cory House"
    },

    {
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb"
    },

    {
        text: "Do not wait to strike till the iron is hot; but make it hot by striking.",
        author: "William Butler Yeats"
    },

    {
        text: "It always seems impossible until it’s done.",
        author: "Nelson Mandela"
    },

    {
        text: "What we know is a drop, what we don’t know is an ocean.",
        author: "Isaac Newton"
    },

    {
        text: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde"
    },

    {
        text: "The quieter you become, the more you can hear.",
        author: "Ram Dass"
    },

    {
        text: "First, solve the problem. Then, write the code.",
        author: "John Johnson"
    },

    {
        text: "Creativity is intelligence having fun.",
        author: "Albert Einstein"
    },

    {
        text: "Make it work, make it right, make it fast.",
        author: "Kent Beck"
    },

    {
        text: "A journey of a thousand miles begins with a single step.",
        author: "Lao Tzu"
    },

    {
        text: "The details are not the details. They make the design.",
        author: "Charles Eames"
    },

    {
        text: "Dream big. Start small. Act now.",
        author: "Robin Sharma"
    },

    {
        text: "Curiosity is the engine of achievement.",
        author: "Ken Robinson"
    },

    {
        text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
        author: "Antoine de Saint-Exupéry"
    },

    {
        text: "You miss 100% of the shots you don’t take.",
        author: "Wayne Gretzky"
    }

];


function dayOfYear(date = new Date()){

    let start = new Date(date.getFullYear(), 0, 0);
    let diff = date - start;
    return Math.floor(diff / 86400000);

}


function quoteOfTheDay(){

    let index = dayOfYear() % quoteLibrary.length;
    return quoteLibrary[index];

}


function randomQuote(excludeText){

    if(quoteLibrary.length < 2)
    return quoteLibrary[0];

    let pick;

    do{
        pick = quoteLibrary[
            Math.floor(Math.random() * quoteLibrary.length)
        ];
    } while(pick.text === excludeText);

    return pick;

}


function renderQuote(quote, isDaily){

    let textEl = document.getElementById("quoteText");
    let authorEl = document.getElementById("quoteAuthor");
    let labelEl = document.getElementById("quoteLabel");

    if(!textEl || !authorEl)
    return;

    textEl.textContent = `“${quote.text}”`;
    authorEl.textContent = `— ${quote.author}`;

    if(labelEl){
        labelEl.textContent = isDaily
            ? "Quote of the Day"
            : "Random Quote";
    }

}


function showDailyQuote(){

    renderQuote(quoteOfTheDay(), true);

}


function showAnotherQuote(){

    let textEl = document.getElementById("quoteText");
    let current = textEl
        ? textEl.textContent.replace(/^[“"]|[”"]$/g, "")
        : "";

    renderQuote(randomQuote(current), false);

}


function copyQuote(){

    let textEl = document.getElementById("quoteText");
    let authorEl = document.getElementById("quoteAuthor");
    let button = document.getElementById("copyQuoteBtn");

    if(!textEl || !authorEl)
    return;

    let payload = `${textEl.textContent} ${authorEl.textContent}`;

    navigator.clipboard.writeText(payload).then(() => {

        if(!button)
        return;

        let original = button.textContent;
        button.textContent = "Copied!";

        setTimeout(() => {
            button.textContent = original;
        }, 1200);

    }).catch(() => {});

}


window.addEventListener("load", () => {

    showDailyQuote();

});
