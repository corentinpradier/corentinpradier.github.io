document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    // Vérifie si l'élément header existe
    if (!header) {
        console.error("L'élément avec la classe .header est introuvable.");
        return; // Arrête l'exécution si le header n'est pas trouvé
    }

    let lastScrollTop = 0; // Stocke la dernière position de scroll
    const delta = 10; // Seuil de scroll avant de réagir (évite les faux positifs)
    const headerHeight = header.offsetHeight; // Récupère la hauteur calculée du header

    // Ajoute un écouteur d'événement sur le scroll de la fenêtre
    window.addEventListener('scroll', function() {
        // Récupère la position verticale actuelle du scroll
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Ignore les scrolls trop petits (inférieurs au delta)
        if (Math.abs(lastScrollTop - currentScrollTop) <= delta) {
            return;
        }

        // Vérifie si on scrolle vers le bas ET qu'on a dépassé la hauteur du header
        if (currentScrollTop > lastScrollTop && currentScrollTop > headerHeight) {
            // Scroll vers le bas -> Cache le header en ajoutant la classe
            header.classList.add('header--hidden');
        } else {
            // Scroll vers le haut (ou on est tout en haut) -> Affiche le header
            if (currentScrollTop < lastScrollTop) {
                 header.classList.remove('header--hidden');
            }
            // Si on est très proche du haut, on s'assure qu'il est visible aussi
            if (currentScrollTop <= headerHeight / 2) { // Petite marge
                 header.classList.remove('header--hidden');
            }
        }

        // Met à jour la dernière position de scroll pour la prochaine comparaison
        // S'assure que lastScrollTop n'est jamais négatif
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;

    }, false); // Utilise la phase de bouillonnement (standard)
});
