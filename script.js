// === PLAY LOCAL AUDIO ===
const audio = new Audio("TULUS - Jatuh Suka (Official Lyric Video) [2uJut6USftQ].mp3");
audio.loop = true;
audio.volume = 0; // mulai dari volume 0 biar halus

const playBtn = document.getElementById("playSong");
const playerWrap = document.getElementById("playerWrap");
const closeBtn = document.getElementById("closePlayer");
const gallery = document.getElementById("gallery");

// Saat tombol Sing Songg diklik
playBtn.addEventListener("click", () => {
  audio.play().catch(err => console.log("Autoplay blocked:", err));
  fadeInAudio(audio, 1, 3000); // 🎶 naik volume halus ke 1 dalam 3 detik
  makeMusicNote(); // 🌈 efek lucu tiap klik
});

// Tutup iframe player (jika dipakai)
closeBtn?.addEventListener("click", () => {
  playerWrap.classList.add("hidden");
  playerWrap.setAttribute("aria-hidden", "true");
});

// === Fungsi Fade-in Musik ===
function fadeInAudio(audio, targetVolume, duration) {
  const step = targetVolume / (duration / 100); // naik per 100ms
  const fade = setInterval(() => {
    if (audio.volume < targetVolume) {
      audio.volume = Math.min(audio.volume + step, targetVolume);
    } else {
      clearInterval(fade);
    }
  }, 100);
}

// === Efek Not Musik Lucu ===
function makeMusicNote() {
  const note = document.createElement("div");
  note.className = "music-note";
  note.textContent = ["🎵", "🎶", "💫", "✨"][Math.floor(Math.random() * 4)];
  document.body.appendChild(note);

  // Posisi acak di sekitar tombol
  const rect = playBtn.getBoundingClientRect();
  note.style.left = rect.left + rect.width / 2 + (Math.random() * 60 - 30) + "px";
  note.style.top = rect.top - 10 + "px";

  // Hapus setelah animasi
  setTimeout(() => note.remove(), 3000);
}

// === Galeri Slideshow Otomatis ===
const toggle = document.getElementById("slideshowToggle");
let autoSlide;
toggle?.addEventListener("change", e => {
  if (e.target.checked) {
    let i = 0;
    autoSlide = setInterval(() => {
      gallery.scrollBy({ left: 200, behavior: "smooth" });
      i++;
      if (i > 20) i = 0;
    }, 2000);
  } else {
    clearInterval(autoSlide);
  }
});
