import { Component, OnInit } from "@angular/core";
import fetchFromSpotify, { request } from "../../services/api";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SongService } from "../song.service";
import { Router } from "@angular/router";
import {Rock, Country, Pop, HipHop, Classical, Electronic, Jazz,album} from "../../models/ArtistsIdByGenre"

interface Artist {

}


const AUTH_ENDPOINT = "https://accounts.spotify.com/api/token";
// "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private songData: SongService, private router: Router) { }

  genres: String[] = ["Rock", "Country", "Pop", "HipHop", "Classical", "Electronic","Jazz"]
  selectedGenre: string = "";
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: string = "";
  artistId: string = "";




  homeForm: FormGroup = new FormGroup({
    genre: new FormControl<string | undefined>(undefined,[Validators.required]),
    selectedSongNumbers: new FormControl<number>(1),
    selectedArtistNumbers: new FormControl<number>(2)
  })


  ngOnInit(): void {


    //Will's Code
    let songstorage:number = Number(localStorage.getItem("storageSongNumber"))
    console.log(Number(localStorage.getItem("storageArtistNumber")))
    
    this.songData.currentGenre.subscribe(
      (currentGenre) => this.selectedGenre)

    this.songData.currentGenre.subscribe(
      (currentGenre) => this.homeForm.patchValue({ genre: currentGenre })
    )

    this.songData.currentSongNumber.subscribe(
      (currentSongNumber) => this.homeForm.patchValue({ selectedSongNumbers: currentSongNumber })
    )

    this.songData.currentArtistNumber.subscribe(
      (currentArtistNumber) => this.homeForm.patchValue({ selectedArtistNumbers: currentArtistNumber })
    )
if(localStorage.getItem("storageSongNumber") != null && localStorage.getItem("storageArtistNumber") != null){
  this.songData.updateSongNumber(
    songstorage
  );
  this.songData.updateArtistNumber(
    Number(localStorage.getItem("storageArtistNumber"))
  )
  
}

    //Un comment this

    //this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        // this.loadGenres(storedToken.value);
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
      console.log("A new token was generated")
      //this.loadGenres(newToken.value);
    });

}


  loadRecommendations = async (t: any, genre: string) => {
    this.configLoading = true;
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "recommendations?limit=1&market=US&seed_genres=" + genre,
      params: ""    //limit=3&market=US&seed_genres=classical
    });
    this.configLoading = false;
    this.artistId = response.tracks[0].artists[0].id
    this.songData.updateArtistId(
      this.artistId
    )
  };

  loadGenres = async (t: any) => {
    this.configLoading = true;
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "recommendations/available-genre-seeds",
    });
    console.log(response);
    this.genres = response.genres;
    this.configLoading = false;
  };

  setGenre(selectedGenre: any) {
    this.selectedGenre = selectedGenre;
    console.log(this.selectedGenre);
  }

  randomElement(array:string[]){
    console.log("The First id is: " + array[(Math.floor(Math.random() * array.length))])
    return array[(Math.floor(Math.random() * array.length))];
  }



  onSubmit() {
    this.songData.updateGenre(
      this.homeForm.controls['genre'].value
    );
    this.songData.updateSongNumber(
      this.homeForm.controls['selectedSongNumbers'].value
    );
    this.songData.updateArtistNumber(
      this.homeForm.controls['selectedArtistNumbers'].value
    )
    this.songData.updateGlobalToken(
      this.token
    )

    localStorage.setItem("storageSongNumber",this.homeForm.controls['selectedSongNumbers'].value.toString())
    localStorage.setItem("storageArtistNumber",this.homeForm.controls['selectedArtistNumbers'].value.toString())

    // this.authLoading = true;
    // const storedTokenString = localStorage.getItem(TOKEN_KEY);
    // if (storedTokenString) {
    //   const storedToken = JSON.parse(storedTokenString);
    //   if (storedToken.expiration > Date.now()) {
    //     console.log("Token found in localstorage");
    //     this.authLoading = false;
    //     this.token = storedToken.value;
    //     this.loadRecommendations(this.token, this.selectedGenre)
    //     this.router.navigateByUrl('/guess')
    //     return;
    //   }

    let key = this.selectedGenre as keyof typeof album;

    this.artistId = this.randomElement(album[key])
    this.songData.updateArtistId(
      this.artistId
    )
    console.log('the token is ' + this.token)

    this.router.navigateByUrl('/guess')
    }


    // console.log(this.songData.currentGenre)
    // console.log(this.songData.currentArtistNumber)
    // console.log(this.songData.currentSongNumber)

    




  }







//response.tracks[0].artists[0].id

//'https://api.spotify.com/v1/recommendations?limit=1&market=US&seed_genres=classical'
