import {Component, Input, OnInit} from '@angular/core';
import {Song} from "../songs-list.component";
import {Event} from "@tauri-apps/api/helpers/event";

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent implements OnInit {
  @Input() songData!: Song

  constructor() {
  }

  ngOnInit() {
  }

  public updateTitle(event: any): void {
    this.songData['title'] = event.target.value
  }
}
