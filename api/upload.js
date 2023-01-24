const querystring = require("querystring");

exports.handler = async (event, context) => {
  if(event.httpMethod !== "POST"){
     let output = {
      message: "POST is the required HTTP Protocol",
      docsUrl: "https://furl-fs.netlify.app/docs/upload",
      request: event.body
    };
    return {
      statusCode: 405,
      body: JSON.stringify(output);
    }
  }
  
  const params = querystring.parse(event.body);
  if(!("name" in params) || !("data" in params)){
    let output = {
      message: "You must pass \"name\" and \"data\" in the parameters",
      docsUrl: "https://furl-fs.netlify.app/docs/upload"
    };
    return {
      statusCode: 422,
      body: JSON.stringify(output)
    }
  }
  let filename = params.name;
  let content = params.data;
  let data = {
    "name": filename,
    "data": content
  };
  let id = encodeURIComponent(Buffer.from(JSON.parse(data).toString('base64')));
  let url = "https://furl-fs.netlify.app/share#" + id;
  let apiurl = "https://furl-fs.netlify.app/.netlify/functions/download?id=" + id;
  let output = {
    "url": url,
    "ApiURL": apiurl,
    "request": event.body
  };
  return {
    statusCode: 200,
    body: JSON.stringify(output)
  }
}
