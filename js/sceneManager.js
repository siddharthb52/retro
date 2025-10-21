// Scene management module
import { scenes } from '../data/scenes.js';

/**
 * Scene Manager class handles scene switching and track management
 */
export class SceneManager {
  constructor(els, audioManager) {
    this.els = els;
    this.audioManager = audioManager;
    this.currentScene = 'citypop';
    this.currentTrackIndex = 0;
  }

  /**
   * Switch to a different scene
   * @param {string} sceneId - ID of the scene to switch to
   */
  switchScene(sceneId) {
    if (!scenes[sceneId]) return;
    
    // Stop current audio and vinyl rotation
    this.audioManager.pause();
    
    this.currentScene = sceneId;
    this.currentTrackIndex = 0;
    
    // Update background
    const scene = scenes[sceneId];
    this.els.body.style.background = `#0b0b0b url("../${scene.background}") center / cover fixed no-repeat`;
    
    // Update scene buttons
    this.updateSceneButtons(sceneId);
    
    // Update track list
    this.updateTrackList();
    
    // Load first track of new scene (but don't play it)
    this.audioManager.loadTrack(0);
  }

  /**
   * Update scene button states
   * @param {string} activeSceneId - ID of the currently active scene
   */
  updateSceneButtons(activeSceneId) {
    this.els.sceneButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.scene === activeSceneId) {
        btn.classList.add('active');
      }
    });
  }

  /**
   * Update the track list display
   */
  updateTrackList() {
    const tracks = this.getCurrentTracks();
    this.els.list.innerHTML = tracks.map((t, n) =>
      `<button data-n="${n}">${t.title} — ${t.artist}</button>`).join('');
  }

  /**
   * Get tracks for the current scene
   * @returns {Array} Array of track objects
   */
  getCurrentTracks() {
    return scenes[this.currentScene].tracks;
  }

  /**
   * Get current track index
   * @returns {number} Current track index
   */
  getCurrentTrackIndex() {
    return this.currentTrackIndex;
  }

  /**
   * Set current track index
   * @param {number} index - New track index
   */
  setCurrentTrackIndex(index) {
    this.currentTrackIndex = index;
  }

  /**
   * Initialize scene manager
   */
  initialize() {
    // Set up scene button event listeners
    this.els.sceneButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchScene(btn.dataset.scene);
      });
    });

    // Set up track list click handler
    this.els.list.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      this.audioManager.playTrack(Number(b.dataset.n));
    });

    // Initialize with first scene
    this.switchScene('citypop');
  }
}
