// index.js

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const navbar = document.getElementById('navbar');
const catGifs = document.getElementById('catGifs');
const debugReset = document.getElementById('debugReset');


// =========================
// BACKGROUND SLIDESHOW
// =========================

const slides = document.querySelectorAll('.bg-slide');

let currentSlide = 0;

setInterval(() => {

  slides[currentSlide].classList.remove('active');

  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  slides[currentSlide].classList.add('active');

}, 10000);


// =========================
// NO BUTTON SYSTEM
// =========================

const noMessages = [
  'azt hitted nem számítottam rá?',
  'jó mostmár nincs több lehetőség!',
  'amúgy gondold már át mégegyszer',
  'rendben, akkor az oldal további tartalmai sem lesznek elérhetők >:(',
  'dee akármikor meggondolhatod magad :)'
];

let noCount = 0;


// RANDOM MOVE FUNCTION

function moveNoButton() {

  const randomX = Math.floor(Math.random() * 180) - 90;
  const randomY = Math.floor(Math.random() * 120) - 60;

  noBtn.style.transform = `
    translate(${randomX}px, ${randomY}px)
    scale(${1 - (noCount * 0.08)})
  `;
}


// DESKTOP HOVER

if (window.innerWidth > 768) {

  noBtn.addEventListener('mouseover', () => {

    moveNoButton();

  });

}


// MOBILE CLICK

noBtn.addEventListener('click', (e) => {

  e.preventDefault();

  if (noCount < noMessages.length) {

    noBtn.textContent = noMessages[noCount];

  }

  moveNoButton();

  noCount++;

});


// =========================
// LOAD PREVIOUS STATE
// =========================

const acceptedInvite = localStorage.getItem('acceptedDateInvite');

if (acceptedInvite === 'true') {

  navbar.classList.remove('hidden');

  catGifs.classList.remove('hidden');

  document.querySelector('.button-group').style.display = 'none';

}


// =========================
// YES BUTTON SYSTEM
// =========================

yesBtn.addEventListener('click', () => {

  catGifs.classList.remove('hidden');

  navbar.classList.remove('hidden');

  document.querySelector('.button-group').style.display = 'none';

  // SAVE STATE
  localStorage.setItem('acceptedDateInvite', 'true');

});


// =========================
// DEBUG RESET BUTTON
// =========================

debugReset.addEventListener('click', () => {

  localStorage.removeItem('acceptedDateInvite');

  location.reload();

});