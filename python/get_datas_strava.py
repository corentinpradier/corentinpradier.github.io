import requests

def recuperation_API_strava():
    # Exemple d'utilisation
    access_token = '35fa80202e58068fcda2828dac4a2fd5457c21ba'

    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    # URL pour récupérer les activités
    activities_url = f'https://www.strava.com/api/v3/activities'

    # Définir les en-têtes pour l'authentification
    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    # Effectuer la requête
    response = requests.get(activities_url, headers=headers)

    # Vérifier le statut de la réponse
    if response.status_code == 200:
        activities = response.json()
        # print(activities[0])
        return activities[0]

    else:
        print("Erreur lors de la récupération des activités :", response.json())

