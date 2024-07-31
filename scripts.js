document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progress = document.getElementById('progress');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const albumCover = document.getElementById('album-cover');
    const background = document.querySelector('.background');

    const songs = [
        {title: 'Tell më', artist: 'Yëat', src: 'song2.mp3', cover: 'cover2.png'},
        {title: 'NEXT!', artist: 'ncts', src: 'song1.mp3', cover: 'cover1.png'},
        {title: ' You', artist: 'Don Toliver', src: 'song3.mp3', cover: 'cover3.png'}
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    const audio = new Audio();

    function loadSong(song) {
        audio.src = song.src;
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        albumCover.src = song.cover;
        background.style.backgroundImage = `url(${song.cover})`;
    }

    function playSong() {
        audio.play();
        isPlaying = true;
        playPauseBtn.textContent = '❚❚';
    }

    function pauseSong() {
        audio.pause();
        isPlaying = false;
        playPauseBtn.textContent = '▶';
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);

    audio.addEventListener('timeupdate', () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.value = progressPercent;
    });

    progress.addEventListener('input', () => {
        const seekTime = (progress.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    loadSong(songs[currentSongIndex]);
});
