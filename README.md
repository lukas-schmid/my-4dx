<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/lukas-schmid/my-4dx">
    <img src="" alt="Logo" width="80" height="80">
  </a>

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

Project description and pictures here...

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [React](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Bootstrap](https://getbootstrap.com/)
* [Sass](https://sass-lang.com/)
* [ChartJs](https://www.chartjs.org/)
* [Firebase](https://firebase.google.com/)



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
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
