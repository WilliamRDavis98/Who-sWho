import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { Router } from '@angular/router';
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
  }

  onSubmit(){
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
