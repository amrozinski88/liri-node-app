const dotenv = require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const SpotifyAPI = require("node-spotify-api");
const keys = require("./keys.js");
const userInputArray = process.argv;
const fs = require("fs")


const spotify = new SpotifyAPI(keys.spotify)
switch (userInputArray[2]) {
    case "spotify-this-song":
        const query = userInputArray[3] ? userInputArray[3] : "Ace of base the sign"
        spotify.search({
            type: "track",
            query: query,
            limit: 1
        }).then(response => {
            const track = response.tracks.items[0];
            console.log(`Artist: ${track.album.artists[0].name}`);
            console.log(`Song name is: ${track.name}`)
            console.log(`Here is a link to a preview ${track.external_urls.spotify}`)
            console.log(`Album name is: ${track.album.name}`)
        })

        break;

    case "movie-this":
        const movieQuery = userInputArray[3] ? userInputArray[3] : "Mr.Nobody."
        const queryURL = `http://www.omdbapi.com/?apikey=${keys.omdb.key}&t=${movieQuery}&type=movie`
        axios.get(queryURL).then(response => {
            console.log(response.data)
            const movie = response.data
            console.log(`Movie Title: ${movie.Title}`);
            console.log(`Year Released: ${movie.Year}`);
            console.log(`IMDB Rating: ${movie.imdbRating}`);
            console.log(`Rotten Tomatoes Rating: ${movie.Ratings[1].Value}`);
            console.log(`Country Produced in: ${movie.Country}`);
            console.log(`Language: ${movie.Language}`);
            console.log(`Plot: ${movie.Plot}`);
            console.log(`Cast: ${movie.Actors}`);
        })
        .catch(error =>{
            console.log(error)
        })
        break;
    case "do-what-it-says":
        fs.readFile("./random.txt","utf8",(err,data)=>{
            if(err){
                throw(err)
            }
            const contentArray = data.split(",")
            console.log(contentArray)

            
            
        })
};
