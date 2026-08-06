/* ===========================================================
   NebulaOS X
   notes.js
   Notes Application
=========================================================== */

const notesBox =
document.getElementById("notesBox");


const saveStatus =
document.createElement("p");


saveStatus.style.fontSize =
"13px";


saveStatus.style.opacity =
"0.7";



if(notesBox){


    notesBox.parentElement.appendChild(
        saveStatus
    );


}





/* ============================
   LOAD NOTES
============================ */


function loadNotes(){


    if(!notesBox)
    return;



    let saved =
    localStorage.getItem(
        "nebula_notes"
    );



    if(saved){

        notesBox.value =
        saved;

    }


    updateCounter();


}







/* ============================
   SAVE NOTES
============================ */


function saveNotes(){


    if(!notesBox)
    return;



    localStorage.setItem(

        "nebula_notes",

        notesBox.value

    );



    saveStatus.innerHTML =
    "Saved ✓";



    setTimeout(()=>{


        saveStatus.innerHTML =
        "";


    },2000);



}








/* ============================
   AUTO SAVE
============================ */


if(notesBox){


notesBox.addEventListener(
"input",
()=>{


    updateCounter();



    localStorage.setItem(

        "nebula_notes",

        notesBox.value

    );


    saveStatus.innerHTML =
    "Auto saved ✓";



});


}








/* ============================
   WORD COUNTER
============================ */


function updateCounter(){


    if(!notesBox)
    return;



    let words =
    notesBox.value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;



    saveStatus.innerHTML =
    `Words: ${words}`;

}





/* ============================
   START APP
============================ */


window.addEventListener(
"load",
()=>{


loadNotes();


});
