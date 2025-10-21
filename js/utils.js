// Utility functions for the Retro Jukebox

/**
 * Format seconds into MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export function formatTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get DOM elements by their IDs
 * @returns {Object} Object containing all DOM element references
 */
export function getElements() {
  return {
    list: document.querySelector('#tracklist'),
    audio: document.querySelector('#audio'),
    play: document.querySelector('#play'),
    prev: document.querySelector('#prev'),
    next: document.querySelector('#next'),
    seek: document.querySelector('#seek'),
    title: document.querySelector('#title'),
    artist: document.querySelector('#artist'),
    vinyl: document.querySelector('#vinyl'),
    label: document.querySelector('#label'),
    currentTime: document.querySelector('#current-time'),
    totalTime: document.querySelector('#total-time'),
    playIcon: document.querySelector('#play-icon'),
    pauseIcon: document.querySelector('#pause-icon'),
    sceneButtons: document.querySelectorAll('.scene-btn'),
    body: document.body,
  };
}

/**
 * Update play/pause button icons
 * @param {Object} els - DOM elements object
 * @param {boolean} isPlaying - Whether audio is currently playing
 */
export function updatePlayButton(els, isPlaying) {
  if (isPlaying) {
    els.playIcon.style.display = 'none';
    els.pauseIcon.style.display = 'block';
  } else {
    els.playIcon.style.display = 'block';
    els.pauseIcon.style.display = 'none';
  }
}

/**
 * Update vinyl rotation state
 * @param {Object} els - DOM elements object
 * @param {boolean} isPlaying - Whether audio is currently playing
 */
export function updateVinylRotation(els, isPlaying) {
  if (isPlaying) {
    els.vinyl.classList.add('playing');
  } else {
    els.vinyl.classList.remove('playing');
  }
}
