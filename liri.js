const dotenv = require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const SpotifyAPI = require("node-spotify-api");
const spotifyKey = require("./keys.js");
const userInputArray = process.argv;

const spotify = new SpotifyAPI(spotifyKey.spotify)
switch (userInputArray[2]) {
    case "spotify-this-song":
        spotify.search({
            type: "track",
            query: userInputArray[3],
            limit: 1
        }).then(response => {
            console.log(response)
            const track = response.tracks.items[0];
            console.log("Artist: "+ track.album.artists[0].name)
        })


        break;


};

