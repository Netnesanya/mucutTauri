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

  constructor() {
  }

  ngOnInit() {
  }

  public updateTitle(event: any): void {
    this.songData['title'] = event.target.value
  }

  public remove(event: any): void {
    event.preventDefault()
    this.removeSong.emit(this.songData)
    // Remove the song from the parent component
  }
}
