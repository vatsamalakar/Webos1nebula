/* ===========================================================
   NebulaOS X
   tasks.js
=========================================================== */


const trackedApps = [
    { id: "notes", name: "Notes" },
    { id: "terminal", name: "Terminal" },
    { id: "system", name: "System" },
    { id: "explorer", name: "File Explorer" },
    { id: "calculator", name: "Calculator" },
    { id: "tasks", name: "Task Manager" },
    { id: "settings", name: "Settings" }
];


function isAppOpen(app){

    if(!app)
    return false;

    let style = window.getComputedStyle(app);

    return style.display !== "none" && !app.classList.contains("minimized");

}


function countWords(text){

    return text
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .length;

}


function refreshTaskManager(){

    let openCount = document.getElementById("openWindowCount");
    let fileCount = document.getElementById("fileCount");
    let notesWordCount = document.getElementById("notesWordCount");
    let taskList = document.getElementById("taskList");

    if(!taskList)
    return;


    let openWindows = trackedApps.filter(app =>
        isAppOpen(document.getElementById(app.id))
    );


    if(openCount){
        openCount.textContent = String(openWindows.length);
    }


    if(fileCount){

        let files = (typeof fileSystem !== "undefined" && Array.isArray(fileSystem))
            ? fileSystem.length
            : 0;

        fileCount.textContent = String(files);

    }


    if(notesWordCount){

        let notesBox = document.getElementById("notesBox");
        notesWordCount.textContent = String(
            notesBox ? countWords(notesBox.value || "") : 0
        );

    }


    taskList.innerHTML = "";


    if(!openWindows.length){

        taskList.innerHTML =
        `<div class="task-item"><span>No apps running</span></div>`;

        return;

    }


    openWindows.forEach(app => {

        let row = document.createElement("div");
        row.className = "task-item";

        row.innerHTML = `
            <span>${app.name}</span>
            <button type="button">Close</button>
        `;

        row.querySelector("button").onclick = () => {
            closeApp(app.id);
            refreshTaskManager();
        };

        taskList.appendChild(row);

    });

}


window.addEventListener("load", () => {

    refreshTaskManager();

    setInterval(refreshTaskManager, 1000);

    let notesBox = document.getElementById("notesBox");

    if(notesBox){
        notesBox.addEventListener("input", refreshTaskManager);
    }

});
