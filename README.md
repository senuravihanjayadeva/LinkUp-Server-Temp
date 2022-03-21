# LinkUp API Server

This is the Application Programming Interface for LinkUp mobile application. Go through the following documentation to set up the server in your local environment.

### Setup LinkUp Server

- Clone or fork the repository
- run `yarn install` to install the dependecies
- run `yarn start` to start the server
- The LinkUp server is running on `http://localhost:9000/`

### Setup LinkUp Server using Docker

- run `docker build -t docker.io/<your_dockerhub_username>/linkupserver:<version_tag> .` to build the Docker image
- run `docker run -d -p 9000:9000 --name linkupcontainer docker.io/<your_dockerhub_username>/linkupserver:<version_tag>` to run the Docker container
