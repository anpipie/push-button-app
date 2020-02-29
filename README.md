# The Ultimate Job Hunt Game (previously known as Push-button-game)

It's alive! My very first successfully deployed MERN fullstack app. 
The app is now up and running at: https://push-button-app.herokuapp.com/

## Description
This is a simple click the button game app (with no change of actually winning - so save your clicks!).
Players click the button to gain more points. Each click costs point(s). Every click is counted by the server and every n:th click is awarded with points. Note: Server counts the total amount of clicks, not clicks by an individual player. After a click player gets a tips of how many clicks are required to the next winning.

### App overview
* MongoDB - database
* Node.js & Express - server and routes
* React - front-end - created with Create React App

## Installing and deployment
This app is ready to deploy.
* Procfile: specifies the commands that are executed by the app on startup. This file is used when deploing the app to Heroku.

### Dependencies (things you need to have installed)
* Back-end: package.json
* Front-end: /client/package.json
To install dependencies run 'npm install'
Check also /client/README.md file, which explains how to work with the Create React App.

### Environment variables (things you need to set)
* PORT - server.js
* ATLAS_URI - db.js - your MongoDB database uri

## Credits
* The game logics are based on Vincit summer job challenge. Description in Finnish: https://koodarijahti.fi/Ennakkotehtava_2020_Painikepeli.pdf
* I could have not created this app without the numerous tutorials available on web. Kudos to all those people sharing their expertise.
* UI background image by Gerd Altmann / Pixabay

## Updates
* 27/2/2020 gameplay logics (awarding points to player) are now separated into gameResults.js 
* 28/2/2020 Edited the UI. As a result this Push-Button-game evolved into Job-Hunt-game ;)
* 29/2/2020 Counter functions are now in gameCounter.js. Added rate limiting for PUT requests.
