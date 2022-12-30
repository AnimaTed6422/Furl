// Furl 1.7

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    window.location.href = 'm.html';
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

function warn(){
    console.log("%cWARNING", "color: red; font-size: 250%");
    console.log("Entering code into this terminal can break things, ensure you know what you're doing when messing with the Console.");
}

warn();

function showLink(url){
    var box = document.getElementById('linkbox');
    box.src = url;
    box.innerHTML = "<p id=\"linktext\">" + truncateString(url, 20) + "</p> <img src=\"icons/copy.svg\" class=\"img\" title=\"Copy\" onclick=\"copy(document.getElementById('linkbox').src)\">";
    box.style.display = "block";
}

function selectFile(){
    var inp = document.createElement('input');
    inp.type = 'file';
    inp.click();
    inp.onchange = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        /*
        // Checks if the file selected is text, but doesn't work with custom text formats.
        if(!file.type.startsWith("text/")){
            var box = document.getElementById('linkbox');
            box.innerHTML = "<p class=\"err\">The file selected is not a text format</p>";
            box.style.display = "block";
            return;
        }*/
        reader.readAsText(file, "UTF-8");
        reader.onload = (e) => {
            var content = e.target.result;
            var data = {
                "name": file.name,
                "data": content
            };
            var url = "http://furl-fs.netlify.app/share.html#" + encodeURI(btoa(JSON.stringify(data)));
            showLink(url);
        }
    }
}