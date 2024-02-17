import {Component, Input, OnInit} from '@angular/core';
import {SongDataFetched} from "../../services/song-data.service";

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent implements OnInit {
  @Input() songData!: SongDataFetched

  constructor() {
  }

  ngOnInit() {
  }

  public updateTitle(event: any): void {
    this.songData['title'] = event.target.value
  }
}
