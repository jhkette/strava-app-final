# Node/React Strava API application

## Description of folders
The strava-app is the front end of the applications made in React. The node folder is the server
made using node/express. The cypress folder just contains end to end testing files.

I have gitignored all node_modules (i.e dependencies). In past experience my computer has struggled
to upload what would be 1000s of files so I have left them. To run and install the app locally please
follow the instructions below

## Instructions for node-react strava app

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

