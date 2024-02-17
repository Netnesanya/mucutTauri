import {Injectable} from '@angular/core';
import {env} from "../env/env";
import {HttpClient} from "@angular/common/http";

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

    public downloadMp3Bulk(metadata: any) {
        return this.http.post(this.downloadMp3BulkUrl, metadata, {responseType: 'blob'})
    }

}
