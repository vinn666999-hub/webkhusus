const screens = document.querySelectorAll('.card');

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  const music = document.querySelector('#birthdayMusic');
  if (id !== 'memories' && music) music.pause();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelector('#openMenu').addEventListener('click', () => showScreen('menu'));

document.querySelectorAll('[data-back]').forEach(button => {
  button.addEventListener('click', () => showScreen(button.dataset.back));
});

document.querySelectorAll('[data-choice]').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.choice;
    showScreen(target);

    if (target === 'memories') {
      const music = document.querySelector('#birthdayMusic');
      music.currentTime = 0;
      music.play().catch(() => {
        document.querySelector('#memories').addEventListener('pointerdown', () => music.play(), { once: true });
      });
    }
  });
});

const heartsContainer = document.querySelector('.hearts');
for (let i = 0; i < 18; i++) {
  const heart = document.createElement('span');
  heart.textContent = i % 2 ? '♡' : '♥';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 22}px`;
  heart.style.animationDuration = `${7 + Math.random() * 8}s`;
  heart.style.animationDelay = `${Math.random() * -12}s`;
  heartsContainer.appendChild(heart);
}

const photoFiles = [
  'IMG-20250409-WA0032.jpg',
  'IMG-20250411-WA0118.jpg',
  'IMG-20250418-WA0094.jpg',
  'IMG-20250418-WA0095.jpg',
  'IMG-20250418-WA0096.jpg',
  'IMG-20250418-WA0162.jpg',
  'IMG-20250419-WA0104.jpg',
  'IMG-20250422-WA0129.jpg',
  'IMG-20250423-WA0062.jpg',
  'IMG-20250504-WA0006.jpg',
  'IMG-20250505-WA0308.jpg',
  'IMG-20250528-WA0048.jpg',
  'IMG-20250529-WA0058.jpg',
  'IMG-20250529-WA0060.jpg',
  'IMG-20250531-WA0008.jpg',
  'IMG-20250602-WA0088.jpg',
  'IMG-20250602-WA0102.jpg',
  'IMG-20250613-WA0013.jpg',
  'IMG-20250614-WA0056.jpg',
  'IMG-20250614-WA0058.jpg',
  'IMG-20250617-WA0095.jpg'
];

const gallery = document.querySelector('.gallery');

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <button class="lightbox-close" aria-label="Tutup preview">×</button>
  <button class="lightbox-nav lightbox-prev" aria-label="Foto sebelumnya">‹</button>
  <img src="" alt="Preview foto">
  <button class="lightbox-nav lightbox-next" aria-label="Foto berikutnya">›</button>
`;
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector('img');
let currentPhoto = 0;

function openPreview(index) {
  currentPhoto = index;
  lightboxImage.src = `apaya/${encodeURIComponent(photoFiles[index])}`;
  lightboxImage.alt = `Kenangan ${index + 1}`;
  lightbox.classList.add('active');
}

function closePreview() {
  lightbox.classList.remove('active');
}

function changePhoto(direction) {
  currentPhoto = (currentPhoto + direction + photoFiles.length) % photoFiles.length;
  openPreview(currentPhoto);
}

photoFiles.forEach((file, index) => {
  const photo = document.createElement('button');
  photo.className = 'photo';
  photo.type = 'button';
  photo.setAttribute('aria-label', `Lihat Foto ${index + 1} lebih besar`);

  const image = document.createElement('img');
  image.src = `apaya/${encodeURIComponent(file)}`;
  image.alt = `Kenangan ${index + 1}`;
  image.loading = 'lazy';

  photo.appendChild(image);
  photo.addEventListener('click', () => openPreview(index));
  gallery.appendChild(photo);
});

lightbox.querySelector('.lightbox-close').addEventListener('click', closePreview);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => changePhoto(-1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => changePhoto(1));
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closePreview();
});

document.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('active')) return;
  if (event.key === 'Escape') closePreview();
  if (event.key === 'ArrowLeft') changePhoto(-1);
  if (event.key === 'ArrowRight') changePhoto(1);
});

const questionForm = document.querySelector('.question-form');
if (questionForm) {
  const result = questionForm.querySelector('.question-result');

  questionForm.querySelectorAll('.answer-button').forEach(button => {
    button.addEventListener('click', () => {
      questionForm.querySelectorAll('.answer-button').forEach(item => {
        item.classList.remove('selected', 'wrong');
      });

      if (button.dataset.answer === 'aku') {
        button.classList.add('selected');
        result.textContent = 'hubungin aja orangnya langsung : WA 087724170795 , ig @_j0921s , tiktok @mynoname0078';
      } else {
        button.classList.add('wrong');
        result.textContent = 'yaudah, kalo emang enggak.... ';
      }
    });
  });
}
