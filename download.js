var data;

function err(){
    // Curtosy of: https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
    document.title = "This URL is invalid - Furl";
    document.write("<link rel=\"stylesheet\" href=\"style.css\">"
    + "<h1 class=\"download\">oops.</h1>"
    + "<h3 class=\"desc\">This URL is invalid.</h3>"
    + "<p class=\"linkwrap\"><a class=\"link\" href=\"index.html\">Home</a></p>");
    document.close();
}

async function download(data){
    filehandle = await window.showSaveFilePicker({
        suggestedName: data.name
    });
    let stream = await filehandle.createWritable();
    await stream.write(data.data);
    await stream.close();
}

if(window.location.hash == "" || window.location.hash == "#"){
    document.getElementById("downloadText").remove();
    document.getElementById("bton").remove();
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
    document.getElementById("bton").onclick = (e) => { download(data); };
}