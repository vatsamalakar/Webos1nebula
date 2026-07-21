/* ===========================================================
   NebulaOS X
   fileexplorer.js
   Virtual File System
=========================================================== */


let fileSystem = JSON.parse(
    localStorage.getItem("nebula_files")
) || [

    {
        name:"Documents",
        type:"folder"
    },

    {
        name:"Projects",
        type:"folder"
    },

    {
        name:"welcome.txt",
        type:"file",
        content:
        "Welcome to NebulaOS X 🚀"
    },

    {
        name:"about.txt",
        type:"file",
        content:
        "NebulaOS X is a futuristic web operating system."
    }

];




function saveFileSystem(){

    localStorage.setItem(
        "nebula_files",
        JSON.stringify(fileSystem)
    );

}





const explorer =
document.getElementById(
    "fileList"
);





function renderFiles(
    filter=""
){

    if(!explorer)
    return;



    explorer.innerHTML="";



    let files =
    fileSystem.filter(file=>

        file.name
        .toLowerCase()
        .includes(
            filter.toLowerCase()
        )

    );



    files.forEach(file=>{


        let card =
        document.createElement(
            "div"
        );


        card.className =
        "file-card";



        card.innerHTML = `

        <div class="file-icon">

        ${
            file.type==="folder"
            ?
            "📁"
            :
            "📄"
        }

        </div>


        <p>
        ${file.name}
        </p>

        `;



        card.onclick =
        ()=>{


            if(file.type==="file"){

                openFile(file);

            }


        };



        explorer.appendChild(
            card
        );


    });


}







function openFile(file){


    alert(

        "Opening file:\n\n"
        +
        file.content

    );


}








function createFile(){


    let name =
    prompt(
        "File name:"
    );



    if(!name)
    return;



    fileSystem.push({

        name:name,

        type:"file",

        content:
        "New NebulaOS document"

    });



    saveFileSystem();


    renderFiles();


}







function createFolder(){


    let name =
    prompt(
        "Folder name:"
    );



    if(!name)
    return;



    fileSystem.push({

        name:name,

        type:"folder"

    });



    saveFileSystem();


    renderFiles();


}







function deleteFile(){


    let name =
    prompt(
        "Enter file name to delete:"
    );



    fileSystem =
    fileSystem.filter(

        file =>
        file.name !== name

    );



    saveFileSystem();


    renderFiles();


}








function searchFiles(value){


    renderFiles(
        value
    );


}








window.addEventListener(

"load",

()=>{

    renderFiles();

}

);