document.addEventListener("DOMContentLoaded", function() {
    var fadeInTexts = document.querySelectorAll('.fade-in-text');

    window.addEventListener('scroll', function() {
        fadeInTexts.forEach(function(fadeInText) {
            if (isElementInViewport(fadeInText)) {
                fadeInText.classList.add('visible');
            }
        });
    });

    function isElementInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }
});

window.addEventListener('load', () => {
    const title = document.getElementById('title');
    title.style.opacity = 1;
});

