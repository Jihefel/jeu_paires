let imagesFace = [
  "./public/img/AOC-Artist-Front-Headhunterz-min.jpg",
  "./public/img/AOC-Artist-Front-Headhunterz-min.jpg",
  "./public/img/AOC-Artist-Front-Wildstylez-2021-Alt.png",
  "./public/img/AOC-Artist-Front-Wildstylez-2021-Alt.png",
  "./public/img/AOC-Artist-Front-Noisecontrollers-min.jpg",
  "./public/img/AOC-Artist-Front-Noisecontrollers-min.jpg",
  "./public/img/AOC-Artist-Front-Project-One-min.jpg",
  "./public/img/AOC-Artist-Front-Project-One-min.jpg",
];

// Déclaration audio
const headhunterz = new Audio("../public/audio/headhunterz_notif.mp3");
headhunterz.volume = 0.25;

const noisecontrollers = new Audio("../public/audio/noisecontrollers.mp3");
noisecontrollers.volume = 0.1;

const projectOne = new Audio("../public/audio/projectOne.mp3");
projectOne.volume = 0.25;

const hover = new Audio("../public/audio/hover.mp3");
hover.volume = 0.02;

// Déclarations getElement et query
const videoBg = document.getElementById("videoBg");
const container = document.querySelector(".container-fluid");
const start = document.getElementById("start");
const inputGroup = document.getElementById("input-group");
const inputPseudo = document.getElementById("pseudo");
const validPseudo = document.getElementById("validPseudo");
const difficulty = document.getElementById("difficulty");
const selectDifficulty = document.getElementById("select-difficulty");
const validDifficulty = document.getElementById("valid-difficulty");
const chrono = document.getElementById("chrono");
const lignesCartes = document.querySelectorAll(".ligneCarte");
const faces = document.getElementsByClassName("face");
const dos = document.getElementsByClassName("dos");
const doubleFace = document.getElementsByClassName("double-face");
let cartes = document.getElementsByClassName("carte");
const dernieresCartes = document.getElementsByClassName("derniere");
const btnAfficherTableau = document.getElementById("btnAfficher");
const partieScore = document.getElementById("partieScore");
const partieJeu = document.getElementById("partieJeu");
let dernieresCol = [];
for (let i = 0; i < lignesCartes.length; i++) {
  dernieresCol.push(lignesCartes[i].lastElementChild);
}
console.log(dernieresCol);

function toggleClass(element, classe) {
  element.classList.toggle(classe);
}

function removeAddClass(element, classe1, classe2) {
  element.classList.remove(classe1);
  element.classList.add(classe2);
}

/*****/
let pseudo;

const setPseudo = () => {
  pseudo = inputPseudo.value;
  inputPseudo.value = "";
  toggleClass(inputGroup,"d-none");
  removeAddClass(difficulty,"d-none","d-flex");
};


const videoPreGame = () => {
  videoBg.volume = 0.3;
  videoBg.removeAttribute("loop");
    videoBg.src = "./public/video/ArtOfCreation.mp4"
    videoBg.load()
    toggleClass(partieJeu, "d-none");
    removeAddClass(partieJeu, "opacity-100", "opacity-0");
    Array.from(cartes).forEach(carte => {
      carte.classList.add("apparition")
    });
    setTimeout(() => {
      removeAddClass(partieJeu, "opacity-0", "opacity-100");
    }, 5000);
    setTimeout(() => {
      videoBg.setAttribute("muted","muted")
      videoBg.setAttribute("loop","loop")
      videoBg.src = "./public/video/AOC-Header-Portrait-Front.mp4"
      videoBg.load()
      Array.from(cartes).forEach(carte => {
        carte.classList.remove("apparition")
      });
      // setTimeout(() => {
    // }, 5000);
  }, 10000);
}



