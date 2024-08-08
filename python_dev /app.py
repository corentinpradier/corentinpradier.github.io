import requests

def refresh_access_token(refresh_token, client_id, client_secret):
    url = "https://www.strava.com/oauth/token"
    payload = {
        'client_id': client_id,
        'client_secret': client_secret,
        'refresh_token': refresh_token,
        'grant_type': 'refresh_token'
    }
    response = requests.post(url, data=payload)
    if response.status_code == 200:
        data = response.json()
        new_access_token = data.get('access_token')
        new_refresh_token = data.get('refresh_token')  # Nouveau jeton de rafraîchissement si fourni
        return new_access_token, new_refresh_token
    else:
        print(f"Failed to refresh token: {response.json()}")
        return None, None

# Exemple d'utilisation
client_id = '131806'
client_secret = 'dde76dc82d8368dccc20ba134665012ead5aeabd'
current_refresh_token = 'a53bcf91e693e4bfef71c7d32033018a579c556f'

new_access_token, new_refresh_token = refresh_access_token(current_refresh_token, client_id, client_secret)
print(f"New Access Token: {new_access_token}")
print(f"New Refresh Token: {new_refresh_token}")

##############################################@

from flask import Flask, render_template
import os

app = Flask(__name__, template_folder='../', static_folder='')  # Dossier parent pour trouver index.html


@app.route('/')
def index():
    # Remplacez 'access_token' par votre jeton d'accès réel
    access_token = new_access_token
    
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    response = requests.get('https://www.strava.com/api/v3/athlete/activities', headers=headers)
    
    if response.status_code == 200:
        activities = response.json()
    else:
        activities = []
    
    return render_template('index.html', activities=activities)

if __name__ == '__main__':
    app.run(debug=True)


