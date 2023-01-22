let imagesFace = [];

let imagesNormal = [
  "./public/img/AOC-Artist-Front-Headhunterz-min.jpg",
  "./public/img/AOC-Artist-Front-Headhunterz-min.jpg",
  "./public/img/AOC-Artist-Front-Wildstylez-2021-Alt.png",
  "./public/img/AOC-Artist-Front-Wildstylez-2021-Alt.png",
  "./public/img/AOC-Artist-Front-Noisecontrollers-min.jpg",
  "./public/img/AOC-Artist-Front-Noisecontrollers-min.jpg",
];

let imagesDifficiles = [
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
headhunterz.volume = 0.5;

const wildstylez = new Audio("../public/audio/wildstylez.mp3");
wildstylez.volume = 0.25;

const noisecontrollers = new Audio("../public/audio/noisecontrollers.mp3");
noisecontrollers.volume = 0.25;

const projectOne = new Audio("../public/audio/projectOne.mp3");
projectOne.volume = 0.5;

const hover = new Audio("../public/audio/hover.mp3");
hover.volume = 0.02;

let musics = [
  new Audio("../public/audio/Bass Modulators - Live And Let Die.mp3"),
  new Audio("../public/audio/Headhunterz - Takin It Back.mp3"),
];
musics.forEach((musique) => {
  musique.volume = 0.2;
});

// Déclarations getElement et query
let videoBg = document.getElementById("videoBg");
let container = document.querySelector(".container-fluid");
let start = document.getElementById("start");
let getPseudo = document.getElementById("getPseudo");
let inputGroup = document.getElementById("input-group");
let inputPseudo = document.getElementById("pseudo");
let validPseudo = document.getElementById("validPseudo");
let difficulty = document.getElementById("difficulty");
let selectDifficulty = document.getElementById("select-difficulty");
let validDifficulty = document.getElementById("valid-difficulty");
let chrono = document.getElementById("chrono");
let lignesCartes = document.querySelectorAll(".ligneCarte");
let faces = document.getElementsByClassName("face");
let dos = document.getElementsByClassName("dos");
let doubleFace = document.getElementsByClassName("double-face");
let cartes = document.getElementsByClassName("carte");
let dernieresCartes = document.getElementsByClassName("derniere");
let btnAfficherTableau = document.getElementById("btnAfficher");
let partieScore = document.getElementById("partieScore");
let partieJeu = document.getElementById("partieJeu");
let replayBtn = document.getElementById("replay");
let tBody = document.querySelector("tbody");
let col = document.querySelectorAll("col");

let tableauDernieresCartes = [];
Array.from(dernieresCartes).forEach((derniere) => {
  tableauDernieresCartes.push(derniere);
});

let dernieresCol = [];
for (let i = 0; i < lignesCartes.length; i++) {
  dernieresCol.push(lignesCartes[i].lastElementChild);
}

function toggleClass(element, classe) {
  element.classList.toggle(classe);
}

function removeAddClass(element, classe1, classe2) {
  element.classList.remove(classe1);
  element.classList.add(classe2);
}

/*****/

let pseudo;
let ligneJoueur = 0;
let pseudoTableau = [];
let tempsTableau = [];
let difficulteTableau = [];
let joueurs = document.querySelectorAll("tbody > tr");
let cartesTrouvees = [];
let trouve = false;
let carteCliquee = null;
let carteClick = false;
let clic = 0;
let quellesCartesCliquees = [];
let essais = 0;
let nombreCartesATrouver;
let difficulte;

selectDifficulty.addEventListener("change", (e) => {
  difficulte = e.target.value;
});

joueurs.forEach((joueur) => {
  pseudoTableau.push(joueur.firstElementChild);
});
joueurs.forEach((joueur) => {
  tempsTableau.push(joueur.firstElementChild.nextElementSibling);
});
joueurs.forEach((joueur) => {
  difficulteTableau.push(joueur.lastElementChild);
});

const init = () => {
  const setPseudo = () => {
    if (inputPseudo.value === "") {
      return;
    } else if (
      inputPseudo.value === null ||
      inputPseudo.value === undefined ||
      inputPseudo.value.length < 4
    ) {
      inputPseudo.placeholder = "Introduisez un pseudo plus grand";
      inputPseudo.value = "";
      return;
    } else {
      pseudo = inputPseudo.value;
      pseudo =
        pseudo.charAt(0).toUpperCase() + pseudo.substring(1).toLowerCase();
      pseudoTableau[ligneJoueur].textContent = pseudo;
      removeAddClass(difficulty, "d-none", "d-flex");
      if (difficulty.classList.contains("d-flex")) {
        getPseudo.classList.add("d-none")
      }
    }
  };

  const videoPreGame = () => {
    videoBg.volume = 0.3;
    videoBg.removeAttribute("loop");
    videoBg.src = "./public/video/ArtOfCreation.mp4";
    videoBg.load();
    if (partieJeu.classList.contains("d-none")) {
      partieJeu.classList.remove("d-none");
    }
    removeAddClass(partieJeu, "opacity-100", "opacity-0");
    Array.from(cartes).forEach((carte) => {
      carte.classList.add("apparition");
    });
    setTimeout(() => {
      removeAddClass(partieJeu, "opacity-0", "opacity-100");
    }, 5000);
    setTimeout(() => {
      videoBg.setAttribute("muted", "muted");
      videoBg.setAttribute("loop", "loop");
      videoBg.src = "./public/video/AOC-Header-Portrait-Front.mp4";
      videoBg.load();
      Array.from(cartes).forEach((carte) => {
        carte.classList.remove("apparition");
      });
      musics[0].play();
    }, 10000);
  };

  const setDifficulty = () => {
    switch (difficulte) {
      // Mode normal
      case "1":
        difficulteTableau[ligneJoueur].textContent = "Normal";
        lignesCartes.forEach((ligne) => {
          if (ligne.classList.contains("row-cols-4")) {
            removeAddClass(ligne, "row-cols-4", "row-cols-3");
          }
        });
        // Suppression de Project One
        imagesFace = imagesNormal.slice();
        // Suppression des 2 cartes supplémentaires
        dernieresCol.forEach((col) => {
          toggleClass(col, "d-none");
        });
        videoPreGame();
        removeAddClass(difficulty, "d-flex", "d-none");
        // Suppression des dernières
        if (col.length < 6)
          dernieresCol.forEach((col) => {
            col.remove();
          });
        nombreCartesATrouver = imagesFace.length;
        break;

      // Mode difficile
      case "2":
        difficulteTableau[ligneJoueur].textContent = "Difficile";
        lignesCartes.forEach((ligne) => {
          if (ligne.classList.contains("row-cols-3")) {
            removeAddClass(ligne, "row-cols-3", "row-cols-4");
          }
        });
        videoPreGame();
        removeAddClass(difficulty, "d-flex", "d-none");
        imagesFace = imagesDifficiles.slice();
        nombreCartesATrouver = imagesFace.length;
        if (col.length != 8)
          for (let i = 0; i < lignesCartes.length; i++) {
            lignesCartes[i].appendChild(dernieresCol[i]);
            if (dernieresCol[i].classList.contains("d-none")) {
              dernieresCol[i].classList.remove("d-none");
            }
          }
        break;

      default:
        return;
    }
    bgDos();
    bgFace();
    container.style.background = "transparent";
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
    imagesFace = imagesDifficiles;
  };
  /*****/

  /*****/
  const afficherTab = () => {
    // Offcanvas Bootstrap

    if (btnAfficherTableau.textContent.includes("Cacher")) {
      btnAfficherTableau.textContent = "Afficher le tableau des scores";
    } else {
      btnAfficherTableau.textContent = "Cacher le tableau des scores";
    }
  };

  btnAfficherTableau.addEventListener("click", afficherTab);
  /*****/

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

  const help = () => {
    const cartesFace = [...faces];
    if (essais == 2) {
      for (let i = 0; i < cartesFace.length; i++) {
        if (
          cartesFace[i].style.backgroundImage ===
          quellesCartesCliquees[0].nextElementSibling.style.backgroundImage
        ) {
          cartesFace[i].parentNode.style.filter =
            "drop-shadow(0 0 15px silver)";
        }
      }
    } else if (essais > 2) {
      for (let i = 0; i < cartesFace.length; i++) {
        cartesFace[i].parentNode.style.filter = "none";
      }
      essais = 1;
    } else {
      for (let i = 0; i < cartesFace.length; i++) {
        cartesFace[i].parentNode.style.filter = "none";
      }
    }
  };

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
      nombreCartesATrouver -= 2;
      // Fin de partie
      if (nombreCartesATrouver === 0) {
        setTimeout(() => {
          arreter();
          tempsTableau[ligneJoueur].textContent = chrono.textContent;
          setTimeout(() => {
            removeAddClass(
              document.getElementsByClassName("grille")[0],
              "d-flex",
              "d-none"
            );
            toggleClass(replayBtn, "d-none");
          }, 2000);
        }, 3000);
      }
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
            wildstylez.play();
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
      }, 1500);
      essais = -1;
    }
    trouve = false;
    essais++;
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
      help();
      // La carte est cliquée
      carteClick = true;
      // Après 300ms, on peut recliquer sur une autre
      setTimeout(() => {
        carteClick = false;
      }, 250);

      e.target.parentNode.classList.toggle("retourneDos");

      setTimeout(() => {
        displayNone(e.target);
      }, 400);
      clic += 1;

      if (clic == 2) {
        verifCartes(e.target, quellesCartesCliquees[0]);

        setTimeout(() => {
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
            }, 800);
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
};

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
  chrono.textContent = "00:00";
  estArrete = true;
  minutes = 0;
  secondes = 0;
  clearTimeout(timeout);
};
/*** CHRONO ****/

