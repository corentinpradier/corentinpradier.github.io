import matplotlib.pyplot as plt
import pandas as pd
import plotly.graph_objects as go
import plotly.io as pio
from pandas import json_normalize


def plot_time_series(activities):

    df = json_normalize(activities)

    # Convertir la colonne 'start_date' en datetime
    df['start_date'] = pd.to_datetime(df['start_date'])

    # Extraire la date (sans l'heure) pour un affichage plus propre
    df['start_date_only'] = df['start_date'].dt.date

    fig = go.Figure()

    # Ajouter les traces pour chaque variable
    fig.add_trace(go.Scatter(x=df['start_date_only'], y=df['distance']/1000, mode='lines+markers', name='Distance (km)'))
    fig.add_trace(go.Scatter(x=df['start_date_only'], y=df['moving_time']/60, mode='lines+markers', name='Temps de déplacement (min)'))
    fig.add_trace(go.Scatter(x=df['start_date_only'], y=df['average_speed']*3.6, mode='lines+markers', name='Vitesse moyenne (km/h)'))
    fig.add_trace(go.Scatter(x=df['start_date_only'], y=df['max_speed']*3.6, mode='lines+markers', name='Vitesse maximale (km/h)'))

    # Mettre en place les boutons pour choisir les variables à afficher
    fig.update_layout(
        updatemenus=[
            dict(
                active=0,
                buttons=list([
                    dict(label="Distance",
                        method="update",
                        args=[{"visible": [True, False, False, False]},
                            {"title": "Distance en fonction du temps"}]),
                    dict(label="Temps de déplacement",
                        method="update",
                        args=[{"visible": [False, True, False, False]},
                            {"title": "Temps de déplacement en fonction du temps"}]),
                    dict(label="Vitesse moyenne",
                        method="update",
                        args=[{"visible": [False, False, True, False]},
                            {"title": "Vitesse moyenne en fonction du temps"}]),
                    dict(label="Vitesse maximale",
                        method="update",
                        args=[{"visible": [False, False, False, True]},
                            {"title": "Vitesse maximale en fonction du temps"}]),
                    dict(label="Tout",
                        method="update",
                        args=[{"visible": [True, True, True, True]},
                            {"title": "Toutes les variables en fonction du temps"}])
                ]),
            )
        ])

    # Configurer les axes et le titre avec unités et limites
    fig.update_layout(
        title="Analyse des Activités Strava",
        xaxis_title="Date",
        yaxis_title="Valeurs",
        legend_title="Variables",
        template="plotly_white",
        yaxis=dict(
            title="Valeurs",
            titlefont=dict(size=14),
            tickfont=dict(size=14),
            range=[0, max(df['distance'].max(), df['moving_time'].max(), df['average_speed'].max(), df['max_speed'].max()) * 1.1]
        ),
        xaxis=dict(
            title="Date",
            titlefont=dict(size=14),
            tickfont=dict(size=14),
            range=[df['start_date_only'].min(), df['start_date_only'].max()]
        )
    )

    # Afficher le graphique
    # fig.show()
    pio.write_html(fig, file='strava_activities.html', auto_open=True)
