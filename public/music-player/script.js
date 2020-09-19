const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

audio.volume = 0.1;

// Song titles
const songs = ['Someone_You_Loved', 'I_Want_To_Hold_Your_Hand', 'The_Funeral'];

// Keep track of the song
let songIndex = Math.floor(Math.random() * 3);
console.log(songIndex);

// Update song details
const loadSong = (song) => {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `img/${song}.jpg`;
};

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Play Song
const playSong = () => {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
};

// Pause Song
const pauseSong = () => {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
};

// Previous song
const prevSong = () => {
  songIndex--;
  console.log(songIndex);

  if (songIndex === -1) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
};

// Next song
const nextSong = () => {
  songIndex++;
  console.log(songIndex);

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
};

// Update progess bar
const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
};

// Set progress bar
function setProgress(e) {
  // Total width
  const width = this.clientWidth;

  // Where I'm clicking
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener('click', () => {
  const isPLaying = musicContainer.classList.contains('play');

  if (isPLaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
