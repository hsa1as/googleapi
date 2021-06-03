var PlaceSearch = require("./GooglePlaceSearch.js"); 
var config = require("./config.js"); 
var request = require("request"); 
var req =  require("sync-request");
var placeSearch = new PlaceSearch(config.apiKey, config.outputFormat); /
var write = require("./Write.js"); 
var fs = require("fs"); 
var writeToFile = new write(fs); 

var distances = [];
var i,j;
parameters = {
        location: [13.0823, 80.2754],
        types: "school",
        radius: 50000 
    };
placeSearch(parameters, function (error, response) {
        var length = Object.keys(response.results).length;
        if(error) throw error;
        for(i = 0; i < 10; i++){
           var dest = 'place_id:' + response.results[i].place_id; 
            for(j = i+1; j < 10; j++){
                var origin = 'place_id:' + response.results[j].place_id; 
                var url = config.distanceAPI +  dest + "&destinations=" + origin + "&key=" + config.apiKey; 
                /*request(url, function (err, result, body) {
                    if(err) throw err; // Throw ERROR if any
                    if (!error && result.statusCode == 200) {
                    var distancesElement = JSON.parse(body).rows; // This is the "rows" object in the JSON response
                    distances.push(distancesElement); //This pushes the "rows" object of each school returned
                    }
                });*/
                var res = req("GET", url); 
                console.log(res.getBody('utf8')); 
            }
        }
        writeToFile(distances);   // This Function passes the array to a file which writes it to a JSON file        
});
