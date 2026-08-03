/* ===========================================================
   NebulaOS X
   Advanced Terminal
=========================================================== */


const terminalInput =
document.getElementById(
    "terminalInput"
);


const terminalOutput =
document.getElementById(
    "terminalOutput"
);



let history = [];

let historyPosition = -1;







function terminalPrint(text){


    terminalOutput.innerHTML +=
    `<br>${text}`;


    terminalOutput.scrollTop =
    terminalOutput.scrollHeight;


}









function executeCommand(input){


    let command =
    input
    .trim()
    .toLowerCase();



    terminalPrint(
        `<span class="command">
        > ${input}
        </span>`
    );




    let args =
    command.split(" ");




    switch(args[0]){



        case "help":


        terminalPrint(`

<b>Commands</b>

help
about
apps
open
ls
time
date
clear
neofetch
theme

        `);

        break;






        case "about":


        terminalPrint(`

NebulaOS X

A browser-based desktop environment.

Built with HTML, CSS, and JavaScript.

Version: 1.0.0

        `);


        break;







        case "apps":


        terminalPrint(`

Installed applications:

Notes
Terminal
Files
System
Calculator
Tasks
Settings

        `);


        break;








        case "open":



        if(args[1]){


            if(
            args[1]=="notes"
            ){

                openApp("notes");

            }


            else if(
            args[1]=="terminal"
            ){

                openApp("terminal");

            }


            else if(
            args[1]=="files"
            ||
            args[1]=="explorer"
            ){

                openApp("explorer");

            }


            else if(
            args[1]=="system"
            ){

                openApp("system");

            }


            else if(
            args[1]=="calculator"
            ||
            args[1]=="calc"
            ){

                openApp("calculator");

            }


            else if(
            args[1]=="tasks"
            ){

                openApp("tasks");

            }


            else if(
            args[1]=="settings"
            ){

                openApp("settings");

            }


            else{


                terminalPrint(
                "Application not found"
                );


            }


        }

        else{


            terminalPrint(
            "Usage: open [app]"
            );


        }


        break;










        case "ls":


        terminalPrint(`

Documents
Projects
welcome.txt
about.txt

        `);


        break;









        case "time":


        terminalPrint(

            new Date()
            .toLocaleTimeString()

        );


        break;








        case "date":


        terminalPrint(

            new Date()
            .toLocaleDateString()

        );


        break;









        case "neofetch":


        terminalPrint(`

NebulaOS X
Version: 1.0.0
Kernel: Web Runtime
Storage: Local Browser Storage
Status: Online

        `);


        break;









        case "theme":


        document.body.classList.toggle(
            "light-mode"
        );


        terminalPrint(
        "Theme switched"
        );


        break;









        case "clear":


        terminalOutput.innerHTML =
        "";


        break;









        default:


        terminalPrint(

        `Command not found:
        ${command}

        Type help`

        );



    }



}









if(terminalInput){


terminalInput.addEventListener(

"keydown",

(e)=>{


    if(
        e.key==="Enter"
    ){


        let value =
        terminalInput.value;



        if(value.trim()){


            history.push(value);


            historyPosition =
            history.length;


            executeCommand(
                value
            );


        }



        terminalInput.value="";


    }





    if(
    e.key==="ArrowUp"
    ){


        if(history.length){


            historyPosition--;


            if(historyPosition<0)
            historyPosition=0;



            terminalInput.value =
            history[
                historyPosition
            ];


        }


    }





});


}








window.addEventListener(

"load",

()=>{


terminalPrint(
"System initialized"
);


terminalPrint(
"Type 'help' for commands"
);


}

);
