import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SongService } from '../song.service';
import { Router } from '@angular/router';
import fetchFromSpotify, { request } from "../../services/api";

const AUTH_ENDPOINT = "https://accounts.spotify.com/api/token";
const TOKEN_KEY = "whos-who-access-token";
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css']
})
export class GuessComponent implements OnInit {


  constructor(private songData: SongService, private router: Router) { }

  genre: string = ''
  songNumber: number = 1
  artistNumber: number = 2
  artistId: string = '';
  artistId2: string = '0TnOYISbd1XYRBk9myaseg';
  artistName1: string = '';
  authLoading: boolean = false;
  configLoading: boolean = false;
  enableAutoplay: boolean = false;
  guessCount: number = 2;
  token: string = "";
  songs: string[] = [];
  artists: string[] = []
  artistsPic: string[] = [];
  //song1Url: string = "https://p.scdn.co/mp3-preview/6ce4a46d375c652e30658e8f51fcdc1e997bbf1f?cid=c4199e9be8874c78b1199eea6593dad4";
  song1 = new Howl({
    src: ["https://p.scdn.co/mp3-preview/6ce4a46d375c652e30658e8f51fcdc1e997bbf1f?cid=c4199e9be8874c78b1199eea6593dad4"],
    html5: true,
    volume: .5
  });
  song2 = new Howl({ src: '' })
  song3 = new Howl({ src: '' })


  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['artistId'] && changes['artistId'].currentValue) {
    //   this.getArtist(this.token, changes['artistId'].currentValue);
    // }
  }

  ngOnInit(): void {

    // this.authLoading = true;
    // const storedTokenString = localStorage.getItem(TOKEN_KEY);
    // if (storedTokenString) {
    //   const storedToken = JSON.parse(storedTokenString);
    //   if (storedToken.expiration > Date.now()) {
    //     console.log("Token found in localstorage");
    //     this.authLoading = false;
    //     this.token = storedToken.value;
    //     return;
    //   }
    // }else{
    // console.log("no token in local storage");}
    // request(AUTH_ENDPOINT,
    //   {
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //     method: 'POST',
    //     body: new URLSearchParams({
    //       'grant_type': 'client_credentials',
    //       'client_id': '332232eda2814f0f8c5e213dfb3ef5b2',
    //       'client_secret': '2364f60b3c6c483a8df359f46b5c2181'
    //     })
    //   }
    // ).then(({ access_token, expires_in }) => {
    //   const newToken = {
    //     value: access_token,
    //     expiration: Date.now() + (expires_in - 20) * 1000,
    //   };
    //   localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
    //   this.authLoading = false;
    //   this.token = newToken.value;
    // });

    this.setUpBoard()
    this.setUpGame()




  }



  setUpBoard() {
    this.songData.currentGlobalToken.subscribe(currentGlobalToken => this.token = currentGlobalToken)
    this.songData.currentGenre.subscribe(currentGenre => this.genre = currentGenre)
    this.songData.currentSongNumber.subscribe(currentSongNumber => this.songNumber = currentSongNumber)
    this.songData.currentArtistNumber.subscribe(currentArtistNumber => this.artistNumber = currentArtistNumber)
    this.guessCount = this.artistNumber - 1
    this.songData.currentArtistId.subscribe(currentArtistId => this.artistId = currentArtistId);
  }

  loadSongs = async (t: any, artistId: string, songNumber: number) => {
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "artists/" + artistId + "/top-tracks?market=US",
    });
    console.log('checking songs for artist ' + artistId)
    let alreadyThere: number[] = []
    let j = 0

    this.songs = []
    for (let i = 0; i < songNumber; i++) {
      let random: number = Math.floor(Math.random() * response.tracks.length)
      console.log("i is " + i)

      if (!alreadyThere.includes(random)) {
        if (response.tracks[random].preview_url != null && response.tracks[random].preview_url != undefined) {
          this.songs.push(response.tracks[random].preview_url);
          console.log('A song pushed')
          alreadyThere.push(random)
          console.log('already there is [' + alreadyThere + ']')
        } else {
          console.log('no preview url')
          alreadyThere.push(random)
          console.log('already there is [' + alreadyThere + ']')
          i--
        }

      } else if (alreadyThere.length != 10) {
        --i
      }

    }
    //console.log(response.tracks)
    console.log('Here are the song preview urls')
    console.log(this.songs)

    if(this.songs.length != this.songNumber){
      console.log('Not enough songs')
      this.resetGame()
      return 'sorry'
    }




    if (this.songNumber >= 1) {
      this.song1 = new Howl({
        src: [this.songs[0]],
        html5: true,
        volume: .5
      });
    }
    if (this.songNumber >= 2) {
      this.song2 = new Howl({
        src: [this.songs[1]],
        html5: true,
        volume: .5
      })
    }
    if (this.songNumber >= 3) {
      this.song3 = new Howl({
        src: [this.songs[2]],
        html5: true,
        volume: .5
      });

    }


    return this.artistId
  };

  getRelatedArtists = async (t: any, artistId: string, artistNumber: number) => {
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "artists/" + artistId + "/related-artists",
    });

    for (let i = 0; i < artistNumber; i++) {
      this.artists.push(response.artists[i].name)
      this.artistsPic.push(response.artists[i].images[response.artists[i].images.length - 1].url)
    }
    //console.log(this.artists);
  }

  randomizeArtists = async (t: any, artistId: string) => {
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "artists/" + artistId + "/related-artists",
    });

    let random: number = Math.floor(Math.random() * response.artists.length)
    this.artistId = response.artists[random].id
    console.log("Random id generated: " + this.artistId)
    return this.artistId

    //console.log(this.artists);
  }


  getArtist = async (t: any, artistId: string) => {
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "artists/" + artistId,
    });
    this.artists.push(response.name);
    this.artistName1 = response.name;
    this.artistsPic.push(response.images[response.images.length - 1].url)
    console.log('the artist pics are ' + this.artistsPic)
    //console.log(this.artistName1)
    return artistId
  }

  setUpGame() {
    this.randomizeArtists(this.token, this.artistId)
      .then((artistId) => this.getArtist(this.token, artistId))
      .then(artistId => this.loadSongs(this.token, artistId, this.songNumber))
      .then(artistId => this.getRelatedArtists(this.token, artistId, this.artistNumber))


  }

  resetGame(){
    this.setUpBoard()
    this.setUpGame()
  }

  returnHome() {
    this.songs = []
    this.artists = []
    // doing this to clear out the data to start a new game
    this.router.navigateByUrl('/')
  }

  toggleSong(currentSong: Howl) {
    if (currentSong.playing()) {
      currentSong.pause()
    } else {
      currentSong.play()
    }
  }

  incrementVolume(currentSong: Howl) {
    currentSong.volume(currentSong.volume() + .1)
    console.log(currentSong.volume())
  }

  decrementVolume(currentSong: Howl) {
    currentSong.volume(currentSong.volume() - .1)
    console.log(currentSong.volume())
  }






}
