import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {SongDataService} from "../services/song-data.service";
import {NgClass} from "@angular/common";

export const READY = 'ready'
export const LOADING = 'loading'
export const DISABLED = 'disabled'
export const ERROR = 'error'

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
    public downloadAllButtonStatus: string = DISABLED

    constructor(
        private http: HttpService,
        public songDataService: SongDataService
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
        if (this.submitButtonStatus === READY || this.songDataService.songsData.length > 0) {
            this.downloadAllButtonStatus = LOADING;
            const updatedData = this.songDataService.songsData.map(el => {
                // Create a copy of el.userInput, updating the duration or setting it if it's not already set
                const updatedUserInput = {
                    ...el.userInput,
                    duration: this.songDataService.defaultDuration
                };
                // Return a new object with the updated userInput
                return {
                    ...el,
                    userInput: updatedUserInput
                };
            });

            this.http.downloadMp3Bulk(updatedData)
                .subscribe({
                    next: (data) => {
                        console.log(this.songDataService.songsData);
                        this.downloadAllButtonStatus = READY;
                    },
                    error: (error: Error) => {
                        this.downloadAllButtonStatus = READY;
                        console.error('Error downloading mp3 in bulk:', error);
                    }
                });
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
                        this.submitButtonStatus = READY
                    }
                ),
                (error: Error) => {
                    this.submitButtonStatus = ERROR
                    console.error('Error fetching video info:', error)
                }

            console.log('Submitting file:', file.name);
        } else {
            console.log('No file selected');
        }
    }

    public updateLengthInput(event: any): void {
        this.songDataService.defaultDuration = Number(event.target.value) ?? 0
        // this.songDataService.songsData.forEach(el => {
        //     el.userInput = el.userInput || {};
        //     el.userInput.duration = Number(event.target.value) || event.target.value;
        // })
    }

    protected readonly READY = READY;
    protected readonly LOADING = LOADING;
}
