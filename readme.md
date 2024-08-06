# Node/React Strava API application

This application takes data from the Strava API to analyse a user's data. The app produces a cycling power curve and a pace graph, from raw strava data. This is data then used to make predictions. A user's 5k performance is used to esimtate their performance over longer distances using linear regression. I also use a power graph and the athlete's weight to estimate time up a climb. 


![Screenshot 1](./images/screen1.jpg)
*Hill climb predicted time using polynomial regression.*

![Screenshot 2](./images/screen2.jpg)
*An athlete's power curve*

![Screenshot 3](./images/screen3.jpg)
*An athlete's pace graph*

![Screenshot 4](./images/screen4.jpg)
*Half marathon prediction using linear regression.*

## Description of folders

The strava-app is the front end of the applications made in React. The node folder is the server
made using node/express. The cypress folder just contains end to end testing files.

## The Live site

[http://159.65.83.17/](http://159.65.83.17/)/).

Please use the test Strava account I have given at the top of the report for authentication. 

## Instructions for local node-react strava app

Run git clone or download a zip file of the code. Then from the command line cd into the root of the entire project.
To then start the node server you need to run:

```
cd node
```
```
npm install
```
```
npm run start
```
Then return to the root of the project and start the react client by running:

```
cd strava-app
```
```
npm install
```
```
npm run start
```
This will start a localserver and your browser should open a window
on localhost:8080. 

To use cypress to test the main (live) application run ```npm test``` in the root directory of the whole project. 
To run the unit tests in the node folder cd into the node server folder and run ```npm test```

