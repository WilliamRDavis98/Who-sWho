import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Artist } from 'src/models/ArtistsIdByGenre';

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

    private artistId = new BehaviorSubject<string>('')
    currentArtistId = this.artistId.asObservable();

    private globalToken = new BehaviorSubject<string>('')
    currentGlobalToken = this.globalToken.asObservable();

    updateGenre(genre: string){
        this.genreSource.next(genre);
    }

    updateSongNumber(songs: number){
        this.songNumber.next(songs);
    }

    updateArtistNumber(artists: number){
        this.artistNumber.next(artists);
    }

    updateArtistId(id:string){
        this.artistId.next(id);
    }

    updateGlobalToken(tokenInsert:string){
        this.globalToken.next(tokenInsert)
    }
}
