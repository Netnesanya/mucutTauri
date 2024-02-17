import {Injectable} from '@angular/core';
import {env} from "../env/env";
import {HttpClient} from "@angular/common/http";
import {CombinedSongData, SongDataFetched} from "./services/song-data.service";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private readonly apiUrl: string = env.apiUrl;

    private readonly fetchVideoInfoUrl = this.apiUrl + 'fetch-video-info';
    private readonly downloadMp3BulkUrl = this.apiUrl + 'download-mp3-bulk';

    constructor(private http: HttpClient) {
    }

    public fetchVideoInfo(txt: FormData) {
        return this.http.post(this.fetchVideoInfoUrl, txt);
    }

    public downloadMp3Bulk(metadata: CombinedSongData[]) {
        console.log(metadata);
        return this.http.post(this.downloadMp3BulkUrl, metadata, {responseType: 'blob'})
    }

    public updateMp3MetadataBulk(metadata: SongDataFetched[]) {
        return this.http.post(this.apiUrl + 'update-mp3-metadata-bulk', metadata)
    }

    public updateMp3Metadata(metadata: SongDataFetched) {
        return this.http.post(this.apiUrl + 'update-mp3-metadata', metadata)
    }

}
