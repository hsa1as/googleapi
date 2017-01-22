(function(){
    module.exports = function(fs){
        return function(distances){
            fs.writeFile('distances.json', distances, (err) => {
                if (err) throw err;
                console.log('It\'s saved!');
            }); // This function writes the data to a file "distances.json"

        };
    };
})();