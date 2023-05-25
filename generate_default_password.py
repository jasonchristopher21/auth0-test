"""
SCRIPT TO GENERATE A RANDOM PASSWORD FOR DEFAULT PASSWORD

- RFC 4086 recommends 96 bits of entropy, but in this script I would be using 128 bits instead for better safety
- Password can contain alphanumeric + the following special characters: !@#$%^&*, hence each character contributes to log_2(70) = 6.12 bits of entropy
- Taking 128 / log_2(70), we get at least 21 characters is needed for the password, which is the goal of this script
"""
import random

pwd = ""

characters_domain = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
length = len(characters_domain)

for i in range(21):
    idx = random.randint(0,length - 1)
    pwd += characters_domain[idx]

print(pwd)