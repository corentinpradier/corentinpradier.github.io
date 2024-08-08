import json

# Charger les activités depuis le fichier JSON
with open('../datas/activities.json', 'r') as f:
    activities = json.load(f)

# Générer le HTML
html_content = """
<!DOCTYPE html>
<html>

<head>
    <title>Mon site Web</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/style_header.css">
    <link rel="stylesheet" href="../css/style_footer.css">
    <link rel="stylesheet" href="../css/style_index.css">
    <link rel="stylesheet" href="../css/style_formation.css">
    <link rel="stylesheet" href="../css/style_course.css">

    <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Arsenal+SC:ital,wght@0,400;0,700;1,400;1,700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">

    <script src="../server/auth.js"></script> <!-- Ajouter le script d'authentification -->
    <script src="../javas/script.js"></script>
    <script src="../javas/course.js"></script>

</head>

<body>
    <header class="bandeau">
        <a class="title" href="../index.html">Corentin Pradier</a>
        <ul class="dropdownmenu">
            <li class="button_pp"><a href="course.html">Course</a></li>
            <li class="button_pp"><a href="experience.html">Expérience</a></li>
            <li class="button_pp"><a href="mesprojets.html">Mes projets</a></li>
            <li class="button_pp login-button"><a href="../index.html" id="logoutButton"><i class="fas fa-sign-out-alt"></i></a></li>
        </ul>
    </header>

    <div class="button-container">
        <div id="timeline-button" class="switch-button" onclick="switchView('timeline')">Timeline</div>
        <div id="results-button" class="switch-button" onclick="switchView('results')">Résultats</div>
    </div>

    <div class="content-wrapper">
        
        <div id="timeline-section" class="content-section">
            <div class="timeline">
"""

L = len(activities)
for i, activity in enumerate(activities):
    distance_km = activity['distance'] / 1000  # Convert meters to kilometers
    moving_time_min = activity['moving_time'] / 60  # Convert seconds to minutes
    avrage_speed = activity['average_speed']*3.6  # Calculate average speed in km/h
    max_speed = activity['max_speed']*3.6

    html_content += f"""
    <section class="year">
        <div class="year-header">
            <h2>Course n°{L - i}</h2>
            <h3><em>{activity['start_date_local']}</em></h3>
        </div>
        <div class="subjects">
            <div class="column">
                <h3>Distance</h3>
                <p>{distance_km:.2f} km</p>
            </div>
            <div class="column">
                <h3>Temps</h3>
                <p>{moving_time_min:.2f} min</p>
            </div>
            <div class="column">
                <h3>Vitesse moyenne</h3>
                <p>{avrage_speed:.2f} km/h</p>
            </div>
             <div class="column">
                <h3>Vitesse max</h3>
                <p>{max_speed:.2f} km/h</p>
            </div>
        </div>
    </section>
    """

html_content += """
        <div id="results-section" class="content-section">
            <iframe src="../python/strava_activities.html" width="80%" height="600" style="border:none;"></iframe>
        </div>
    </div>


    <footer class="footer">
        <div class="footer-container">
            <div class="footer-section contact">
                <h2 class="footer-title">Contactez-moi</h2>
                <p class="center"><i class="las la-envelope"></i> corentinpradier @ gmail.com</p>
                <p class="center"><i class="las la-phone"></i> </p>
                <div class="socials">
                    <a href="https://www.linkedin.com/in/corentin-pradier-120194223" target="_blank"><i class="lab la-linkedin"></i></a>
                    <a href="https://github.com/corentinpradier" target="_blank"><i class="lab la-github"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2024 Corentin Pradier | Designed by Corentin Pradier
        </div>
    </footer>

</body>

</html>

"""

# Enregistrer le HTML généré dans un fichier
with open('../private/course.html', 'w') as f:
    f.write(html_content)