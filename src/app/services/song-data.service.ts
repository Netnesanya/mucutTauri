import { Injectable } from '@angular/core';

export type SongDataFetched = {
  duration: number
  duration_string: string
  heatmap: Array<{end_time: number, start_time: number, value: number}>
  original_url: string
  title: string
  userInput?: {
    checked?: boolean;
    from?: number | string;
    to?: number | string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SongDataService {

  public songsData: SongDataFetched[] = [];
  constructor() { }
}
