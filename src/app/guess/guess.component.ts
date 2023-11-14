import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { Router } from '@angular/router';
import fetchFromSpotify, { request } from "../../services/api";

const AUTH_ENDPOINT = "https://accounts.spotify.com/api/token";
const TOKEN_KEY = "whos-who-access-token";

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
  token: string = "";

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
    this.configLoading = true;
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "artists/" + artistId + "/top-tracks",
      params: ""    //limit=3&market=US&seed_genres=classical
    });
    this.configLoading = false;
    console.log("making call")
    console.log(response)

  };


  returnHome(){
    this.router.navigateByUrl('/')
  }

}
