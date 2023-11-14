import { Component, OnInit } from '@angular/core';
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

  constructor(private songData: SongService, private router: Router) {}

  genre: string = ''
  songNumber: number = 1
  artistNumber: number = 2
  artistId: string = ''
  authLoading: boolean = false;
  configLoading: boolean = false;
  enableAutoplay: boolean = false;
  token: string = "";
  songs: string[] = [];
  // song1Url: string = "https://p.scdn.co/mp3-preview/6eafa4293d2b35b2e75ffab5ec1bba8ec00d5082?cid=0442ccff46ef47b981dd1b4e13eb8a4d";
  song1 = new Howl({
    src: ['https://p.scdn.co/mp3-preview/c590292029e985515f7063e8d5d291d677694eb9?cid=c4199e9be8874c78b1199eea6593dad4'],
    html5 :true,
    volume: .5
  });

  ngOnInit(): void {
    this.songData.currentGenre.subscribe(currentGenre => this.genre = currentGenre)
    this.songData.currentSongNumber.subscribe(currentSongNumber => this.songNumber = currentSongNumber)
    this.songData.currentArtistNumber.subscribe(currentArtistNumber => this.artistNumber = currentArtistNumber)
    this.songData.currentArtistId.subscribe(currentArtistId => this.artistId = currentArtistId)


    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        body: new URLSearchParams({
          'grant_type': 'client_credentials',
          'client_id': '332232eda2814f0f8c5e213dfb3ef5b2',
          'client_secret': '2364f60b3c6c483a8df359f46b5c2181'
        })
      }
    ).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      this.authLoading = false;
      this.token = newToken.value;
    });

  }

  loadSongs = async (t: any, artistId: string, songNumber: number) => {
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "/artists/" + artistId + "/top-tracks?market=US",
    });
    console.log(response)
    let songsArray = [];
    for (let i = 0; i < songNumber; i++) {
      songsArray.push(response.tracks[0].id);
    }
    console.log(songsArray)
    return songsArray;

  };




  returnHome(){
    this.router.navigateByUrl('/')
  }
  
  toggleSong(currentSong: Howl){
    if(currentSong.playing()){
      currentSong.pause()      
    }else{
      currentSong.play()
    }
  }

  incrementVolume(currentSong: Howl){
    currentSong.volume(currentSong.volume() + .1)
    console.log(currentSong.volume())
  }

  decrementVolume(currentSong: Howl){
    currentSong.volume(currentSong.volume() - .1)
    console.log(currentSong.volume())
  }

}
