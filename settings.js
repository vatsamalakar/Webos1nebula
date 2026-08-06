/* ===========================================================
   NebulaOS X
   settings.js
=========================================================== */


const SETTINGS_KEY = "nebula_settings";


function loadSettings(){

    try {

        return JSON.parse(
            localStorage.getItem(SETTINGS_KEY)
        ) || {};

    } catch (error){

        return {};

    }

}


function saveSettings(next){

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(next)
    );

}


function applyAccent(color){

    document.documentElement.style.setProperty("--accent", color);

}


function setAccent(color){

    applyAccent(color);

    let settings = loadSettings();
    settings.accent = color;
    saveSettings(settings);

}


function toggleTheme(){

    document.body.classList.toggle("light-mode");

    let settings = loadSettings();
    settings.lightMode = document.body.classList.contains("light-mode");
    saveSettings(settings);

}


window.addEventListener("load", () => {

    let settings = loadSettings();

    if(settings.lightMode){
        document.body.classList.add("light-mode");
    }

    if(settings.accent){
        applyAccent(settings.accent);
    }

    // Clear any previously saved motion preference
    document.body.classList.remove("reduce-motion");
    if("reduceMotion" in settings){
        delete settings.reduceMotion;
        saveSettings(settings);
    }

});
