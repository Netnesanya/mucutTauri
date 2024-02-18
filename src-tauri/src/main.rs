#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::process::{Command, Child};
use tauri::Manager; // Make sure Manager is in scope for managing window events

fn main() {
    tauri::Builder::default()
        .setup(|_app| {
            // Start the server process
            let server = Command::new("./bin/myapp.exe")
                .spawn()
                .expect("Failed to start server");

            // Here, you should find a way to properly manage the server variable
            // Perhaps by using a global state or another pattern suitable for your needs

            Ok(())
        })
        .on_window_event(|event| {
            // Handle window events here
            // If you need to access the server process to kill it, you'll need a different approach
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
