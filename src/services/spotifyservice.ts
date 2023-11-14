

const getRecommendationsUrl = 'https://api.spotify.com/v1/recommendations';
const getArtistUrl = 'https://api.spotify.com/v1/artists/';
// add ons to the getArtistUrl after the Id
// get top tracks: '/top-tracks'
// get related artists: '/related-artists'
const getTrackUrl = 'https://api.spotify.com/v1/tracks/';


export class spotifyService {


// could potentially have one main "guess" method that incorporates all of these to generate the game

// method: getRecommendations
// needs to get the genres from user selection
// converts the genres into the correct string to make the API call
// needs to use the token in the call
// maps to array of artistIds




// method: chooseRandomArtist
// loops through array of artistIds and then selects a random artist
// helper method potentially

// method: getArtistTopTracks

// method: getRelatedArtists

}
