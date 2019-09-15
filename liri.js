const dotenv = require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const SpotifyAPI = require("node-spotify-api");
const spotifyKey = require("./keys.js");
const userInputArray = process.argv;

const spotify = new SpotifyAPI(spotifyKey.spotify)
switch (userInputArray[2]) {
    case "spotify-this-song":
        const query = userInputArray[3] ? userInputArray[3]: "Ace of base the sign"
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


};

