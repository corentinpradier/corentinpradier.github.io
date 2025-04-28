// Dans un nouveau fichier js/carousel.js (ou autre)

document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.getElementById('projectCarousel');
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');

    // Vérifie si tous les éléments nécessaires existent
    if (!carouselContainer || !prevBtn || !nextBtn) {
        console.warn("Éléments du carrousel non trouvés.");
        return; // Ne fait rien si un élément manque
    }

    // Fonction pour vérifier et mettre à jour l'état des boutons
    const updateArrowState = () => {
        const scrollLeft = carouselContainer.scrollLeft;
        const maxScrollLeft = carouselContainer.scrollWidth - carouselContainer.clientWidth;

        // Tolérance pour éviter les erreurs d'arrondi
        const tolerance = 1;

        // Désactive le bouton Précédent si on est au début
        if (scrollLeft <= tolerance) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }

        // Désactive le bouton Suivant si on est à la fin
        if (scrollLeft >= maxScrollLeft - tolerance) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    };

    // Écouteur pour le bouton Suivant
    nextBtn.addEventListener('click', () => {
        // Calcule la largeur d'une carte + le gap
        const card = carouselContainer.querySelector('.first-card, .second-card, .other-card'); // Prend la première carte trouvée
        if (!card) return;

        const cardWidth = card.offsetWidth; // Largeur visible de la carte
        const style = window.getComputedStyle(carouselContainer);
        const gap = parseFloat(style.gap) || 0; // Récupère la valeur du gap

        const scrollAmount = cardWidth + gap; // Défile d'une carte + l'espace

        carouselContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth' // Défilement fluide
        });
    });

    // Écouteur pour le bouton Précédent
    prevBtn.addEventListener('click', () => {
        const card = carouselContainer.querySelector('.first-card, .second-card, .other-card');
        if (!card) return;

        const cardWidth = card.offsetWidth;
        const style = window.getComputedStyle(carouselContainer);
        const gap = parseFloat(style.gap) || 0;

        const scrollAmount = cardWidth + gap;

        carouselContainer.scrollBy({
            left: -scrollAmount, // Défile vers la gauche
            behavior: 'smooth'
        });
    });

    // Met à jour l'état des flèches à chaque fois que le défilement se termine
    carouselContainer.addEventListener('scroll', updateArrowState);

    // Met à jour l'état initial au chargement
    // Utilise un petit délai pour s'assurer que le layout est stable
    setTimeout(updateArrowState, 100);
    // Met aussi à jour si la fenêtre est redimensionnée
    window.addEventListener('resize', updateArrowState);

}); // Fin de DOMContentLoaded
