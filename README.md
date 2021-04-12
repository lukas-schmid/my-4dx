<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h1 align="center">My 4DX</h1>

  <p align="center">
    Final project for the Full Stack Javascript Developer Bootcamp at Salt - School of applied technology.
    <br />
    <br />
    <a href="https://my-4dx.herokuapp.com/">View Live Version</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#the-team">The Team</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#firebase-setup">Firebase Setup</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

My 4DX is a business managment tool that allows you to solve the execution problem inherent to any big origanisational goals. It is based on the book "[The 4 Disciplines of Execution](https://www.amazon.com/Disciplines-Execution-Achieving-Wildly-Important/dp/1491517751)". The four disciplines are: 

1. Focus on the Wildly Important Goal (WIG)
2. Act on the lead measures
3. Keep a compelling scoreboard
4. Create a cadence of accountability.

A full demonstration of the application can be found here: [My 4DX Youtube Demo](https://youtu.be/-uHWajweORA)

Preview![image](https://user-images.githubusercontent.com/70095024/114282282-3655a180-9a43-11eb-8b76-c9d39f36da08.png)


### Built With

This is the tech stack used for this project:
* [React](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Sass](https://sass-lang.com/)
* [ChartJs](https://www.chartjs.org/)
* [Firebase](https://firebase.google.com/)


## The Team

The team that built this consisted of the following members.

#### Lukas Schmid

Former Technical Project Manager in a SaaS company.
* [LinkedIn](https://www.linkedin.com/in/lukas-schmid2/)
* [Github](https://github.com/lukas-schmid)


#### Petter Carlsson

Former Head of SEO and Web Analytics for the fashion brand Filippa K.
* [LinkedIn](https://www.linkedin.com/in/petter0619/)
* [Github](https://github.com/petter0619/)

#### Johan Lyckenvik

Former startup co worker and engineer.
* [LinkedIn](https://www.linkedin.com/in/johanlyckenvik/)
* [Github](https://github.com/johanlyckenvik)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Firebase Setup

Go to [Firebase](https://firebase.google.com/) and create a project. 
1. Create authentication and get the config keys
2. Create a firestore database
3. Get the keys for the Admin SDK

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/lukas-schmid/my-4dx.git
   ```
2. Install NPM packages for the backend
   ```sh
   npm install
   ```
3. Install NPM packages for the frontend
   ```sh
   cd client/ && npm install
   ```
4. Create .env file in the root directory and add the firebase credentials
   ```bash
   # Firebase Authentication credentials
   API_KEY=XXXX
   AUTH_DOMAIN=XXXX
   PROJECT_ID=XXXX
   STORAGE_BUCKET=XXXX
   MESSAGING_SENDER_ID=XXXX
   APP_ID=XXXX
   # Firestore credentials
   TYPE=XXXX
   PROJECT_ID=XXXX
   PRIVATE_KEY_ID=XXXX
   PRIVATE_KEY=XXXX
   CLIENT_EMAIL=XXXX
   CLIENT_ID=XXXX
   AUTH_URI=XXXX
   TOKEN_URI=XXXX
   AUTH_PROVIDER_X509_CERT_URL=XXXX
   CLIENT_X509_CERT_URL=XXXX
   ```

