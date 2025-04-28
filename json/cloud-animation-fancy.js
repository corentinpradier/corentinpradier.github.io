// Dans json/cloud-animation-fancy.js

document.addEventListener('DOMContentLoaded', () => {
    const cloudContainer = document.querySelector('.cloud-container');
    const cloudItems = document.querySelectorAll('.cloud-item');

    if (!cloudContainer || cloudItems.length === 0) {
        console.log("Éléments de nuage non trouvés pour l'animation.");
        return;
    }

    // --- Intersection Observer (Code existant - inchangé) ---
    const observerOptions = { /* ... */ };
    const observerCallback = (entries, observer) => { /* ... */ };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(cloudContainer);
    // --- Fin du code existant ---


    // --- Interaction Parallaxe (MODIFIÉE) ---
    const handleMouseMove = (event) => {
        if (!cloudContainer.classList.contains('visible')) {
            return;
        }

        const { clientX, clientY } = event;
        const globalIntensity = 0.3; // Intensité maximale quand la souris est très proche
        const maxReactionDistance = 300; // Distance (en pixels) au-delà de laquelle le nuage ne réagit plus

        cloudItems.forEach((item) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const cloudCenterX = left + width / 2; // Recalculé pour être au centre réel
            const cloudCenterY = top + height / 2; // Recalculé pour être au centre réel
            const deltaX = clientX - cloudCenterX;
            const deltaY = clientY - cloudCenterY;

            // Calcul de la distance réelle entre la souris et le centre du nuage
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            let localIntensity = 0; // Intensité par défaut (si trop loin)

            // Si la souris est dans la zone de réaction
            if (distance < maxReactionDistance) {
                // Calcule l'intensité locale : 1 quand distance=0, 0 quand distance=maxReactionDistance
                localIntensity = globalIntensity * (1 - distance / maxReactionDistance);
            }

            // Calcule le déplacement basé sur l'intensité locale
            const moveX = -deltaX * localIntensity;
            const moveY = -deltaY * localIntensity;

            const maxMove = 15; // Réduit peut-être un peu la limite max
            const clampedMoveX = Math.max(-maxMove, Math.min(maxMove, moveX));
            const clampedMoveY = Math.max(-maxMove, Math.min(maxMove, moveY));

            // Applique la transformation (sans rotation)
            item.style.transform = `translate(${clampedMoveX}px, ${clampedMoveY}px) scale(1)`;
        });
    };

    // Fonction pour réinitialiser (inchangée)
    const handleMouseLeave = () => {
        if (cloudContainer.classList.contains('visible')) {
            cloudItems.forEach(item => {
                item.style.transform = 'translate(0px, 0px) scale(1)';
            });
        }
    };

    // Ajoute les écouteurs d'événements (inchangé)
    cloudContainer.addEventListener('mousemove', handleMouseMove);
    cloudContainer.addEventListener('mouseleave', handleMouseLeave);
    // --- Fin de la nouvelle interaction ---

}); // Fin de DOMContentLoaded
