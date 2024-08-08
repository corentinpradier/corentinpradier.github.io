import requests
import pandas as pd
import matplotlib.pyplot as plt

# # Exemple d'utilisation
client_id = '131806'
# client_secret = 'dde76dc82d8368dccc20ba134665012ead5aeabd'
# refresh_token = 'a53bcf91e693e4bfef71c7d32033018a579c556f'

access_token = '35fa80202e58068fcda2828dac4a2fd5457c21ba'

headers = {
    'Authorization': f'Bearer {access_token}'
}

print('###############')
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
    print(activities)
else:
    print("Erreur lors de la récupération des activités :", response.json())


