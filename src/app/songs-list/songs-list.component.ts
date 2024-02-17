import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {SongComponent} from "./song/song.component";

export interface Song {
  [key: string]: any
}

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

  public songsList: Song[] = [
    {title: 'asda', length: '12:12', mostPlayed: {}},
    {title: 'asdasda', length: '22:42', mostPlayed: {}},
    {title: 'DDDDDasda', length: '3:22', mostPlayed: {}},
  ]

  constructor() {
  }

  ngOnInit() {
    // this.songsList.
  }
}
