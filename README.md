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


# Screen plan

***

with Figma
***TODO***

# Documentation

***

- [ ] Entity-Relationship diagram

# Features

***

- [ ] Join to rooms
- [x] Login
- [x] Register
- [ ] Edit rooms where you are an admin
- [x] List joined rooms
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

---
***Currently writing json to pre-populate db***
- create a db.sqlite3 file inside ***back-end/server*** folder   
run these commands(***Global installs***), recommend venv
```
    pip install Django==4.0.3
    pip install djangorestframework
    pip install django-filter 
```
- cd into the ***back-end/server*** folder
```
    python manage.py migrate 
    python manage.py loaddata room.json
    python manage.py runserver
```
- open new terminal window
- then cd into ***client*** dir, and run angular with ```ng serve```
