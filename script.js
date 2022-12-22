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
    box.innerHTML = "<p id=\"linktext\">" + truncateString(url, 20) + "</p> <img aria-label=\"Copy\" src=\"icons/copy.svg\" class=\"img\" onclick=\"copy(document.getElementById('linkbox').src)\">";
    box.style.display = "block";
}

function selectFile(){
    var inp = document.createElement('input');
    inp.type = 'file';
    inp.click();
    inp.onchange = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
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