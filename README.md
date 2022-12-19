# About
***

Social media platform.   
You will be able to follow specific topics you like. You can make your own room, and moderate it. You can search for rooms based on their topics and join them.


# Configs
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

|             |                                                                                                                                                                                                                         |
| :---        |:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Server      |                                       ![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)                                       |
| Database    |                                                      ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)                                                       |
| Front-end   |                                                     ![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)                                                     |
| UI          |                                                                                                        Material                                                                                                         |
# Project Management
https://trello.com/b/aZTdasdK/myroom

# Screen plan

***

with Figma
***TODO***

# Documentation

***

- [ ] Entity-Relationship diagram

# Features

***

- [x] Follow to rooms
- [x] Login
- [x] Register
- [ ] Edit rooms where you are an admin
- [x] List joined rooms
- [x] List all rooms
- [x] List Artilces in a specific room (dynamic url)
- [ ] Search 
    - [ ] Rooms
    - [ ] Users
    - [ ] Topics


# Implemented

***
***Django*** []
- [x] Token authorization with JWT
- [x] Class-based views
- [x] Serializers
- [ ] Tests

***Angular***
- [x] Interceptors
  - [x] Auth errors
  - [x] Set header to  ```Bearer "Auth Token"``` for authentication on server
- [x] Services
- [x] Models with Interfaces (TypeScript)
- [x] Routing
- [x] Observables
- [x] Reactive Forms
- [ ] Auth guard
- [ ] Material UI


# Run
1. Pull the postgress image from docker hub 
2. Build the backend and the frontend of the project
- Change directory into client, then run the following command
```
    docker build -t . myroom-frontend 
```
- Change diretory into backend, then run the following command
```
    docker build -t . myroom-backend
```
3. Run the docker compose from the root of the folder
```
  docker compose up -d --build
```

Now you can view the app on localhost:3001