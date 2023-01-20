let imagesFace = [
  "./public/img/AOC-Artist-Front-Headhunterz-min.jpg",
  "./public/img/AOC-Artist-Front-Headhunterz-min.jpg",
  "./public/img/AOC-Artist-Front-Wildstylez-2021-Alt.png",
  "./public/img/AOC-Artist-Front-Wildstylez-2021-Alt.png",
  "./public/img/AOC-Artist-Front-Noisecontrollers-min.jpg",
  "./public/img/AOC-Artist-Front-Noisecontrollers-min.jpg",
];

let attributesCard = ["Headhunterz", "Headhunterz", "Wildstylez", "Wildstylez", "Noisecontrollers", "Noisecontrollers"]

const faces = document.getElementsByClassName("face");

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
bgFace()

const btnAfficherTableau = document.getElementById("btnAfficher")
const partieScore = document.getElementById("partieScore");
const partieJeu = document.getElementById("partieJeu");

const afficherTab = () => {
    if (partieJeu.classList.contains("col-10")) {
        partieJeu.classList.remove("col-10")
        partieJeu.classList.add("col-12")
    } else if (partieJeu.classList.contains("col-12")) {
        partieJeu.classList.add("col-10")
        partieJeu.classList.remove("col-12")
    }
    partieScore.classList.toggle("d-none");
    partieScore.classList.toggle("col-2");
    if (btnAfficherTableau.textContent.includes("Cacher")) {
        btnAfficherTableau.textContent = "Afficher le tableau des scores";
    } else {
        btnAfficherTableau.textContent = "Cacher le tableau des scores";
    }
    console.log(partieJeu.classList);
}

btnAfficherTableau.addEventListener("click",afficherTab)
