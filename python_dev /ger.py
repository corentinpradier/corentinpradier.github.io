# import urllib.parse

# client_id = '131806'
# redirect_uri = '127.0.0.1'  # Doit correspondre à ce que vous avez mis lors de la création de l'application
# scope = 'read_all'  # Dépend des permissions dont vous avez besoin

# auth_url = (
#     f"https://www.strava.com/oauth/authorize?client_id={client_id}"
#     f"&redirect_uri={urllib.parse.quote(redirect_uri)}"
#     f"&response_type=code"
#     f"&scope={scope}"
# )

# print(f"Visit this URL to authorize the app: {auth_url}")


import requests

client_id = '131806'
client_secret = 'dde76dc82d8368dccc20ba134665012ead5aeabd'
code = 'd57f4f0c9d2e89f077576c6f3ec09b9668ae9649'
redirect_uri = '127.0.0.1'

token_url = 'https://www.strava.com/oauth/token'
params = {
    'client_id': client_id,
    'client_secret': client_secret,
    'code': code,
    'grant_type': 'authorization_code',
    'redirect_uri': redirect_uri
}

response = requests.post(token_url, data=params)
access_token = response.json().get('access_token')

print(f"Access Token: {access_token}")
