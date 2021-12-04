# IronTours

## Description

A Node application to book tours for Ironhackers.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage - tours** - As a user I want to be able to access the homepage and see the tours, login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the tours available
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **tour details** - As a user I want to see details about the tour I choose and to be able to book a tour
- **tour create** - As an admin I want to create a tour so that I can display the information on the website
- **profile** - As a user I want to see all the tours that I selected

## Backlog

List of other features outside of the MVPs scope

User profile:
- upload my profile picture with cloudinary / gravatar
- list of tours created by the admin if the admin is logged in

Geo Location:
- add geolocation to tours 
- show event in a map in tour detail page

Reviews:
- add reviews for a tour
- show relevant reviews to users

Payment
- add a payment feature for the booking

## ROUTES:

- GET /tours
  - renders the homepage
  - show the list of tours
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - email
    - password
- POST /auth/logout
  - redirect to homepage 

- POST /tours/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description
    - image
- GET /tours/:id
  - renders the tour detail page
  - button to book the tour
- POST /tours/:id/book
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)


## Models

User model
 
```
email: String
password: String
image: String / Default
role: enum [admin, tourGuide, user]
```

Tour model

```
tourGuide: ObjectId<User>
name: String
description: String
date: Date
location: String
image: String / Default 
``` 

## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/karlajaramillo/irontours)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)


