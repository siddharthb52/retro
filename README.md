# Retro Jukebox 🎵

A nostalgic web-based music player with a retro vinyl record aesthetic. Switch between genres, enjoy smooth animations, and experience music the classic way.

## Features

- **Dual Genre Support**: Switch between Oldies (USA) and City Pop (Japanese) music scenes
- **Retro Aesthetic**: Beautiful vinyl record visualization that rotates during playback
- **Full Playback Controls**: Play, pause, previous, next, and seek functionality
- **Keyboard Shortcuts**: Control playback with convenient keyboard commands
- **Interactive Track List**: Click any track to play it instantly
- **Dynamic Backgrounds**: Each genre has its own themed background
- **Custom Record Labels**: Each track displays its unique album artwork on the vinyl

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for best experience)

### Installation

1. Clone or download this repository
2. Open the project directory
3. Serve the files using a local web server:

   **Using Python:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   **Using Node.js (http-server):**
   ```bash
   npx http-server
   ```

   **Using Node.js (serve):**
   ```bash
   npx serve
   ```

4. Open your browser and navigate to `http://localhost:8000` (or the port your server uses based on terminal specifications)

## Usage

### Basic Controls

- **Play/Pause**: Click the play button or press `Space`
- **Previous Track**: Click the previous button or press `P`
- **Next Track**: Click the next button or press `N`
- **Seek**: Drag the seek bar or use arrow keys
  - `←` (Left Arrow): Rewind 5 seconds
  - `→` (Right Arrow): Forward 5 seconds

### Switching Genres

Click the genre buttons in the sidebar to switch between:
- **Oldies**: Classic American R&B and funk tracks
- **City Pop**: Japanese city pop from the 1970s and 1980s

### Track Selection

Click any track in the sidebar track list to play it immediately.

## Project Structure

```
retro/
├── index.html          # Main HTML file
├── app.js              # Application entry point
├── data/
│   └── scenes.js       # Scene/genre definitions and track data
├── js/
│   ├── audioManager.js # Audio playback and controls
│   ├── sceneManager.js # Scene switching and track management
│   └── utils.js        # Utility functions
├── styles/
│   └── main.css        # Main stylesheet
├── assets/
│   ├── labels/         # Record label artwork
│   └── *.png           # Background images and icons
└── music/
    ├── citypop/        # City Pop tracks
    └── oldies_usa/     # Oldies tracks
```

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling, animations, and responsive design
- **Vanilla JavaScript (ES6 Modules)**: Application logic and interactivity
- **HTML5 Audio API**: Music playback functionality

## Customization

### Adding New Tracks

1. Add your audio file to the appropriate genre folder (`music/citypop/` or `music/oldies_usa/`)
2. Add a record label image to `assets/labels/`
3. Update `data/scenes.js` with the new track information:

```javascript
{
  title: "Your Track Title",
  artist: "Artist Name",
  src: "music/genre/Your Track.mp3",
  label: "assets/labels/your-label.png"
}
```

### Adding New Genres

1. Add a new scene object to `data/scenes.js`:

```javascript
newGenre: {
  name: "Genre Name",
  background: "assets/your-background.png",
  tracks: [
    // ... your tracks
  ]
}
```

2. Add a genre button in `index.html`:

```html
<button class="scene-btn" data-scene="newGenre">Genre Name</button>
```

3. Add your background image to the `assets/` folder

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## License

This project is open source and available for personal use.

## Acknowledgments

- Music tracks are for demonstration purposes
- Inspired by classic jukebox designs and retro aesthetics

---

Enjoy your retro music experience! 🎶

