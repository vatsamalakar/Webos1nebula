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
        "Welcome to NebulaOS X."
    },

    {
        name:"about.txt",
        type:"file",
        content:
        "NebulaOS X is a browser-based desktop environment."
    }

];


let selectedFileName = null;


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


function getEditorElements(){

    return {
        title: document.getElementById("editorTitle"),
        content: document.getElementById("fileContent"),
        saveBtn: document.getElementById("saveFileBtn")
    };

}


function clearEditor(){

    selectedFileName = null;

    let { title, content, saveBtn } = getEditorElements();

    if(title){
        title.textContent = "No file selected";
    }

    if(content){
        content.value = "";
        content.disabled = true;
        content.placeholder = "Select a file to edit it.";
    }

    if(saveBtn){
        saveBtn.disabled = true;
    }

}


function renderFiles(filter=""){

    if(!explorer)
    return;


    explorer.innerHTML="";


    let files =
    fileSystem
        .filter(file =>
            file.name
            .toLowerCase()
            .includes(filter.toLowerCase())
        )
        .sort((a, b) => {

            if(a.type !== b.type){
                return a.type === "folder" ? -1 : 1;
            }

            return a.name.localeCompare(b.name);

        });


    if(!files.length){

        let empty = document.createElement("div");
        empty.className = "file-empty";
        empty.textContent = filter
            ? "No matches"
            : "No files yet";
        explorer.appendChild(empty);
        return;

    }


    files.forEach(file=>{


        let card =
        document.createElement(
            "div"
        );


        card.className =
        "file-card";

        if(file.name === selectedFileName){
            card.classList.add("active");
        }


        card.innerHTML = `

        <div class="file-icon">

        ${
            file.type==="folder"
            ?
            "dir"
            :
            "file"
        }

        </div>


        <p>
        ${file.name}
        </p>

        `;


        card.onclick =
        ()=>{

            selectEntry(file);

        };


        explorer.appendChild(
            card
        );


    });


}


function selectEntry(file){

    selectedFileName = file.name;

    let { title, content, saveBtn } = getEditorElements();

    if(file.type === "folder"){

        if(title){
            title.textContent = file.name;
        }

        if(content){
            content.disabled = true;
            content.value = "";
            content.placeholder = "Folders can’t be edited. Use Delete to remove this folder.";
        }

        if(saveBtn){
            saveBtn.disabled = true;
        }

    } else {

        if(title){
            title.textContent = file.name;
        }

        if(content){
            content.disabled = false;
            content.placeholder = "Select a file to edit it.";
            content.value = file.content || "";
            content.focus();
        }

        if(saveBtn){
            saveBtn.disabled = false;
        }

    }

    renderFiles(
        document.getElementById("fileSearch")?.value || ""
    );

}


function openFile(file){

    selectEntry(file);

}


function createFile(){


    let name =
    prompt(
        "File name:"
    );


    if(!name)
    return;


    if(fileSystem.some(file => file.name === name)){
        alert("A file with that name already exists.");
        return;
    }


    fileSystem.push({

        name:name,

        type:"file",

        content:
        ""

    });


    saveFileSystem();

    openFile(fileSystem[fileSystem.length - 1]);

}


function createFolder(){


    let name =
    prompt(
        "Folder name:"
    );


    if(!name)
    return;


    if(fileSystem.some(file => file.name === name)){
        alert("A folder with that name already exists.");
        return;
    }


    fileSystem.push({

        name:name,

        type:"folder"

    });


    saveFileSystem();


    renderFiles(
        document.getElementById("fileSearch")?.value || ""
    );


}


function saveSelectedFile(){


    if(!selectedFileName)
    return;


    let { content } = getEditorElements();

    if(!content)
    return;


    let file = fileSystem.find(
        item => item.name === selectedFileName && item.type === "file"
    );


    if(!file)
    return;


    file.content = content.value;
    saveFileSystem();

}


function deleteSelectedFile(){


    if(!selectedFileName){
        alert("Select a file or folder first.");
        return;
    }


    if(!confirm(`Delete "${selectedFileName}"?`))
    return;


    fileSystem =
    fileSystem.filter(

        file =>
        file.name !== selectedFileName

    );


    saveFileSystem();
    clearEditor();
    renderFiles(
        document.getElementById("fileSearch")?.value || ""
    );


}


function deleteFile(){
    deleteSelectedFile();
}


function searchFiles(value){


    renderFiles(
        value
    );


}


window.addEventListener(

"load",

()=>{

    clearEditor();
    renderFiles();

}

);
