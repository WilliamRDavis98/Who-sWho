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
