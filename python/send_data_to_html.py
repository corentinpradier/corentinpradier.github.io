import json
import time
from get_datas_strava import get_main_datas, recuperation_API_strava

def update_json_file(filename):
    while True:
        # Générer des données aléatoires (ou récupérer vos données réelles)
        activities = recuperation_API_strava()
        new_data = get_main_datas(activities)


        # Charger les données existantes
        try:
            with open(filename, 'r') as file:
                data = json.load(file)
        except FileNotFoundError:
            data = []

        # Ajouter les nouvelles données
        data.append(new_data)

        # Écrire les données mises à jour dans le fichier
        with open(filename, 'w') as file:
            json.dump(data, file)

        # Attendre un certain temps avant de mettre à jour à nouveau
        time.sleep(1800)

if __name__ == "__main__":
    update_json_file('data.json')
