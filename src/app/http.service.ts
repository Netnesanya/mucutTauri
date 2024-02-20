import {Injectable} from '@angular/core';
import {env} from "../env/env";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CombinedSongData, SongDataFetched} from "./services/song-data.service";
import {WebSocketService} from "./websocket.service";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    public apiUrl: string = env.apiUrlHostedFargus;

    private readonly fetchVideoInfoUrl = this.apiUrl + 'fetch-video-info';
    private readonly downloadMp3BulkUrl = this.apiUrl + 'download-mp3-bulk';

    constructor(private http: HttpClient,
                private ws: WebSocketService) {
    }

    public switchHost(host: string) {
        this.apiUrl = host;
        this.ws.host = host
        this.ws.wasHostChanged = true
        this.ws.disconnect();
    }

    public fetchVideoInfo(txt: FormData) {
        return this.http.post(this.fetchVideoInfoUrl, txt);
    }

    public downloadMp3Bulk(metadata: CombinedSongData[]) {
        return this.http.post(this.downloadMp3BulkUrl, metadata, {responseType: 'blob'})
    }

    public updateMp3MetadataBulk(metadata: SongDataFetched[]) {
        return this.http.post(this.apiUrl + 'update-mp3-metadata-bulk', metadata)
    }

    public updateMp3Metadata(metadata: SongDataFetched) {
        return this.http.post(this.apiUrl + 'update-mp3-metadata', metadata)
    }

    public requestSiqCreation(siqName: string) {
        return this.http.get(this.apiUrl + `pack-siq?name=${siqName}`)
    }


}
