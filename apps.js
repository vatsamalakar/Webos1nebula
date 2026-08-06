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

        description:
        "Personal notes application"

    },


    terminal:{

        name:"Terminal",

        description:
        "Command line"

    },


    system:{

        name:"System",

        description:
        "System information"

    },

    explorer:{

        name:"Files",

        description:
        "File Explorer"
    },


    calculator:{

        name:"Calculator",

        description:
        "Calculator"

    },


    tasks:{

        name:"Tasks",

        description:
        "Running apps"

    },


    settings:{

        name:"Settings",

        description:
        "Preferences"

    },


    quotes:{

        name:"Quotes",

        description:
        "Quote of the Day"

    },


    jokes:{

        name:"Jokes",

        description:
        "Joke Generator"

    },


    calendar:{

        name:"Calendar",

        description:
        "Month calendar"

    }



};







const pinnedDockApps = ["system", "settings"];


function isAppRunning(app){

    if(!app)
    return false;

    if(app.classList.contains("minimized"))
    return true;

    return window.getComputedStyle(app).display !== "none";

}


function refreshDock(){

    let divider = document.getElementById("dockDivider");
    let running = document.getElementById("dockRunning");
    let pinnedSystem = document.getElementById("dockPinnedSystem");
    let pinnedSettings = document.getElementById("dockPinnedSettings");

    if(!running)
    return;


    let openApps = Object.keys(apps).filter(id =>
        !pinnedDockApps.includes(id) &&
        isAppRunning(document.getElementById(id))
    );


    running.innerHTML = "";


    openApps.forEach(id => {

        let data = apps[id];
        let button = document.createElement("button");
        button.type = "button";
        button.className = "open";
        button.setAttribute("aria-label", data.name);
        button.title = data.name;
        button.textContent = data.name;
        button.onclick = () => openApp(id);
        running.appendChild(button);

    });


    if(divider){

        let showDivider = openApps.length > 0;
        divider.hidden = !showDivider;
        divider.setAttribute("aria-hidden", showDivider ? "false" : "true");

    }


    if(pinnedSystem){
        pinnedSystem.classList.toggle(
            "open",
            isAppRunning(document.getElementById("system"))
        );
    }


    if(pinnedSettings){
        pinnedSettings.classList.toggle(
            "open",
            isAppRunning(document.getElementById("settings"))
        );
    }

}


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

    refreshDock();


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

        refreshDock();


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

        refreshDock();


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

refreshDock();


});
