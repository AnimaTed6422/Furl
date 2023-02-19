var data;

function err(){
    // Curtosy of: https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
    document.title = "This URL is invalid - Furl";
    document.write("<link rel=\"stylesheet\" href=\"style.css\">"
    + "<h1 class=\"download\">oops.</h1><br>"
    + "<h3 class=\"desc\">This URL is invalid.</h3><br>"
    + "<p class=\"linkwrap\"><a class=\"link\" href=\"index.html\">Home</a></p>");
    document.close();
}

function download(data){
    var file = new Blob([data.data], { type: 'text/plain' });
    window.URL = window.URL || window.webkitURL;
    link.setAttribute("href", window.URL.createObjectURL(file));
    link.setAttribute("download", data.name);
    link.click();
    document.getElementById('bton').style.display = 'none';
    document.getElementById("downloadText").innerText = "Downloaded";
}

if(window.location.hash == "" || window.location.hash == "#"){
    document.body.removeChild(document.getElementById("downloadText"));
    document.body.removeChild(document.getElementById("bton"));
    err();
} else {
    var link = document.createElement('a');
    var content = decodeURI(window.location.hash.substring(1));
    var isBase64 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    if(!isBase64.test(content)){
        err();
        //throw new Error("URL is invalid");
    }
    data = JSON.parse(atob(content));
    document.title = `Downloading ${data.name}`;
    document.getElementById('bton').innerText += " " + data.name;
    //download(data);
    document.getElementById("downloadText").innerText = "Download Ready";
    document.getElementById("link").onclick = (e) => { download(data); }
}