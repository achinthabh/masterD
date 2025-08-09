document.addEventListener('DOMContentLoaded', function() {
    // Audio Player Functionality
    const playButtons = document.querySelectorAll('.play-btn');
    const audioPlayer = document.getElementById('main-audio');
    const audioPlayerContainer = document.querySelector('.audio-player');
    const closePlayerBtn = document.querySelector('.close-player');
    const playPauseBtn = document.querySelector('.play-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const volumeBtn = document.querySelector('.volume-btn');
    const volumeSlider = document.querySelector('.volume-slider');
    
    // Track list
    const tracks = [
        {
            title: "Colombo Streets",
            file: "audio/track1.mp3",
            cover: "images/album-cover1.jpg"
        },
        {
            title: "Island King",
            file: "audio/track2.mp3",
            cover: "images/album-cover2.jpg"
        },
        {
            title: "Hustle Never Sleeps",
            file: "audio/track3.mp3",
            cover: "images/album-cover1.jpg"
        }
    ];
    
    let currentTrack = 0;
    let isPlaying = false;
    
    // Load track
    function loadTrack(trackIndex) {
        const track = tracks[trackIndex];
        audioPlayer.src = track.file;
        audioPlayer.load();
        
        // Update UI
        document.querySelector('.audio-player').setAttribute('data-track-title', track.title);
    }
    
    // Play track
    function playTrack() {
        audioPlayer.play();
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    // Pause track
    function pauseTrack() {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
    
    // Previous track
    function prevTrack() {
        currentTrack--;
        if (currentTrack < 0) {
            currentTrack = tracks.length - 1;
        }
        loadTrack(currentTrack);
        if (isPlaying) {
            playTrack();
        }
    }
    
    // Next track
    function nextTrack() {
        currentTrack++;
        if (currentTrack >= tracks.length) {
            currentTrack = 0;
        }
        loadTrack(currentTrack);
        if (isPlaying) {
            playTrack();
        }
    }
    
    // Update progress bar
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        // Update time display
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
    
    // Set progress
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }
    
    // Set volume
    function setVolume() {
        audioPlayer.volume = this.value;
        
        // Update volume icon
        if (this.value == 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (this.value < 0.5) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }
    
    // Toggle mute
    function toggleMute() {
        if (audioPlayer.volume > 0) {
            audioPlayer.volume = 0;
            volumeSlider.value = 0;
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            audioPlayer.volume = volumeSlider.dataset.lastVolume || 1;
            volumeSlider.value = audioPlayer.volume;
            if (audioPlayer.volume < 0.5) {
                volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
            } else {
                volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        }
    }
    
    // Event Listeners
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioSrc = this.getAttribute('data-audio');
            audioPlayer.src = audioSrc;
            audioPlayerContainer.classList.remove('hidden');
            playTrack();
            
            // Find track index
            const trackIndex = tracks.findIndex(track => track.file === audioSrc);
            if (trackIndex !== -1) {
                currentTrack = trackIndex;
            }
        });
    });
    
    closePlayerBtn.addEventListener('click', function() {
        pauseTrack();
        audioPlayerContainer.classList.add('hidden');
    });
    
    playPauseBtn.addEventListener('click', () => {
        isPlaying ? pauseTrack() : playTrack();
    });
    
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextTrack);
    
    progressContainer.addEventListener('click', setProgress);
    
    volumeSlider.addEventListener('input', setVolume);
    volumeBtn.addEventListener('click', toggleMute);
    
    // Store volume before mute
    volumeSlider.addEventListener('change', function() {
        volumeSlider.dataset.lastVolume = this.value;
    });
    
    // Initialize player
    loadTrack(currentTrack);
});