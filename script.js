// Furl 1.7
var url;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    window.location.href = 'm.html';
}

function ShowSnack() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  } 

function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
}

function copy(text){
    navigator.clipboard.writeText(text);
}

function error(message){
    var err = document.getElementById('err');
    err.innerText = message;
    err.style.display = "block";
}

function warn(){
    console.log("%cWARNING", "color: red; font-size: 250%");
    console.log("Entering code into this terminal can break things, ensure you know what you're doing when messing with the Console.");
}

warn();

function showLink(){
    var box = document.getElementById('linkbox');
    //box.src = url;
    document.getElementById('lh').style.display = "flex";
    box.innerHTML = "<p id=\"linktext\">" + truncateString(url, 40) + "</p>";
    box.onclick = (e) => {
        copy(url);
        ShowSnack();
    }
    box.title = "Click to Copy";
    box.style.display = "block";
}

async function selectFile(){
    let [filehandle] = await window.showOpenFilePicker();
    let file = await filehandle.getFile();
    let reader = new FileReader();
    reader.onload = (e) => {
        var content = e.target.result;
        var data = {
            "name": file.name,
            "data": content
        };
        url = "http://furl-fs.netlify.app/share#" + encodeURI(btoa(JSON.stringify(data)));
        showLink();
    }
    reader.readAsText(file);
}