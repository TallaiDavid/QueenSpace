// randikrol.js

const revealButtons = document.querySelectorAll('.reveal-btn');
const backgroundLayer = document.getElementById('backgroundLayer');


// BACKGROUND CHANGE

const backgroundImages = [
  'assets/randik/randi1/Arriba.png',
  'assets/randik/randi1/Minigolf.png',
  'assets/randik/randi1/Spotting.png',
  'assets/randik/randi2/Twentysix.png',
  'assets/randik/randi2/Bowling.png',
  'assets/randik/randi2/Muzeum.png'
];

let currentBg = 0;

backgroundLayer.style.backgroundImage =
  `url('${backgroundImages[0]}')`;

setInterval(() => {

  currentBg++;

  if(currentBg >= backgroundImages.length){
    currentBg = 0;
  }

  backgroundLayer.style.backgroundImage =
    `url('${backgroundImages[currentBg]}')`;

}, 9000);


// REVEAL SYSTEM

revealButtons.forEach(button => {

  button.addEventListener('click', () => {

    const card =
      button.closest('.date-card');

    const content =
      card.querySelector('.card-content');

    content.classList.remove('hidden');

    button.style.display = 'none';

  });

});


// DRAG SYSTEM

const galleries =
  document.querySelectorAll('.date-gallery');

galleries.forEach(gallery => {

  let draggedItem = null;

  const items =
    gallery.querySelectorAll('.date-item');

  items.forEach(item => {

    item.addEventListener('dragstart', () => {

      draggedItem = item;

      setTimeout(() => {
        item.style.opacity = '0.5';
      }, 0);

    });

    item.addEventListener('dragend', () => {

      setTimeout(() => {

        draggedItem = null;

        item.style.opacity = '1';

      }, 0);

    });

    item.addEventListener('dragover', e => {

      e.preventDefault();

    });

    item.addEventListener('drop', () => {

      if(draggedItem !== item){

        gallery.insertBefore(
          draggedItem,
          item
        );

      }

    });

  });

});


// SAVE NOTES

const textareas =
  document.querySelectorAll('textarea');

textareas.forEach((textarea,index) => {

  const saved =
    localStorage.getItem(`dateNote${index}`);

  if(saved){
    textarea.value = saved;
  }

  textarea.addEventListener('input', () => {

    localStorage.setItem(
      `dateNote${index}`,
      textarea.value
    );

  });

});

// =========================
// EDIT MODE
// =========================

const editButtons =
  document.querySelectorAll('.edit-btn');

editButtons.forEach(btn => {

  btn.addEventListener('click', () => {

    const card =
      btn.closest('.card-content');

    const extraOptions =
      card.querySelector('.extra-options');

    extraOptions.classList.toggle('hidden');

  });

});


// =========================
// ADD LOCATION
// =========================

const addButtons =
  document.querySelectorAll('.add-location');

addButtons.forEach(button => {

  button.addEventListener('click', () => {

    const gallery =
      button.closest('.card-content')
      .querySelector('.date-gallery');

    const optionContainer =
      button.closest('.extra-options');

    const image =
      button.dataset.image;

    const name =
      button.dataset.name;

    const buttonHTML =
      button.innerHTML;

    const newCard =
      document.createElement('div');

    newCard.className = 'date-item';

    newCard.draggable = true;

    newCard.innerHTML = `
      <div class="removable-tag">❌</div>
      <img src="${image}">
      <p>${name}</p>
    `;

    gallery.appendChild(newCard);

    // ELTÜNTETJÜK A GOMBOT
    button.remove();

    const removeBtn =
      newCard.querySelector('.removable-tag');

    // TÖRLÉS GOMB
    removeBtn.addEventListener('click', () => {

  const restoreButton =
    document.createElement('button');

  restoreButton.className =
    'add-location';

  restoreButton.dataset.image =
    image;

  restoreButton.dataset.name =
    name;

  restoreButton.innerHTML =
    buttonHTML;

  optionContainer.appendChild(
    restoreButton
  );

  // ugyanaz mint eredetileg
  restoreButton.addEventListener('click', () => {

    restoreButton.remove();

    const restoredCard =
      document.createElement('div');

    restoredCard.className =
      'date-item';

    restoredCard.draggable = true;

    restoredCard.innerHTML = `
      <div class="removable-tag">❌</div>
      <img src="${image}">
      <p>${name}</p>
    `;

    gallery.appendChild(restoredCard);

    const newRemoveBtn =
      restoredCard.querySelector('.removable-tag');

    newRemoveBtn.addEventListener('click', () => {

      restoredCard.remove();

    });

  });

  newCard.remove();

});

  });

});

const allLocations = {

    arriba: {
        title: "Arriba! Taqueria",
        image: "Arriba.png"
    },

    minigolf: {
        title: "Minigolf",
        image: "Minigolf.png"
    },

    spotting: {
        title: "Repülő spotting",
        image: "Spotting.png"
    },

    kastely: {
        title: "Gödöllői kastély",
        image: "Kastely.png"
    },

    twentysix: {
        title: "Twentysix",
        image: "Twentysix.png"
    },

    starbucks: {
        title: "Starbucks",
        image: "Starbucks.png"
    }
};

randi1 = [
   "arriba",
   "minigolf",
   "spotting"
];

randi2 = [
   "kastely",
   "twentysix",
   "starbucks",
   "spotting"
];