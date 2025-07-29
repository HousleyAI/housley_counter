FROM python:3.12-slim

# Copy the requirements.txt file from the local docker directory to the root of the container
COPY docker/requirements.txt /

# Install the python packages listed in the requirements.txt file
RUN pip install -r /requirements.txt

# Set the working directory, this is where the application code will be copied and run
WORKDIR /projects

# Copy the content of the local src directory to the working directory in the container
COPY src .

# Specify the command to run on container start
# This will run the python application using the python interpreter
CMD [ "python", "app.py" ]