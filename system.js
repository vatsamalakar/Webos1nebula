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
"NebulaOS X started — version 1.0.0"
);


});
