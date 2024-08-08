import requests

client_id = '131806'
client_secret = 'dde76dc82d8368dccc20ba134665012ead5aeabd'
refresh_token = 'a53bcf91e693e4bfef71c7d32033018a579c556f'

auth_url = "https://www.strava.com/oauth/token"
payload = {
    'client_id': client_id,
    'client_secret': client_secret,
    'refresh_token': refresh_token,
    'grant_type': 'refresh_token'
}
response = requests.post(auth_url, data=payload)
data = response.json()

# Affichez les données de réponse pour vérifier si l'access token a été correctement généré
print("Authentication Response:", data)

# Assurez-vous que l'access token est bien présent
if 'access_token' in data:
    access_token = data['access_token']
else:
    raise Exception("Error fetching access token")


import webbrowser

client_id = '131806'
redirect_uri = 'course.html'
scope = 'activity:read'

authorization_url = (
    f"https://www.strava.com/oauth/authorize?"
    f"client_id={client_id}&response_type=code&"
    f"redirect_uri={redirect_uri}&scope={scope}"
)

print("Please go to this URL to authorize the application:")
print(authorization_url)

# Optionnel: Ouvrir automatiquement le navigateur
webbrowser.open(authorization_url)

