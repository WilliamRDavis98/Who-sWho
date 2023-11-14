import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { Router } from '@angular/router';

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

  ngOnInit(): void {
    this.songData.currentGenre.subscribe(currentGenre => this.genre = currentGenre)
    this.songData.currentSongNumber.subscribe(currentSongNumber => this.songNumber = currentSongNumber)
    this.songData.currentArtistNumber.subscribe(currentArtistNumber => this.artistNumber = currentArtistNumber)
  }

  onSubmit(){
    this.router.navigateByUrl('/')
  }

}
