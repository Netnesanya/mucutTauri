import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {SongComponent} from "./song/song.component";
import {SongDataFetched, SongDataService} from "../services/song-data.service";
import {DISABLED, LOADING, READY} from "../header/header.component";
import {HttpService} from "../http.service";

@Component({
    selector: 'app-songs-list',
    standalone: true,
    imports: [
        NgForOf,
        SongComponent,
        NgClass
    ],
    templateUrl: './songs-list.component.html',
    styleUrl: './songs-list.component.css'
})
export class SongsListComponent implements OnInit {

    public updateButtonStatus: string = DISABLED

    constructor(
        public songDataService: SongDataService,
        public http: HttpService
    ) {
    }

    ngOnInit() {
    }

    public removeSong(songToRemove: SongDataFetched): void {
        this.songDataService.songsData = this.songDataService.songsData.filter(song => song !== songToRemove);
    }

    public createEmptySongField(event: Event) {
        this.updateButtonStatus = READY
        this.songDataService.songsData.push({
            title: '',
            original_url: '',
            duration: 0,
            duration_string: '',
            heatmap: [],
            userInput: {
                checked: true
            }
        });
    }

    public handleUpdateButton(event: Event) {
        if (this.updateButtonStatus === READY) {
            event.preventDefault()
            this.updateButtonStatus = LOADING

            this.http.updateMp3MetadataBulk(this.songDataService.songsData
                .filter(song => song.userInput?.checked))
                .subscribe(data => {
                    this.songDataService.songsData = data as SongDataFetched[]
                    this.updateButtonStatus = READY
                }), ((error: Error) => {
                this.updateButtonStatus = READY
                console.error(error)
            })
        }
    }

    public removeAll() {
        this.songDataService.songsData = []
    }

    protected readonly READY = READY;
    protected readonly LOADING = LOADING;
}
