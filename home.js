
const songs = document.querySelectorAll("#songs li");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progress = document.getElementById("progress");

let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio();

function loadSong(index) {
    const song = songs[index];
    audio.src = song.dataset.file;
}

function playSong() {
    isPlaying = true;
    playButton.textContent = "Pause";
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playButton.textContent = "Play";
    audio.pause();
}

playButton.addEventListener("click", () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", (e) => {
    audio.currentTime = (e.target.value / 100) * audio.duration;
});

// Load the first song
loadSong(currentSongIndex);x