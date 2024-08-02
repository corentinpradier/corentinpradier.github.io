// Variables globales
let compteur = 1; // compteur qui permet de connaitre l'image sur laquelle on se trouve 
let timer, elements, slides, slidewidth, speed, transition;

window.onload = () => {
    //on récupère le diaporama
    const diapo = document.querySelector(".diapo");
    // onrécupère le data-speed
    speed = diapo.dataset.speed;
    transition = diapo.dataset.transition;

    elements = document.querySelector(".elements");

    //première image et deuxième image
    Image1 = elements.firstElementChild

    //on clone la 1ere image
    let firstImage = elements.firstElementChild.cloneNode(true);
    let lastImage = elements.lastElementChild.cloneNode(true);

    //on injecte le clone à la fin du diapo
    elements.appendChild(firstImage);

    //on injecte le clone de la dernière image au début du diapo
    elements.insertBefore(lastImage, Image1);

    //on injecte la troisième image à la fin du diapo 
    let thirdImage = elements.children[2].cloneNode(true);
    elements.appendChild(thirdImage);

    slides = Array.from(elements.children);

    //on récupère la largeur d'une slide
    slidewidth = diapo.getBoundingClientRect().width;

    //on récupère les flèches 
    let next = document.querySelector("#nav-droite");
    let prev = document.querySelector("#nav-gauche");

    //on gère le clic
    next.addEventListener("click", slideNext);
    prev.addEventListener("click", slidePrev);

    //on automatise le défilement
    timer = setInterval(slideNext, speed)

    //on gère l'arrêt et la reprise du diapo
    diapo.addEventListener("mouseover", stopTimer);
    diapo.addEventListener("mouseout", startTimer);

    //Apparître sur la deuxième image !
    elements.style.transition = "unset";
    elements.style.transform = `translateX(${-slidewidth}px)`;
}

/*
Cette fonction fait défile le diaporama vers la droite
*/
function slideNext() {
    //on incrémente le compteur
    compteur++;
    elements.style.transition = transition + "ms linear";

    let decal = -slidewidth * compteur;
    elements.style.transform = `translateX(${decal}px)`;

    //on attend la fin de la ransition et on rembobine de facon cachée
    setTimeout(function () {
        if (compteur >= slides.length - 2) {
            compteur = 1;
            elements.style.transition = "unset";
            // permet de revenir à la deuxième image après être arrivé à la fin
            elements.style.transform = `translateX(${-slidewidth * compteur}px)`;
        }

    }, transition);
}

/* 
Cette fonction fait déflier le diapo vers la gauche
*/
function slidePrev() {
    // on défile le compteur 
    compteur--;
    elements.style.transition = transition + "ms linear";

    if (compteur < 1) {
        compteur = slides.length - 2;
        let decal = -slidewidth * compteur;
        elements.style.transition = "unset";
        elements.style.transform = `translateX(${decal}px)`;
        setTimeout(slidePrev, 0.1);
    }

    let decal = -slidewidth * compteur;
    elements.style.transform = `translateX(${decal}px)`;

}

function stopTimer() {
    clearInterval(timer);
}

function startTimer() {
    timer = setInterval(slideNext, speed);
}