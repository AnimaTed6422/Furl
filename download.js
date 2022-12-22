function err(){
    window.alert("Error");
}

function download(data){
    var file = new Blob([data.data], { type: 'text/plain' });
    window.URL = window.URL || window.webkitURL;
    link.setAttribute("href", window.URL.createObjectURL(file));
    link.setAttribute("download", data.name);
    link.click();
}

if(window.location.hash == "#"){
    err();
} else {
    var link = document.createElement('a');
    var content = decodeURI(window.location.hash.substring(1));
    var data = JSON.parse(atob(content));
    document.title = document.title.replace("{file}", data.name);
    download(data);
    document.getElementById("downloadText").innerHTML = "Downloaded. If your download hasn't started, Click <a id=\"link\" href=\"#\">Here</a>";
    document.getElementById("link").onclick = (e) => { download(data); }
}