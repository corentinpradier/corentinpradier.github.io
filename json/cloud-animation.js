// Attend que le contenu HTML soit chargé
document.addEventListener('DOMContentLoaded', () => {

    // Sélectionne le conteneur des nuages
    const cloudContainer = document.querySelector('.cloud-container');

    // Vérifie si le conteneur existe sur la page
    if (!cloudContainer) {
        console.log("Conteneur de nuages non trouvé."); // Message pour le débogage
        return; // Sort si le conteneur n'est pas là
    }

    // Options pour l'Intersection Observer
    const observerOptions = {
        root: null, // Observe par rapport au viewport
        rootMargin: '0px', // Pas de marge supplémentaire
        threshold: 0.8 // Déclenche quand 15% du conteneur est visible
    };

    // Fonction appelée quand l'état de visibilité change
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Si l'élément devient visible (intersecting)
            if (entry.isIntersecting) {
                console.log("Nuages visibles !"); // Message pour le débogage
                // Ajoute la classe 'visible' au conteneur
                entry.target.classList.add('visible');
                // Optionnel: Arrête d'observer cet élément une fois qu'il est visible
                observer.unobserve(entry.target);
            }
        });
    };

    // Crée l'observateur
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Commence à observer le conteneur des nuages
    observer.observe(cloudContainer);

}); // Fin de DOMContentLoaded
