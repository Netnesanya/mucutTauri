import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { invoke } from "@tauri-apps/api/tauri";
import {SongsListComponent} from "./songs-list/songs-list.component";
import {HeaderComponent} from "./header/header.component";
import { HttpClientModule} from "@angular/common/http";
import {HttpService} from "./http.service";


const command = 'java -version';

// Check if Java is installed on user machine, if not redirect to jre installation
invoke(command)
    .then(response => {
        console.log('Command executed successfully:', response);
        // Handle the response from the command
    })
    .catch(error => {
        console.error('Error executing command:', error);
        // Handle any errors that occur during command execution
    });

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterOutlet, SongsListComponent, HeaderComponent, HttpClientModule],
    providers: [HttpService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}
