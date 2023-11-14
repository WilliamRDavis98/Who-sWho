export default interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

// maybe for the artists we get, we could use the get related artists so it is more difficult to pick
// maybe get random artists and if the genres property contains the selected genre then add
// could also set an ID for an artist within each genre, and then get related artists, and then choose random
// could also do a get reccomendations call, which incorporates the genres and gets an amount of tracks that are reccomended,
// then it loops through the sets of tracks, gets the artist ids and creates a an array of artist ids
// then selects one as random, and gets related artists for the score
// this way the user can test multiple genres
