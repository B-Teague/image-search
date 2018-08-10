// server.js
// where your node app starts

// init project
var express = require('express');
var GoogleSearch = require('google-search');
var url = require('url');
var googleSearch = new GoogleSearch({
  key: process.env.GSAPI,
  cx: process.env.GSCX
});
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/image-search", function (request, response) {
  let url_parts = url.parse(request.url, true);
  
  googleSearch.build({
  q: url_parts.query.text,
  start: url_parts.query.offset,
  searchType: "image",
  //fileType: "pdf",
  //gl: "en", //geolocation, 
  //lr: "lang_en",
  num: 10, // Number of search results to return between 1 and 10, inclusive 
  //siteSearch: "http://kitaplar.ankara.edu.tr/" // Restricts results to URLs from a specified site 
}, function(error, resp) {
  let results = resp.items.map(function(item){
    return { 
      url: item.link,
      snippet: item.snippet,
      thumbnail: item.image.thumbnailLink,
      context: item.image.contextLink
    };
  });
  response.send(results);
});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
