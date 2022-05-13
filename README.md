# NASA-Mission-Control

<div id="top"></div>

![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![AWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)

<!-- PROJECT LOGO -->
<div align="center">

  <h2 align="center">NASA-Mission-Control</h2>

  <p align="center">
  <a href="http://54.226.65.35:8000/">View Demo</a>
    ·
    <a href="https://github.com/abdrahmansoltan/NASA-Mission-Control/issues">Report Bug</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#architecture">Architecture</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#ports--endpoints">Ports & EndPoints</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

A NASA dashboard app for managing and monitoring spaceflights to habitable planets in the observable universe.

![Preview](./img/preview.PNG)

### Built With

- Javascript
- Node.js
- Epress framework
- React
- MongoDB
- Jest
- AWS

### Architecture

![ARC](./img/arc.png)

<p align="right">(<a href="#top">back to top</a>)</p>

---

<!-- GETTING STARTED -->

## Getting Started

This project require some prequesites and dependenscies to be installed, you can find the instructions below

This project require some prequesites and dependenscies to be installed, you can view it online using this [demo](http://54.226.65.35:8000). or you can find the instructions below:

> To get a local copy, follow these simple steps :

### Installation

#### installing Locally

1. Clone the repo
   ```sh
   git clone https://github.com/abdrahmansoltan/NASA-Mission-Control.git
   ```
2. go to project folder

   ```sh
   cd NASA-Mission-Control
   ```

3. install dependenscies

   ```bash
   npm run install
   ```

4. Enviromental Variables Set up

   - Here are the environmental variables that needs to be set in a .env file. This is the default setting that I used for development, but you can change it to what works for you.

   ```
     PORT = 8000
     MONGO_URL = <Your mongodb url>
   ```

5. Change API_URL to `"http://localhost:8000/v1"` in [here]("./client/src/../../../client/src/hooks/requests.js")

6. Run development server

   ```sh
   npm run watch
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

---

### Ports & EndPoints

#### Ports

- FrontEnd Server runs on port `3001`
- Backend Server runs on port `8000`

#### API endpoints

- Planets

  - Index: [http://localhost:8000/v1/planets](http://localhost:8000/v1/planets) [get]

- Launches

  - Index: [http://localhost:8000/v1/launches](http://localhost:8000/v1/launches) [get]
  - Create: [http://localhost:8000/v1/launches](http://localhost:8000/v1/launches) [post]
  - Delete: [http://localhost:8000/v1/launches/:id](http://localhost:8000/v1/launches/:id) [delete]

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f814f3d64372b7b6fede?action=collection%2Fimport)

---

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [odziem](https://github.com/odziem)
