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
        "Command line"

    },


    system:{

        name:"System",

        icon:"ℹ️",

        description:
        "System information"

    },

    explorer:{

        name:"Files",

        icon:"📁",

        description:
        "File Explorer"
    },


    calculator:{

        name:"Calculator",

        icon:"🧮",

        description:
        "Calculator"

    },


    tasks:{

        name:"Tasks",

        icon:"📊",

        description:
        "Running apps"

    },


    settings:{

        name:"Settings",

        icon:"⚙️",

        iconHtml:`
<svg class="app-glyph" viewBox="0 0 24 24" width="42" height="42" aria-hidden="true">
<path fill="currentColor" d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.07 7.07 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.9 2h-3.8a.5.5 0 0 0-.49.42l-.36 2.54c-.58.22-1.13.53-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 8.48a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L2.83 14.16a.5.5 0 0 0-.12.64l1.92 3.32c.14.24.43.34.69.22l2.39-.96c.5.41 1.05.72 1.63.94l.36 2.54c.05.24.25.42.49.42h3.8c.24 0 .44-.18.49-.42l.36-2.54c.58-.22 1.13-.53 1.63-.94l2.39.96c.26.1.55 0 .69-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z"/>
</svg>
`,

        description:
        "Preferences"

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


    app.classList.remove(
        "minimized"
    );



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

        app.classList.remove(
            "minimized",
            "maximized"
        );


    },250);


}


/* ============================
   MINIMIZE + MAXIMIZE
============================ */


function minimizeApp(app){


    app.classList.add(
        "minimized"
    );


    setTimeout(()=>{


        app.style.display =
        "none";


    },180);


}



function toggleMaximize(app){


    app.classList.toggle(
        "maximized"
    );


    focusWindow(app);


}



function wireWindowControls(){


    document
    .querySelectorAll(
        ".window"
    )
    .forEach(app=>{


        let minimize =
        app.querySelector(
            ".control.minimize"
        );


        let maximize =
        app.querySelector(
            ".control.maximize"
        );


        if(minimize){

            minimize.onclick =
            (event)=>{

                event.stopPropagation();

                minimizeApp(app);

            };

        }


        if(maximize){

            maximize.onclick =
            (event)=>{

                event.stopPropagation();

                toggleMaximize(app);

            };

        }


    });


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

<div class="icon-glyph">
${data.iconHtml || data.icon}
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

wireWindowControls();


});
