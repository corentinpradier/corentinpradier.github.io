// Dans json/mobile-nav.js (ou ton fichier JS pour la nav mobile)

document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const headerRightGroup = document.querySelector('.header-right-group');
    const body = document.body;

    // Fonction pour fermer le menu (pour éviter la répétition)
    function closeMobileMenu() {
        headerRightGroup.classList.remove('active');
        const icon = mobileNavToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        mobileNavToggle.setAttribute('aria-label', 'Ouvrir le menu');
        // body.style.overflow = ''; // Débloquer le scroll si tu l'avais bloqué
    }

    if (mobileNavToggle && headerRightGroup) {
        mobileNavToggle.addEventListener('click', () => {
            headerRightGroup.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            if (headerRightGroup.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                mobileNavToggle.setAttribute('aria-label', 'Fermer le menu');
                // body.style.overflow = 'hidden'; // Bloquer le scroll
            } else {
                closeMobileMenu(); // Utilise la fonction pour fermer
            }
        });

        // --- MODIFICATION ICI ---
        // Fermer le menu si on clique sur un lien DEDANS, SAUF si c'est un toggle de dropdown
        headerRightGroup.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => { // Ajoute 'event'
                // Vérifie si le menu est actif
                if (headerRightGroup.classList.contains('active')) {
                    // Trouve le parent 'li' le plus proche
                    const parentLi = link.closest('li');

                    // Vérifie si ce 'li' est un conteneur de dropdown
                    if (parentLi && parentLi.classList.contains('dropdown-container')) {
                        // C'est un toggle de dropdown !
                        event.preventDefault(); // Empêche le lien de naviguer (surtout si href="#")
                        // NE PAS fermer le menu principal
                        console.log("Dropdown toggle clicked"); // Pour le débogage

                        // --- Logique pour ouvrir/fermer le sous-menu sur mobile ---
                        // Trouve le sous-menu associé
                        const dropdownMenu = parentLi.querySelector('.dropdown-menu');
                        if (dropdownMenu) {
                            // Bascule une classe pour l'affichage mobile du sous-menu
                            dropdownMenu.classList.toggle('mobile-open');
                            // Optionnel: Bascule aussi la rotation de la flèche
                            const caret = link.querySelector('.fa-caret-down');
                            if (caret) {
                                caret.style.transform = dropdownMenu.classList.contains('mobile-open') ? 'rotate(-90deg)' : 'rotate(0deg)';
                            }
                        }
                        // --- Fin de la logique sous-menu ---

                    } else {
                        // Ce n'est PAS un toggle de dropdown, c'est un lien normal
                        // Ferme le menu principal
                        closeMobileMenu();
                        // Le lien suivra son href normalement
                    }
                }
            });
        });
        // --- FIN DE LA MODIFICATION ---

    } else {
        console.warn("Éléments de navigation mobile non trouvés.");
    }
});
