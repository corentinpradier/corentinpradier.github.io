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



from flask import Flask, render_template
from stravalib.client import Client

app = Flask(__name__)

# Utilisez le jeton d'accès obtenu
ACCESS_TOKEN = 'access_token'

strava_client = Client()
strava_client.access_token = ACCESS_TOKEN

@app.route('/')
def index():
    activities = get_recent_activities()
    return render_template('index.html', activities=activities)

def get_recent_activities():
    activities = strava_client.get_activities(limit=10)
    return activities

@app.route('/activity/<id>')
def activity_detail(id):
    activity = get_activity_by_id(id)
    return render_template('activity.html', activity=activity)

def get_activity_by_id(activity_id):
    activity = strava_client.get_activity(activity_id)
    return activity

if __name__ == "__main__":
    app.run(debug=True)


