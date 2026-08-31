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

function showSlide(index) {
  currentSlide = (index + gallerySlides.length) % gallerySlides.length;

  gallerySlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === currentSlide);
  });

  document.querySelectorAll('.carousel-dot').forEach((dot, dotIndex) => {
    dot.classList.toggle('is-active', dotIndex === currentSlide);
  });
}

function restartCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => showSlide(currentSlide + 1), 6000);
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
  restartCarousel();
});

showSlide(0);
restartCarousel();

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
