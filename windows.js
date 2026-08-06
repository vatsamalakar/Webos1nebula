/* ===========================================================
   NebulaOS X
   windows.js
   Window Manager
=========================================================== */


let highestZ = 100;



/*
    Make every window draggable
*/

document.querySelectorAll(".window").forEach(window => {


    let title = window.querySelector(".titlebar");


    if(title){

        title.addEventListener(
            "mousedown",
            dragStart
        );

    }


    window.addEventListener(
        "mousedown",
        () => {

            bringToFront(window);

        }
    );


});





/*
    Bring selected window above others
*/

function bringToFront(window){


    highestZ++;

    window.style.zIndex = highestZ;


    document
    .querySelectorAll(".window")
    .forEach(w=>{

        w.classList.remove("active");

    });


    window.classList.add("active");

}







/*
    Dragging system
*/


let draggingWindow = null;

let offsetX = 0;

let offsetY = 0;



function dragStart(e){


    draggingWindow =
    e.currentTarget.parentElement;


    bringToFront(
        draggingWindow
    );


    offsetX =
    e.clientX -
    draggingWindow.offsetLeft;


    offsetY =
    e.clientY -
    draggingWindow.offsetTop;



    document.addEventListener(
        "mousemove",
        dragMove
    );


    document.addEventListener(
        "mouseup",
        dragEnd
    );


}





function dragMove(e){


    if(!draggingWindow)
    return;



    let x =
    e.clientX - offsetX;


    let y =
    e.clientY - offsetY;



    /*
       Keep window inside screen
    */


    let maxX =
    window.innerWidth -
    draggingWindow.offsetWidth;


    let maxY =
    window.innerHeight -
    draggingWindow.offsetHeight;



    x =
    Math.max(
        0,
        Math.min(
            x,
            maxX
        )
    );



    y =
    Math.max(
        40,
        Math.min(
            y,
            maxY
        )
    );



    draggingWindow.style.left =
    x + "px";


    draggingWindow.style.top =
    y + "px";



}





function dragEnd(){


    draggingWindow=null;


    document.removeEventListener(
        "mousemove",
        dragMove
    );


    document.removeEventListener(
        "mouseup",
        dragEnd
    );


}








/*
    Open window
*/


function openWindow(id){


    let app =
    document.getElementById(id);



    if(!app)
    return;



    app.style.display="flex";


    app.style.animation=
    "windowOpen .35s ease";



    bringToFront(app);


}








/*
    Close window
*/


function closeWindow(id){


    let app =
    document.getElementById(id);



    if(!app)
    return;



    app.style.animation=
    "windowClose .25s ease";



    setTimeout(()=>{


        app.style.display="none";


    },250);



}








/*
    Minimize
*/


function minimizeWindow(id){


    let app =
    document.getElementById(id);



    app.style.transform=
    "scale(.1) translateY(500px)";


    app.style.opacity="0";



    setTimeout(()=>{


        app.style.display="none";

        app.style.transform="";


    },250);


}








/*
    Maximize
*/


function maximizeWindow(id){


    let app =
    document.getElementById(id);



    if(
        app.dataset.maximized === "true"
    ){


        app.style.width="650px";

        app.style.height="420px";

        app.style.left="180px";

        app.style.top="120px";


        app.dataset.maximized="false";


    }

    else{


        app.style.width="95vw";

        app.style.height="85vh";

        app.style.left="2.5vw";

        app.style.top="80px";


        app.dataset.maximized="true";


    }



    bringToFront(app);


}








/*
    Connect buttons automatically
*/


document
.querySelectorAll("[data-close]")
.forEach(button=>{


button.onclick=()=>{


closeWindow(
button.dataset.close
);


};


});



document
.querySelectorAll("[data-open]")
.forEach(button=>{


button.onclick=()=>{


openWindow(
button.dataset.open
);


};


});
