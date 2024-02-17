import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {SongComponent} from "./song/song.component";
import {SongDataFetched, SongDataService} from "../services/song-data.service";

@Component({
    selector: 'app-songs-list',
    standalone: true,
    imports: [
        NgForOf,
        SongComponent
    ],
    templateUrl: './songs-list.component.html',
    styleUrl: './songs-list.component.css'
})
export class SongsListComponent implements OnInit {

    constructor(
        public songDataService: SongDataService
    ) {
    }

    ngOnInit() {
        // this.songsList.
    }

    public removeSong(songToRemove: SongDataFetched): void {
        this.songDataService.songsData = this.songDataService.songsData.filter(song => song !== songToRemove);
        console.log(this.songDataService.songsData);
    }

    public createEmptySongField(event: Event) {
        this.songDataService.songsData.push({ // Use push for simplicity
            title: '',
            original_url: '',
            duration: 0,
            duration_string: '',
            heatmap: []
        });
    }

    // Optional: trackBy function for *ngFor
    trackByIndex(index: number, item: any): number {
        return index;
    }
}
