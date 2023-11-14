import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class SongService{
    //Genre
    private genreSource = new BehaviorSubject<string>('')
    currentGenre = this.genreSource.asObservable();
    //Number of Songs
    private songNumber = new BehaviorSubject<number>(1)
    currentSongNumber = this.songNumber.asObservable();
    //Number of Artists
    private artistNumber = new BehaviorSubject<number>(2)
    currentArtistNumber = this.artistNumber.asObservable();


    updateGenre(genre: string){
        this.genreSource.next(genre);
    }

    updateSongNumber(songs: number){
        this.songNumber.next(songs);
    }

    updateArtistNumber(artists: number){
        this.artistNumber.next(artists);
    }
}