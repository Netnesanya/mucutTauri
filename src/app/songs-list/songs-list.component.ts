import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {SongComponent} from "./song/song.component";
import { SongDataService} from "../services/song-data.service";

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
export class SongsListComponent implements OnInit{

  constructor(
      public songDataService: SongDataService
  ) {
  }

  ngOnInit() {
    // this.songsList.
  }
}
