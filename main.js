const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.querySelector('.progress');
const title = document.querySelector('#title');
const musicCover = document.querySelector('#music-cover');

//song titles
const songs = ['Darkside', 'Ignite', 'In The End', 'Rockstar', 'Shape Of You', 'Sing Me To Sleep', 'Sugar & Brownies']

//keep tarck of songs
let songIndex = 2;

//initially load song info DOM
loadSong(songs[songIndex]);

//Update the song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `./musics/${song}.mp3`;
    musicCover.src = `./images/${song}.jpg`;

}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function setProgress(e) {
    const width = this.clientWidth;
    // console.log(width);
    const clickX = e.offsetX;
    // console.log(clickX);
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}


//Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);

nextBtn.addEventListener('click', nextSong);

//Updating progeress bar
audio.addEventListener('timeupdate', (e) => {
    // console.log(e.srcElement.currentTime);
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
});


// progressContainer.addEventListener('click', (e) => {
//     const width = this.ClientWidth
//     console.log(width);
// });
//here this.lientWidth does not work with arrow functions.

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);