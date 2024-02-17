import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SongDataFetched} from "../../services/song-data.service";
import {NgClass, NgIf} from "@angular/common";
import {HttpService} from "../../http.service";
import {DISABLED, LOADING, READY} from "../../header/header.component";

@Component({
    selector: 'app-song',
    standalone: true,
    imports: [
        NgIf,
        NgClass
    ],
    templateUrl: './song.component.html',
    styleUrl: './song.component.css'
})
export class SongComponent implements OnInit {
    @Output() removeSong = new EventEmitter<SongDataFetched>();

    @Input() songData!: SongDataFetched

    public temporaryUrl = ''
    public updateButtonStatus = DISABLED

    constructor(private http: HttpService) {
    }

    ngOnInit() {
    }

    public updateTitle(event: any): void {
        this.songData['title'] = event.target.value
    }

    public insertOriginalUrl(event: any): void {
        this.temporaryUrl = event.target.value
    }

    public updateSong(event: any): void {
        event.preventDefault()

        this.http.updateMp3Metadata({...this.songData, original_url: this.temporaryUrl})
            .subscribe(data => {
            this.songData = data as SongDataFetched
        }), (error: Error) => {
            console.error('Error updating mp3 metadata:', error)
        }
    }

    public remove(event: any): void {
        event.preventDefault()
        this.removeSong.emit(this.songData)
    }

    protected readonly READY = READY;
    protected readonly LOADING = LOADING;
}
