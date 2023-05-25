"""
SCRIPT TO PURGE ALL USERS
BE CAREFUL WHEN USING THIS!

NOTE: For safety reasons, `json_data` and `auth_token` should be fetched manually.
      Don't want to cause accidental harm hehe :)
"""

import requests
import random
import time

false = False
true = True

json_data = None        # TODO: Add Array returned by response to /users endpoint

tokens = []

for obj in json_data:
    tokens.append(obj["user_id"])
    
print(tokens)

URL = "https://dev-cioju4o7r00ule5j.us.auth0.com/api/v2/users/"
auth_token = ""         # TODO: Add Auth0 Management API Token here 

headers = {'Authorization': f'Bearer {auth_token}'}

for user_id in tokens:
    response = requests.delete(URL + user_id, headers=headers)

    # Added a random 2 - 5 seconds delay so that Auth0 won't be suspicious of a brute-force attempt
    secs = random.randrange(2, 5)
    time.sleep(secs)