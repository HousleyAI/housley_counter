# Housley Counter App

This is a Python application that can be built and deployed to OpenShift 'Import from Git'


## Starting the Application ##
### Using Docker Image ###
- This docker image can also be added to an OpenShift deployment
```
docker run -p 8080:8080 hlabs/housley_counter:latest
```


### Using Docker compose ###
- This will build the Docker image and start the application using Docker Compose
```
docker compose up
```


## Purpose of Included Files ##
- **src**: The main HTML file containing the counter application.
- **.gitignore**: Specifies files and directories to ignore in the Git repository
- **app.py**: The main Python application that serves the static files and handles routing
- **requirements.txt**: Lists the Python dependencies required for the application

- **docker/Dockerfile**: Contains instructions for building the container image for the Python application. Used for development
- **docker-compose.yml**: Defines the Docker Compose configuration for building and running the application in a containerized environment. Used for development
