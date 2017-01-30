var PlaceSearch = require("./GooglePlaceSearch.js"); // This is the file which makes the HTTP request to Google to search for schools
var config = require("./config.js"); // This file contains the variables required.
var request = require("request"); // Makes HTTP requests
var req =  require("sync-request"); // Makes Synchronous http requests , my sister wanted this, idk why
var placeSearch = new PlaceSearch(config.apiKey, config.outputFormat); // Creating object of GooglePlaceSearch 
var write = require("./Write.js"); // Linking file which writes data to file
var fs = require("fs"); // Filesystem library
var writeToFile = new write(fs); // Making a filesystem object

var distances = [];
var i,j;
parameters = {
        location: [13.0823, 80.2754],
        types: "school",
        radius: 50000 
    }; // These are the paramenters. Location gives Google the coordinates of Chennai Central, radius will define radius in which to find schools
placeSearch(parameters, function (error, response) {
        var length = Object.keys(response.results).length;
        if(error) throw error;
        for(i = 0; i < 10; i++){
           var dest = 'place_id:' + response.results[i].place_id; // Making a string containing the destination (School)
            for(j = i+1; j < 10; j++){
                var origin = 'place_id:' + response.results[j].place_id; // String containing the Origin
                var url = config.distanceAPI +  dest + "&destinations=" + origin + "&key=" + config.apiKey; // Making the API request URL
                /*request(url, function (err, result, body) {
                    if(err) throw err; // Throw ERROR if any
                    if (!error && result.statusCode == 200) {
                    var distancesElement = JSON.parse(body).rows; // This is the "rows" object in the JSON response
                    distances.push(distancesElement); //This pushes the "rows" object of each school returned
                    }
                });*/
                var res = req("GET", url); // sister why
                console.log(res.getBody('utf8')); // Here you go you forgot encryption you dumbnut
            }
        }
        writeToFile(distances);   // This Function passes the array to a file which writes it to a JSON file        
});