init();

const nouvellePartie = () => {
  inputPseudo.value = "";
  // Bouton disparaît
  toggleClass(replayBtn, "d-none");
  // Chrono retourne à 0
  reset();
  removeAddClass(start, "d-none", "d-flex");
  toggleClass(getPseudo, "d-none");
  toggleClass(partieJeu, "d-none");
  removeAddClass(
    document.getElementsByClassName("grille")[0],
    "d-none",
    "d-flex"
  );
  Array.from(dos).forEach((dos) => {
    toggleClass(dos, "d-none");
  });
  Array.from(faces).forEach((face) => {
    toggleClass(face, "d-none");
  });
  Array.from(doubleFace).forEach((double) => {
    toggleClass(double, "retourneDos");
  });
  cartesTrouvees.forEach((carte) => {
    carte.style.opacity = "100%";
    carte.style.pointerEvents = "all";
    carte.parentNode.style.cursor = "pointer";
  });
  Array.from(cartes).forEach((carte) => {
    toggleClass(carte, "match");
  });
  cartesTrouvees = [];
  selectDifficulty.value = "";
  difficulte = "";
  imagesFace = imagesDifficiles.slice();
  essais = 0;
  ligneJoueur++;
  init();
};

replayBtn.addEventListener("click", nouvellePartie);
