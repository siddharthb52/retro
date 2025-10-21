// Main application file - Retro Jukebox
import { getElements } from './js/utils.js';
import { SceneManager } from './js/sceneManager.js';
import { AudioManager } from './js/audioManager.js';

/**
 * Main application class
 */
class RetroJukebox {
  constructor() {
    this.els = getElements();
    this.sceneManager = new SceneManager(this.els, null);
    this.audioManager = new AudioManager(this.els, this.sceneManager);
    
    // Set up circular reference
    this.sceneManager.audioManager = this.audioManager;
  }

  /**
   * Initialize the application
   */
  initialize() {
    // Initialize scene manager
    this.sceneManager.initialize();
    
    // Set up keyboard shortcuts
    this.audioManager.setupKeyboardShortcuts();
    
    // Load first track
    this.audioManager.loadTrack(0);
    
    // Add background class
    document.body.classList.add('has-bg');
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new RetroJukebox();
  app.initialize();
});