const setDifficulty = () => {
  switch (selectDifficulty.value) {
    // Mode normal
    case "normal":
      lignesCartes.forEach((ligne) => {
        if (ligne.classList.contains("row-cols-4")) {
          removeAddClass(ligne, "row-cols-4", "row-cols-3");
        }
      });
      // Suppression de Project One
      imagesFace.splice(6, 2);
      // Suppression des 2 cartes supplémentaires
      dernieresCol.forEach((col) => {
        col.style.display = "none";
      });
      videoPreGame()
      removeAddClass(difficulty,"d-flex", "d-none");
      // Suppression des dernières
      Array.from(dernieresCartes).forEach((carte) => {
        carte.remove();
      });
      break;
      
      // Mode difficile
      case "difficile":
        lignesCartes.forEach((ligne) => {
          if (ligne.classList.contains("row-cols-3")) {
            removeAddClass(ligne,"row-cols-3", "row-cols-4");
          }
        });
        videoPreGame()
        removeAddClass(difficulty,"d-flex", "d-none");
      imagesFace = [
        "./public/img/AOC-Artist-Front-Headhunterz-min.jpg",
        "./public/img/AOC-Artist-Front-Headhunterz-min.jpg",
        "./public/img/AOC-Artist-Front-Wildstylez-2021-Alt.png",
        "./public/img/AOC-Artist-Front-Wildstylez-2021-Alt.png",
        "./public/img/AOC-Artist-Front-Noisecontrollers-min.jpg",
        "./public/img/AOC-Artist-Front-Noisecontrollers-min.jpg",
        "./public/img/AOC-Artist-Front-Project-One-min.jpg",
        "./public/img/AOC-Artist-Front-Project-One-min.jpg",
      ];
      break;

    default:
      return;
  }
  bgDos();
  bgFace();
  container.style.backgroundColor = "transparent";

    removeAddClass(start, "d-flex", "d-none");
};

validPseudo.addEventListener("click", setPseudo);
validDifficulty.addEventListener("click", setDifficulty);

/*****/
const bgDos = () => {
  Array.from(dos).forEach((dos) => {
    dos.style.backgroundImage = `url(./public/img/dos-cartes.jpg)`;
    dos.style.backgroundSize = "contain";
    dos.style.backgroundRepeat = "no-repeat";
    dos.style.backgroundPosition = "center";
  });
};

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
/*****/

/*****/
const afficherTab = () => {
  if (
    partieJeu.classList.contains("col-10") ||
    start.classList.contains("col-10")
  ) {
    removeAddClass(partieJeu,"col-10", "col-12");
    removeAddClass(start,"col-10", "col-12");
  } else if (
    partieJeu.classList.contains("col-12") ||
    start.classList.contains("col-12")
    ) {
    removeAddClass(partieJeu,"col-12", "col-10");
    removeAddClass(start,"col-12", "col-10");
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

let cartesTrouvees = [];
let trouve = false;
let bgCarteMatch;

const verifCartes = (carte1, carte2) => {
  if (
    carte1.nextElementSibling.style.backgroundImage ===
    carte2.nextElementSibling.style.backgroundImage
  ) {
    cartesTrouvees.push(carte1.parentNode, carte2.parentNode);
    bgCarteMatch = carte1.nextElementSibling.style.backgroundImage.substring(
      5,
      carte1.nextElementSibling.style.backgroundImage.length - 2
    );
    // Audio quand match
    setTimeout(() => {
      switch (true) {
        case bgCarteMatch.toLowerCase().includes("headhunterz"):
          headhunterz.play();
          break;
        case bgCarteMatch.toLowerCase().includes("noisecontrollers"):
          noisecontrollers.play();
          break;
        case bgCarteMatch.toLowerCase().includes("wildstylez"):
          // wildstylez.play();
          break;
        case bgCarteMatch.toLowerCase().includes("project"):
          projectOne.play();
          break;

        default:
          break;
      }
    }, 1700);

    setTimeout(() => {
      cartesTrouvees.forEach((carte) => {
        carte.style.opacity = "70%";
        carte.style.pointerEvents = "none";
        carte.parentNode.style.cursor = "default";
        carte.parentNode.classList.add("match");
        return (trouve = true);
      });
      console.log("ok");
    }, 1500);
  }
  trouve = false;
};

const retournement = (e) => {
  // Impossible de recliquer sur la même carte
  if (
    !e.target.classList.contains("face") &&
    !e.target.classList.contains("double-face") &&
    !e.target.classList.contains("carte") &&
    !e.target.classList.contains("retourneFace") &&
    !e.target.classList.contains("retourneDos")
  ) {
    if (carteCliquee === e.target) {
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
    }, 400);

    clic += 1;

    if (clic == 2) {
      verifCartes(e.target, quellesCartesCliquees[0]);

      setTimeout(() => {
        console.log(trouve);
        if (trouve === true) {
          trouve = false;
          carteCliquee = null;
          clic -= 2;
          quellesCartesCliquees = [];
        } else {
          retourneFace(e);
          retourneDos(e);

          setTimeout(() => {
            displayNone(e.target, quellesCartesCliquees[0]);
          }, 400);

          setTimeout(() => {
            retourneFace(e);
            carteCliquee = null;
            clic -= 2;
            quellesCartesCliquees = [];
          }, 1000);
        }
        trouve = false;
      }, 1500);
    }
  }
};

Array.from(cartes).forEach((carte) => {
  carte.addEventListener("click", (e) => {
    if (carteClick === false && clic < 2) {
      retournement(e);
      demarrer();
    }
  });
  carte.addEventListener("mouseenter", () => {
    hover.play();
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
