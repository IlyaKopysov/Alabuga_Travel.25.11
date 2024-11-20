const slides = document.querySelectorAll('.slide');
let currentSlide =0;

function showSlide(n) {
 slides.forEach((slide) => {
 slide.style.display = 'none';
 });
 slides[n].style.display = 'block';
 slider.style.transform = translateX(0);
}

function nextSlide() {
 currentSlide = (currentSlide +1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide -1 + slides.length) % slides.length;
 showSlide(currentSlide);
}

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

showSlide(0); 

setInterval(nextSlide, 20000);



