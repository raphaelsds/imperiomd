document.getElementById('ano').textContent = new Date().getFullYear();

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const nome = formData.get('nome');
  const telefone = formData.get('telefone');
  const servico = formData.get('servico');
  const mensagem = [
    'Olá! Vim pelo site do Império MD Beauty Lounge.',
    '',
    `Nome: ${nome}`,
    `WhatsApp: ${telefone}`,
    `Serviço desejado: ${servico}`
  ].join('\n');

  window.open(`https://wa.me/5551991817667?text=${encodeURIComponent(mensagem)}`, '_blank', 'noopener');
  contactForm.reset();
});

const galleryCarousel = document.querySelector('.gallery-carousel');
const gallerySlides = document.querySelectorAll('.gallery-slide');
const galleryDots = document.querySelector('.carousel-dots');
let currentSlide = 0;
let carouselTimer;
const galleryVideo = galleryCarousel.querySelector('video');

function showSlide(index) {
  clearTimeout(carouselTimer);
  currentSlide = (index + gallerySlides.length) % gallerySlides.length;

  gallerySlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === currentSlide);
  });

  document.querySelectorAll('.carousel-dot').forEach((dot, dotIndex) => {
    dot.classList.toggle('is-active', dotIndex === currentSlide);
  });

  if (galleryVideo) {
    if (gallerySlides[currentSlide].contains(galleryVideo)) {
      galleryVideo.currentTime = 0;
      galleryVideo.play().catch(() => {});
      return;
    }

    galleryVideo.pause();
    galleryVideo.currentTime = 0;
  }

  carouselTimer = setTimeout(() => showSlide(currentSlide + 1), 6000);
}

function restartCarousel() {
  showSlide(currentSlide);
}

gallerySlides.forEach((_, slideIndex) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.className = 'carousel-dot';
  dot.setAttribute('aria-label', `Mostrar transformação ${slideIndex + 1}`);
  dot.addEventListener('click', () => {
    showSlide(slideIndex);
    restartCarousel();
  });
  galleryDots.appendChild(dot);
});

galleryCarousel.querySelector('.carousel-prev').addEventListener('click', () => {
  showSlide(currentSlide - 1);
  restartCarousel();
});

galleryCarousel.querySelector('.carousel-next').addEventListener('click', () => {
  showSlide(currentSlide + 1);
});

galleryVideo?.addEventListener('ended', () => {
  if (gallerySlides[currentSlide].contains(galleryVideo)) {
    showSlide(currentSlide + 1);
  }
});

showSlide(0);

const galleryItems = document.querySelectorAll('.comparison-card img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = document.querySelector('.lightbox-close');

for (const item of galleryItems) {
  item.addEventListener('click', () => {
    lightboxImg.src = item.src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
}

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('open')) {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});
