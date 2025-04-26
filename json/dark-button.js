document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Fonction pour appliquer le thème
    const applyTheme = (isDarkMode) => {
        if (isDarkMode) {
            body.classList.add('dark-theme'); // Ajoute la classe pour le thème sombre
            darkModeToggle.classList.add('active'); // Active l'état visuel du bouton
        } else {
            body.classList.remove('dark-theme'); // Retire la classe pour le thème sombre
            darkModeToggle.classList.remove('active'); // Désactive l'état visuel du bouton
        }
    };

    // Vérifier la préférence enregistrée au chargement
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    let isDarkMode;

    if (savedTheme === 'dark') {
        isDarkMode = true;
    } else if (savedTheme === 'light') {
        isDarkMode = false;
    } else {
        // Si pas de préférence sauvée, utiliser la préférence système
        isDarkMode = prefersDark;
    }

    applyTheme(isDarkMode); // Appliquer le thème initial

    // Gérer le clic sur le bouton
    darkModeToggle.addEventListener('click', () => {
        // Inverse l'état actuel
        const currentIsDark = body.classList.contains('dark-theme');
        const newIsDarkMode = !currentIsDark;

        applyTheme(newIsDarkMode); // Applique le nouveau thème

        // Sauvegarder la préférence
        localStorage.setItem('theme', newIsDarkMode ? 'dark' : 'light');
    });
}); // Fin de DOMContentLoaded
