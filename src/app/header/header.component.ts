import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {SongDataService} from "../services/song-data.service";
import {NgClass} from "@angular/common";

export const READY = 'ready'
export const LOADING = 'loading'
export const DISABLED = 'disabled'

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

    public selectedFile: File | null = null;

    public submitButtonStatus: string = DISABLED

    constructor(
        private http: HttpService,
        private songDataService: SongDataService
    ) {
    }

    ngOnInit() {
    }

    public handleFileInput(event: Event) {
        const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;
        if (fileList) {
            this.submitButtonStatus = READY
            this.selectedFile = fileList[0];
        }
    }

    public handleDownloadAll(): void {
        if (this.submitButtonStatus === READY) {
            this.http.downloadMp3Bulk(this.songDataService.songsData)
                .subscribe(data => {
                    console.log(data);
                }),
                (error: Error) => {
                    console.error('Error downloading mp3 in bulk:', error)
                }
        }
    }

    public submitFile() {
        const file = this.selectedFile;
        if (file) {
            const formData = new FormData()
            formData.append('file', file)

            this.submitButtonStatus = LOADING
            this.http.fetchVideoInfo(formData)
                .subscribe((data: any) => {
                        this.songDataService.songsData = data
                        console.log(this.songDataService.songsData)
                    }
                ),
                (error: Error) => {
                    console.error('Error fetching video info:', error)
                }

            console.log('Submitting file:', file.name);
        } else {
            console.log('No file selected');
        }
    }

    protected readonly DISABLED = DISABLED;
    protected readonly READY = READY;
    protected readonly LOADING = LOADING;
}
