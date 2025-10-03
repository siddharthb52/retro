// Global variables
let currentScene = 'landing';
let audioContext;
let currentAudio = null;
let records = [];
let currentTrackIndex = 0;

// DOM elements - will be initialized after DOM loads
let sceneSelect, addRecordsBtn, fileInput, recordsModal, recordsList, closeRecordsBtn;
let vinyl, playBtn, pauseBtn, backBtn, forwardBtn;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeDOMElements();
    initializeEventListeners();
    loadRecordsFromFolder();
    // Ensure landing page is shown initially
    showScene('landing');
});

// Initialize DOM elements after DOM loads
function initializeDOMElements() {
    sceneSelect = document.getElementById('scene-select');
    addRecordsBtn = document.getElementById('add-records-btn');
    fileInput = document.getElementById('file-input');
    recordsModal = document.getElementById('records-modal');
    recordsList = document.getElementById('records-list');
    closeRecordsBtn = document.getElementById('close-records');
    vinyl = document.getElementById('vinyl');
    playBtn = document.getElementById('play-btn');
    pauseBtn = document.getElementById('pause-btn');
    backBtn = document.getElementById('back-btn');
    forwardBtn = document.getElementById('forward-btn');
}

// Event Listeners
function initializeEventListeners() {
    // Scene navigation
    sceneSelect.addEventListener('change', handleSceneChange);
    
    // Add records functionality
    addRecordsBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);
    
    // Records modal
    closeRecordsBtn.addEventListener('click', closeRecordsModal);
    
    // Record player controls
    vinyl.addEventListener('click', openRecordsModal);
    playBtn.addEventListener('click', playTrack);
    pauseBtn.addEventListener('click', pauseTrack);
    backBtn.addEventListener('click', previousTrack);
    forwardBtn.addEventListener('click', nextTrack);
    
    // Back buttons
    document.getElementById('back-to-landing').addEventListener('click', () => showScene('landing'));
    document.getElementById('jukebox-back').addEventListener('click', () => showScene('landing'));
    document.getElementById('car-radio-back').addEventListener('click', () => showScene('landing'));
}

// Scene Management
function handleSceneChange(event) {
    const selectedScene = event.target.value;
    if (selectedScene) {
        showScene(selectedScene);
    }
}

function showScene(sceneId) {
    // Hide all scenes first
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected scene
    const targetScene = document.getElementById(sceneId);
    if (targetScene) {
        targetScene.classList.add('active');
        currentScene = sceneId;
        
        // Reset scene selector if going back to landing
        if (sceneId === 'landing') {
            sceneSelect.value = '';
        }
    }
}

// Records Management
function handleFileUpload(event) {
    const files = event.target.files;
    
    for (let file of files) {
        if (file.type.startsWith('audio/')) {
            const record = {
                name: file.name.replace('.mp3', ''),
                file: file,
                url: URL.createObjectURL(file)
            };
            records.push(record);
        }
    }
    
    // Update records list
    updateRecordsList();
    
    // Clear file input
    event.target.value = '';
    
    // Show success message
    alert(`Added ${files.length} record(s) to your collection!`);
}

function loadRecordsFromFolder() {
    // In a real application, this would scan the music/oldies_usa folder
    // For now, we'll use placeholder records
    records = [
        { name: "Sample Track 1", url: null, isPlaceholder: true },
        { name: "Sample Track 2", url: null, isPlaceholder: true },
        { name: "Sample Track 3", url: null, isPlaceholder: true }
    ];
    updateRecordsList();
}

function updateRecordsList() {
    recordsList.innerHTML = '';
    
    records.forEach((record, index) => {
        const recordItem = document.createElement('div');
        recordItem.className = 'record-item';
        recordItem.innerHTML = `
            <span>${record.name}</span>
            <button class="play-record-btn" data-index="${index}">▶</button>
        `;
        
        // Add click event for playing the record
        const playBtn = recordItem.querySelector('.play-record-btn');
        playBtn.addEventListener('click', () => selectRecord(index));
        
        recordsList.appendChild(recordItem);
    });
}

// Record Selection and Playback
function openRecordsModal() {
    recordsModal.style.display = 'block';
    playRecordChangeSound();
}

function closeRecordsModal() {
    recordsModal.style.display = 'none';
}

function selectRecord(index) {
    currentTrackIndex = index;
    const record = records[index];
    
    if (record.isPlaceholder) {
        alert('This is a placeholder track. Please add your own MP3 files using the "Add Records" button.');
        return;
    }
    
    // Close modal and start playing
    closeRecordsModal();
    
    if (currentAudio) {
        currentAudio.pause();
    }
    
    // Create new audio element
    currentAudio = new Audio(record.url);
    currentAudio.play();
    
    // Update UI to show playing state
    vinyl.classList.add('playing');
    
    // Audio ended event
    currentAudio.addEventListener('ended', () => {
        vinyl.classList.remove('playing');
        currentAudio = null;
    });
}

// Audio Controls
function playTrack() {
    if (currentAudio && currentAudio.paused) {
        currentAudio.play();
        vinyl.classList.add('playing');
    }
}

function pauseTrack() {
    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        vinyl.classList.remove('playing');
    }
}

function previousTrack() {
    if (records.length > 0) {
        currentTrackIndex = (currentTrackIndex - 1 + records.length) % records.length;
        selectRecord(currentTrackIndex);
    }
}

function nextTrack() {
    if (records.length > 0) {
        currentTrackIndex = (currentTrackIndex + 1) % records.length;
        selectRecord(currentTrackIndex);
    }
}

// Sound Effects
function playRecordChangeSound() {
    // Create a simple record change sound effect
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === recordsModal) {
        closeRecordsModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (currentScene === 'record-player') {
        switch(event.code) {
            case 'Space':
                event.preventDefault();
                if (currentAudio && currentAudio.paused) {
                    playTrack();
                } else {
                    pauseTrack();
                }
                break;
            case 'ArrowLeft':
                previousTrack();
                break;
            case 'ArrowRight':
                nextTrack();
                break;
        }
    }
});
