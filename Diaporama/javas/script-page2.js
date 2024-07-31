// Variables globales
let compteur = 0; // compteur qui permet de connaitre l'image sur laquelle on se trouve 
let timer, elements, slides, slidewidth, speed, transition;

window.onload = () => {
    //on récupère le diaporama
    const diapo = document.querySelector(".diapo");
    // onrécupère le data-speed
    speed = diapo.dataset.speed;
    transition = diapo.dataset.transition;

    elements = document.querySelector(".elements");

    //on clone la 1ere image
    let firstImage = elements.firstElementChild.cloneNode(true);

    //on injecte le clone à la fin du diapo
    elements.appendChild(firstImage);

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

    //ongère l'arrêt et la reprise du diapo
    diapo.addEventListener("mouseover", stopTimer);
    diapo.addEventListener("mouseout", startTimer);
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
    setTimeout(function(){
        if(compteur >= slides.length - 1){
            compteur = 0;
            elements.style.transition = "unset";
            elements.style.transform = "translateX(0)";
        }
    }, transition);
}

/* 
Cette fonction fait déflier le diapo vers la gauche
*/
function slidePrev(){
    // on défile le compteur 
    compteur--;
    elements.style.transition = transition+"ms linear";

    if(compteur < 0){
        compteur = slides.length - 1;
        let decal = -slidewidth * compteur;
        elements.style.transition = "unset";
        elements.style.transform = `translateX(${decal}px)`;
        setTimeout(slidePrev,1);
    }

    let decal = -slidewidth*compteur;
    elements.style.transform = `translateX(${decal}px)`;

}

function stopTimer(){
    clearInterval(timer);
}

function startTimer(){
    timer = setInterval(slideNext, speed);
}