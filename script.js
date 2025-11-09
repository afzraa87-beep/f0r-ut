// === PLAY LOCAL AUDIO ===
const audio = new Audio("TULUS - Jatuh Suka (Official Lyric Video) [2uJut6USftQ].mp3");
audio.loop = true;

const playBtn = document.getElementById("playSong");
const playerWrap = document.getElementById("playerWrap");
const closeBtn = document.getElementById("closePlayer");
const gallery = document.getElementById("gallery");

// Main button play
playBtn.addEventListener("click", () => {
  audio.play().catch(err => console.log("Autoplay blocked:", err));
  makeMusicNote(); // 🌈 efek lucu tiap kali diklik
});

// Close iframe player
closeBtn?.addEventListener("click", () => {
  playerWrap.classList.add("hidden");
  playerWrap.setAttribute("aria-hidden", "true");
});

// === Efek animasi not musik ===
function makeMusicNote() {
  const note = document.createElement("div");
  note.className = "music-note";
  note.textContent = ["🎵", "🎶", "💫", "✨"][Math.floor(Math.random() * 4)];
  document.body.appendChild(note);

  // posisi acak di sekitar tombol
  const rect = playBtn.getBoundingClientRect();
  note.style.left = rect.left + rect.width / 2 + (Math.random() * 60 - 30) + "px";
  note.style.top = rect.top - 10 + "px";

  // hilang setelah animasi
  setTimeout(() => note.remove(), 3000);
}

// === Galeri geser otomatis (kalau mau dipakai) ===
const toggle = d
