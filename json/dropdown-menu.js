// Dans le fichier JS qui gère tes menus (ex: header.js ou dropdown-menu.js)
document.addEventListener('DOMContentLoaded', () => {

    // --- Code pour TOUS les menus déroulants ---
    const dropdownContainers = document.querySelectorAll('.dropdown-container');

    dropdownContainers.forEach(container => {
        const link = container.querySelector('a'); // Trouve le lien DANS ce conteneur
        const menu = container.querySelector('.dropdown-menu'); // Trouve le menu DANS ce conteneur

        if (link && menu) {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Empêche la navigation si href="#"

                // Vérifie si le menu actuel est déjà ouvert
                const isCurrentlyOpen = menu.classList.contains('show');

                // Optionnel : Ferme d'abord tous les autres menus ouverts
                document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                    if (openMenu !== menu) { // Ne ferme pas celui sur lequel on vient de cliquer
                        openMenu.classList.remove('show');
                        // Enlève aussi la classe 'open' du conteneur parent correspondant
                        openMenu.closest('.dropdown-container')?.classList.remove('open');
                    }
                });

                // Ouvre ou ferme le menu actuel
                menu.classList.toggle('show');
                // Ajoute/enlève la classe 'open' sur le conteneur pour la flèche
                container.classList.toggle('open');
            });
        }
    });

    // Ferme tous les menus si on clique n'importe où ailleurs sur la page
    document.addEventListener('click', (event) => {
        // Vérifie si le clic n'est PAS à l'intérieur d'un conteneur de dropdown
        if (!event.target.closest('.dropdown-container')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                openMenu.classList.remove('show');
                openMenu.closest('.dropdown-container')?.classList.remove('open');
            });
        }
        // Note : Si tu cliques sur un lien DANS le menu (ex: "Formation"),
        // la navigation se fera et la page se rechargera, fermant le menu.
        // Si ce sont des liens qui ne rechargent pas la page (SPA), il faudrait ajouter
        // une logique ici pour fermer le menu quand on clique sur un item.
    });

    // Optionnel : Ferme les menus avec la touche Echap
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                openMenu.classList.remove('show');
                openMenu.closest('.dropdown-container')?.classList.remove('open');
            });
        }
    });
    // --- Fin du code pour les menus déroulants ---


    // --- Assure-toi que ton code existant (dark mode, scroll header) est aussi ici ---
    // ... (code du dark mode) ...
    // ... (code du scroll header) ...

}); // Fin de DOMContentLoaded
