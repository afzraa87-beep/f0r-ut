/* script.js
 - play YouTube clip in overlay when Play clicked
 - gallery slideshow toggle (auto-scroll)
 - small niceties
*/

// Player overlay logic
const playBtn = document.getElementById('playSong');
const playerWrap = document.getElementById('playerWrap');
const closePlayer = document.getElementById('closePlayer');
const yt = document.getElementById('yt');

if (playBtn) {
  playBtn.addEventListener('click', () => {
    // show overlay and request autoplay by adding autoplay param
    if (!playerWrap) return;
    // ensure autoplay=1 present
    if (yt && yt.src.indexOf('autoplay=1') === -1) {
      yt.src = yt.src + '&autoplay=1';
    }
    playerWrap.classList.remove('hidden');
    playerWrap.setAttribute('aria-hidden','false');
  });
}
if (closePlayer) {
  closePlayer.addEventListener('click', () => {
    // stop playback by resetting src without autoplay
    if (yt) {
      yt.src = yt.src.replace('&autoplay=1','&autoplay=0');
    }
    playerWrap.classList.add('hidden');
    playerWrap.setAttribute('aria-hidden','true');
  });
}

// Gallery slideshow auto-scroll
const gallery = document.getElementById('gallery');
const toggle = document.getElementById('slideshowToggle');
let slideInterval = null;
let slideIndex = 0;

function startSlideshow(){
  if(!gallery) return;
  stopSlideshow();
  slideInterval = setInterval(()=> {
    const items = gallery.querySelectorAll('.g-item');
    if(!items || items.length===0) return;
    slideIndex = (slideIndex + 1) % items.length;
    const target = items[slideIndex];
    // scroll so target is centered-ish
    target.scrollIntoView({behavior:'smooth', inline:'center'});
  }, 3000);
}

function stopSlideshow(){
  if(slideInterval) { clearInterval(slideInterval); slideInterval = null; }
}

if(toggle){
  toggle.addEventListener('change', () => {
    if(toggle.checked) startSlideshow();
    else stopSlideshow();
  });
}

// small keyboard: Esc to close player
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    if(!playerWrap.classList.contains('hidden')){
      if(yt) yt.src = yt.src.replace('&autoplay=1','&autoplay=0');
      playerWrap.classList.add('hidden');
    }
  }
});

// Improve touch/drag for gallery: allow grabbing
let isDown=false, startX, scrollLeft;
if(gallery){
  gallery.addEventListener('mousedown', (e)=> {
    isDown=true;
    gallery.classList.add('active');
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });
  gallery.addEventListener('mouseleave', ()=> { isDown=false; gallery.classList.remove('active'); });
  gallery.addEventListener('mouseup', ()=> { isDown=false; gallery.classList.remove('active'); });
  gallery.addEventListener('mousemove', (e)=> {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.2;
    gallery.scrollLeft = scrollLeft - walk;
  });
}
