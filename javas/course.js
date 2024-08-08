function switchView(view) {
    var timelineSection = document.getElementById('timeline-section');
    var resultsSection = document.getElementById('results-section');
    var timelineButton = document.getElementById('timeline-button');
    var resultsButton = document.getElementById('results-button');

    // Détermine les classes d'animation à appliquer
    var outClass = view === 'timeline' ? 'slide-out-right' : 'slide-out-left';
    var inClass = view === 'timeline' ? 'slide-in-left' : 'slide-in-right';

    // Cacher la section active actuelle avec l'animation de sortie
    var activeSection = document.querySelector('.content-section:not(.hidden)');
    var nextSection = view === 'timeline' ? timelineSection : resultsSection;

    if (activeSection !== nextSection) {
        activeSection.classList.add(outClass);
        nextSection.classList.remove('hidden');
        nextSection.classList.add(inClass);

        setTimeout(function() {
            activeSection.classList.add('hidden');
            activeSection.classList.remove(outClass);
            nextSection.classList.remove(inClass);
        }, 500);
    }

    // Met à jour l'état des boutons
    timelineButton.classList.toggle('active', view === 'timeline');
    resultsButton.classList.toggle('active', view === 'results');
}

window.onload = function() {
    // Initialiser la vue avec la section 'timeline'
    var timelineSection = document.getElementById('timeline-section');
    var resultsSection = document.getElementById('results-section');

    // Assurer que la section 'timeline' est visible et 'results' est cachée
    timelineSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');

    // Initialiser les boutons
    document.getElementById('timeline-button').classList.add('active');
    document.getElementById('results-button').classList.remove('active');
}
