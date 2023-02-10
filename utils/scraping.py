import praw
import json
from praw.models import Subreddit, Subreddits
reddit = praw.Reddit(
    client_id="",
    client_secret="",
    user_agent="Mozilla/5.0 Chrome/108.0.0.0 Safari/537.36:com.myroom:v1.0.0 (by SeaInternet8067)",
)

records = []



for subreddit in reddit.subreddits.popular():
    record = {
      "model": "room.Room",
      "fields": {
        "name": subreddit.title.replace("'", ""),
        "description": subreddit.public_description.replace("'", "")
      }
    }
    record2 = {
      "model": "room.Followed",
      "fields": {
        "room": subreddit.title.replace("'", ""),
        "user": 3,
        "isAdmin": True
      }
    }
    records.append(record)
    print(record)
    print(',')  
    print(record2)
    print(',')  

test = ''
