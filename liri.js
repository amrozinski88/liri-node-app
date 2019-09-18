const dotenv = require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const SpotifyAPI = require("node-spotify-api");
const keys = require("./keys.js");
const userInputArray = process.argv;
const fs = require("fs");


const spotify = new SpotifyAPI(keys.spotify)
const spotifyThis = (songName) => {
    spotify.search({
        type: "track",
        query: songName,
        limit: 1
    }).then(response => {
        const track = response.tracks.items[0];
        console.log(`----------------------------------------------`)
        console.log(`Artist: ${track.album.artists[0].name}`);
        console.log(`Song name is: ${track.name}`);
        console.log(`Here is a link to a preview ${track.external_urls.spotify}`);
        console.log(`Album name is: ${track.album.name}`);
        console.log(`----------------------------------------------`)
    }).catch(err => {
        console.log(error)
    });
}

const movieThis = (movieName) => {
    const queryURL = `http://www.omdbapi.com/?apikey=${keys.omdb.key}&t=${movieName}&type=movie`
    axios.get(queryURL).then(response => {
        const movie = response.data
        console.log(`----------------------------------------------`)
        console.log(`Movie Title: ${movie.Title}`);
        console.log(`Year Released: ${movie.Year}`);
        console.log(`IMDB Rating: ${movie.imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${movie.Ratings[1].Value}`);
        console.log(`Country Produced in: ${movie.Country}`);
        console.log(`Language: ${movie.Language}`);
        console.log(`Plot: ${movie.Plot}`);
        console.log(`Cast: ${movie.Actors}`);
        console.log(`----------------------------------------------`)
    })
        .catch(error => {
            console.log(error)
        })
}

const concertThis = (bandName) => {
    const queryURL = (`https://rest.bandsintown.com/artists/${bandName}/events?app_id=${keys.bands.id}`)
    axios.get(queryURL).then(response => {
        if(response.data.length) {
        response.data.map(event => {
            console.log(`----------------------------------------------`)
            console.log(`Venue name: ${event.venue.name}`)
            console.log(`Show location: ${event.venue.city}, ${event.venue.country}`)
            console.log(`Date of event ${moment(event.datetime).format(`MM/DD/YYYY`)}`)
        })
    }
        else{
            console.log(`No results found please try another artist`)
        }

    }).catch(error => console.log(error.response.data.errorMessage)
        
    )

}



switch (userInputArray[2]) {
    case "spotify-this-song":
        const query = userInputArray[3] ? userInputArray[3] : "Ace of base the sign"
        spotifyThis(query)
        break;

    case "movie-this":
        const movieQuery = userInputArray[3] ? userInputArray[3] : "Mr.Nobody."
        movieThis(movieQuery)
        break;

    case "concert-this":
        concertThis(userInputArray[3])
        break;

    case "do-what-it-says":
        fs.readFile("./random.txt", "utf8", (err, data) => {
            if (err) {
                throw (err)
            }
            const contentArray = data.split(",")
            switch (contentArray[0]) {
                case "spotify-this-song":
                    spotifyThis(contentArray[1])
                    break;
                case "movie-this":
                    movieThis(contentArray[1])
                    break;
                case "concert-this":
                    concertThis(contentArray[1].replace(/"/g,"").toLowerCase())
                    break;

            }
        })

    };
