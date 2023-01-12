# About
***

Social media platform.   
You will be able to follow specific topics you like. You can make your own room, and moderate it. You can search for rooms based on their topics and join them.


# Configs
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

|             |                                                                                                                                                                                                                         |
| :---        |:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Server      |                                       ![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)                                       |
| Database    |                                                      ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)                                                       |
| Front-end   |                                                     ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)                                                     |
| UI          |                                                                                                        ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)                                                                                                         |
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

***React***
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
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
1. Pull the postgress image from docker hub 
2. Build the backend and the frontend of the project
- Change directory into client, then run the following command
```
    docker build . -t myroom-frontend 
```
- Change diretory into backend, then run the following command
```
    docker build . -t myroom-backend
```
3. Run the docker compose from the root of the folder
```
  docker compose up -d --build
```
4. get the myroom-backend container id with the following command
```
  docker container ls
```
5. execute the following commands within the container, when creating superuser type in credentials
```
  docker exec -it <container_id> python manage.py createsuperuser
  docker exec -it <container_id> python manage.py loaddata room/fixtures/room.json
```

6. Then run all the containers in myroom
7. Now you can view the app on [localhost:3001](http://localhost:3001)
