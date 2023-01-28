import praw
import json
from praw.models import Subreddit, Subreddits
reddit = praw.Reddit(
    client_id="t7KzPF2f0MtfIba4h3zrYw",
    client_secret="Jl_v0t3nsKg1ir3bd0oL7WBuEfIaFA",
    user_agent="Mozilla/5.0 Chrome/108.0.0.0 Safari/537.36:com.myroom:v1.0.0 (by SeaInternet8067)",
)

records = []



for subreddit in reddit.subreddits.popular():
    isNsfw = False
    if subreddit.title in reddit.subreddits.search_by_name(subreddit.title, True):
      isNsfw = True
      continue
    record = {
      "model": "room.Room",
      "fields": {
        "name": subreddit.title.replace("'", ""),
        "description": subreddit.public_description.replace("'", ""),
        "nsfw": isNsfw
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