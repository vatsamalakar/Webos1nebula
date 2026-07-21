/* ===========================================================
   NebulaOS X
   system.js
   Core System Engine
=========================================================== */



/* ============================
   LIVE CLOCK
============================ */


function updateClock(){

    const clock =
    document.getElementById("clock");


    if(!clock)
    return;



    let now =
    new Date();



    let time =
    now.toLocaleTimeString([],{

        hour:"2-digit",
        minute:"2-digit"

    });



    let date =
    now.toLocaleDateString();



    clock.innerHTML =
    `
    ${date}
    •
    ${time}
    `;


}



setInterval(
    updateClock,
    1000
);


updateClock();







/* ============================
   STAR GENERATOR
============================ */


const starContainer =
document.querySelector(".stars");



function createStars(){


    if(!starContainer)
    return;



    for(
        let i=0;
        i<250;
        i++
    ){


        let star =
        document.createElement("div");



        star.className =
        "star";



        let size =
        Math.random();



        if(size < .7){

            star.classList.add(
                "small"
            );

        }

        else if(size < .9){

            star.classList.add(
                "medium"
            );

        }

        else{

            star.classList.add(
                "large"
            );

        }



        star.style.left =
        Math.random()*100 + "%";



        star.style.top =
        Math.random()*100 + "%";



        star.style.animationDuration =
        (
            2 +
            Math.random()*5
        )
        +
        "s";



        star.style.animationDelay =
        (
            Math.random()*5
        )
        +
        "s";



        starContainer.appendChild(
            star
        );


    }


}



createStars();








/* ============================
   SHOOTING STARS
============================ */


function createShootingStar(){


    let meteor =
    document.createElement(
        "div"
    );


    meteor.className =
    "shooting-star";



    meteor.style.left =
    Math.random()*80
    +
    "%";



    meteor.style.top =
    Math.random()*40
    +
    "%";



    meteor.style.animationDuration =
    (
        4+
        Math.random()*6
    )
    +
    "s";



    document.body.appendChild(
        meteor
    );



    setTimeout(()=>{


        meteor.remove();


    },10000);



}




setInterval(
    createShootingStar,
    4000
);








/* ============================
   SYSTEM INFO
============================ */


function systemInfo(){


    return {

        os:
        "NebulaOS X",


        version:
        "1.0.0",


        browser:
        navigator.userAgent,


        online:
        navigator.onLine,


        screen:
        `${window.innerWidth}
        x
        ${window.innerHeight}`


    };


}








/* ============================
   BOOT MESSAGE
============================ */


window.addEventListener(
"load",
()=>{


console.log(
`
🚀 NebulaOS X Started

System:
Online 🟢

Version:
1.0.0

Welcome Commander.
`
);


});