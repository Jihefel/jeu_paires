let imagesFace = [
  "./public/img/AOC-Artist-Front-Headhunterz-min.jpg",
  "./public/img/AOC-Artist-Front-Headhunterz-min.jpg",
  "./public/img/AOC-Artist-Front-Wildstylez-2021-Alt.png",
  "./public/img/AOC-Artist-Front-Wildstylez-2021-Alt.png",
  "./public/img/AOC-Artist-Front-Noisecontrollers-min.jpg",
  "./public/img/AOC-Artist-Front-Noisecontrollers-min.jpg",
];

let attributesCard = [
  "Headhunterz",
  "Headhunterz",
  "Wildstylez",
  "Wildstylez",
  "Noisecontrollers",
  "Noisecontrollers",
];

// Déclarations getElement et query
const faces = document.getElementsByClassName("face");
const dos = document.getElementsByClassName("dos");
const doubleFace = document.getElementsByClassName("double-face");
const cartes = document.getElementsByClassName("carte");
const btnAfficherTableau = document.getElementById("btnAfficher");
const partieScore = document.getElementById("partieScore");
const partieJeu = document.getElementById("partieJeu");
const chrono = document.getElementById("chrono");

/*****/
const bgDos = () => {
  Array.from(dos).forEach((dos) => {
    dos.style.backgroundImage = `url(./public/img/dos-cartes.jpg)`;
    dos.style.backgroundSize = "contain";
    dos.style.backgroundRepeat = "no-repeat";
    dos.style.backgroundPosition = "center";
  });
};
bgDos();

const bgFace = () => {
  Array.from(faces).forEach((face) => {
    let random = Math.floor(Math.random() * imagesFace.length);
    face.style.backgroundImage = `url(${imagesFace[random]})`;
    face.style.backgroundSize = "contain";
    face.style.backgroundRepeat = "no-repeat";
    face.style.backgroundPosition = "center";
    imagesFace.splice(random, 1);
  });
};
bgFace();
/*****/

/*****/
const afficherTab = () => {
  if (partieJeu.classList.contains("col-10")) {
    partieJeu.classList.remove("col-10");
    partieJeu.classList.add("col-12");
  } else if (partieJeu.classList.contains("col-12")) {
    partieJeu.classList.add("col-10");
    partieJeu.classList.remove("col-12");
  }

  partieScore.classList.toggle("d-none");
  partieScore.classList.toggle("col-2");

  if (btnAfficherTableau.textContent.includes("Cacher")) {
    btnAfficherTableau.textContent = "Afficher le tableau des scores";
  } else {
    btnAfficherTableau.textContent = "Cacher le tableau des scores";
  }
};

btnAfficherTableau.addEventListener("click", afficherTab);
/*****/

let carteCliquee = null;
let carteClick = false;
let clic = 0;
let quellesCartesCliquees = [];

const retourneFace = (e) => {
  e.target.parentNode.classList.toggle("retourneFace");
  quellesCartesCliquees[0].parentNode.classList.toggle("retourneFace");
};

const retourneDos = (e) => {
  e.target.parentNode.classList.toggle("retourneDos");
  quellesCartesCliquees[0].parentNode.classList.toggle("retourneDos");
};

const displayNone = (element1, element2) => {
  element1.classList.toggle("d-none");
  element1.nextElementSibling.classList.toggle("d-none");
  if (element2) {
    element2.classList.toggle("d-none");
    element2.nextElementSibling.classList.toggle("d-none");
  }
};

const retournement = (e) => {
  console.log(clic);
  // Impossible de recliquer sur la même carte
  if (
    !e.target.classList.contains("face") &&
    !e.target.classList.contains("double-face") &&
    !e.target.classList.contains("carte") &&
    !e.target.classList.contains("retourneFace") &&
    !e.target.classList.contains("retourneDos")
  ) {
    if (carteCliquee === e.target) {
      console.log("stop");
      // carteCliquee = null;
      return;
    }
    carteCliquee = e.target;
    quellesCartesCliquees.push(carteCliquee);
    console.log(quellesCartesCliquees);
    // La carte est cliquée
    carteClick = true;
    // Après 300ms, on peut recliquer sur une autre
    setTimeout(() => {
      carteClick = false;
    }, 300);

    e.target.parentNode.classList.toggle("retourneDos");

    setTimeout(() => {
      displayNone(e.target);
    }, 500);

    clic += 1;

    if (clic == 2) {
      setTimeout(() => {
        retourneFace(e);
        retourneDos(e);

        setTimeout(() => {
          displayNone(e.target, quellesCartesCliquees[0]);
        }, 500);
        
      }, 2000);

      setTimeout(() => {
        retourneFace(e);
        carteCliquee = null;
        clic -= 2;
        quellesCartesCliquees = [];
      }, 3000);
    }
  }
};

Array.from(cartes).forEach((carte) => {
  carte.addEventListener("click", (e) => {
    console.log(carteClick, carteCliquee, clic);
    if (carteClick === false && clic < 2) {
      retournement(e);
    }
  });
});

/*****/

/* CHRONO */
let minutes = 0;
let secondes = 0;

let timeout;

let estArrete = true;

const demarrer = () => {
  if (estArrete) {
    estArrete = false;
    defilerTemps();
  }
};

const arreter = () => {
  if (!estArrete) {
    estArrete = true;
    clearTimeout(timeout);
  }
};

const defilerTemps = () => {
  if (estArrete) return;

  secondes = parseInt(secondes);
  minutes = parseInt(minutes);

  secondes++;

  if (secondes == 60) {
    minutes++;
    secondes = 0;
  }

  if (minutes == 60) {
    heures++;
    minutes = 0;
  }

  //   affichage
  if (secondes < 10) {
    secondes = "0" + secondes;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  chrono.textContent = `${minutes}:${secondes}`;

  timeout = setTimeout(defilerTemps, 1000);
};

const reset = () => {
  chrono.textContent = "00:00:00";
  estArrete = true;
  minutes = 0;
  secondes = 0;
  clearTimeout(timeout);
};

demarrer();
