/* ===========================================================
   NebulaOS X
   apps.js
   Application Manager
=========================================================== */



/* ============================
   APPLICATION DATABASE
============================ */


const apps = {


    notes:{

        name:"Notes",

        icon:"📝",

        description:
        "Personal notes application"

    },


    terminal:{

        name:"Terminal",

        icon:"💻",

        description:
        "Nebula command line"

    },


    system:{

        name:"System",

        icon:"⚙️",

        description:
        "System information"

    },

    explorer:{

        name:"Files",

        icon:"📁",

        description:
        "File Explorer"
}



};







/* ============================
   OPEN APP
============================ */


function openApp(appID){


    let app =
    document.getElementById(
        appID
    );



    if(!app){

        console.log(
            "Application not found:",
            appID
        );

        return;

    }




    app.style.display =
    "flex";



    app.style.opacity =
    "1";



    app.style.transform =
    "scale(1)";



    app.style.animation =
    "windowOpen .3s ease";



    focusWindow(app);



}








/* ============================
   CLOSE APP
============================ */


function closeApp(appID){


    let app =
    document.getElementById(
        appID
    );



    if(!app)
    return;



    app.style.animation =
    "windowClose .25s ease";



    setTimeout(()=>{


        app.style.display =
        "none";


    },250);


}








/* ============================
   WINDOW FOCUS
============================ */


let appLayer = 200;



function focusWindow(app){


    appLayer++;


    app.style.zIndex =
    appLayer;



    document
    .querySelectorAll(
        ".window"
    )
    .forEach(win=>{


        win.classList.remove(
            "active"
        );


    });



    app.classList.add(
        "active"
    );


}









/* ============================
   CLICK WINDOWS TO FOCUS
============================ */


document
.addEventListener(
"click",
(event)=>{


let windowBox =
event.target.closest(
".window"
);



if(windowBox){

    focusWindow(
        windowBox
    );

}



});









/* ============================
   CREATE DESKTOP ICONS
============================ */


function createDesktopIcons(){


let desktop =
document.querySelector(
".desktop"
);



if(!desktop)
return;



Object.keys(apps)
.forEach(id=>{


let data =
apps[id];



let icon =
document.createElement(
"div"
);



icon.className =
"icon";



icon.innerHTML =
`

<div style="
font-size:48px;
">
${data.icon}
</div>

<span>
${data.name}
</span>

`;



icon.onclick =
()=>{

openApp(id);

};



desktop.appendChild(
icon
);



});



}






window.addEventListener(
"load",
()=>{


createDesktopIcons();


});