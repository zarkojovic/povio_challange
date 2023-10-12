
//Image uploader
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imgView = document.getElementById("img-view");

inputFile.addEventListener("change", uploadImage);

function uploadImage(){

    console.log("change");
    
    let imgLink = URL.createObjectURL(inputFile.files[0]);
    imgView.style.backgroundImage = `url(${imgLink})`;
    imgView.textContent = "";
    imgView.style.border = 0;
}

dropArea.addEventListener("dragover", function(e){
    e.preventDefault();
});

dropArea.addEventListener("drop", function(e){
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
});




// Add components
let containerDiv = document.getElementById('container');

let textButton = document.getElementById('text');
let imageButton = document.getElementById('image');
let codeButton = document.getElementById('code');

textButton.addEventListener('click', addTextbox);

//const textBox = <div class="text-container"><textarea id="textbox"></textarea></div>;




function addTextbox() {

    console.log("click");
    //document.appendChild(textBox);
    
}

// Remove text box

let textbox = document.getElementById('textbox');
let deleteTextboxBtn = document.getElementById('delete-text');

deleteTextboxBtn.addEventListener("click", deleteTextbox);

function deleteTextbox() {
    console.log("delete textbox")
    textbox.remove();
    deleteTextboxBtn.remove();
}

// Remove Image
let imagebox = document.getElementById('drop-area');
let deleteImageboxBtn = document.getElementById('delete-image');
let hero = document.getElementsByClassName("hero");

deleteImageboxBtn.addEventListener("click", deleteImageBox);

function deleteImageBox() {
    console.log("delete imagebox")
    imagebox.remove();
    
}

// Remove code

let codebox = document.getElementById('codebox');
let deleteCodeboxBtn = document.getElementById('delete-code');

deleteCodeboxBtn.addEventListener("click", deleteCodeBox);

function deleteCodeBox() {
    console.log("delete codeebox")
    codebox.remove();
    deleteCodeboxBtn.remove();
    
}
