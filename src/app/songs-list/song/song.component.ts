import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SongDataFetched} from "../../services/song-data.service";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-song',
    standalone: true,
    imports: [
        NgIf
    ],
    templateUrl: './song.component.html',
    styleUrl: './song.component.css'
})
export class SongComponent implements OnInit {
    @Output() removeSong = new EventEmitter<SongDataFetched>();


    @Input() songData!: SongDataFetched

    public temporaryUrl = ''

    constructor() {
    }

    ngOnInit() {
    }

    public updateTitle(event: any): void {
        this.songData['title'] = event.target.value
    }

    public insertOriginalUrl(event: any): void {
        this.temporaryUrl = event.target.value
    }

    public addUlr(): void {
        this.songData['original_url'] = this.temporaryUrl
    }

    public remove(event: any): void {
        event.preventDefault()
        this.removeSong.emit(this.songData)
    }
}
