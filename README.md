# Housley Counter App

This is a Python counter application that can be built and deployed to OpenShift using a devfile.


## Starting the Application ##
### Using Docker Image ###
- This docker image can also be added to an OpenShift deployment
```
docker run -p 8080:8080 hlabs/housley_counter:latest
```


### Using Docker compose ###
- This will build the Docker image and start the application using Docker Compose.
```
docker compose up
```


## Purpose of Included Files ##
- **docker/Dockerfile**: Contains instructions for building the container image for the Python application. It sets up the Python environment and installs dependencies.
- **docker/requirements.txt**: Lists the Python dependencies required for the application
- **src/app.py**: The main Python application that serves the static files and handles routing.
- **src/templates/index.html**: The main HTML file containing the counter application.
- **.dockerignore**: Lists files and directories to exclude from the Docker build context, optimizing build performance.
- **.gitignore**: Specifies files and directories to ignore in the Git repository, such as `__pycache__`, virtual environments, and environment files.
- **devfile.yml**: The devfile for the project. It defines the development environment and the commands for building and deploying the application.
- **deploy.yml**: Contains the OpenShift manifests for deploying the application. It defines a Deployment to manage the application pods, a Service to expose the application internally, and a Route to expose the application externally.
- **docker-compose.yml**: Defines the Docker Compose configuration for building and running the application in a containerized environment.
