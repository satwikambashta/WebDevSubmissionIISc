# Use an official Python runtime as a parent image
FROM python:3.8-slim

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Add the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8080 available to the world outside this container
EXPOSE 8080
# EXPOSE 8080

# Define environment variable
ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=127.0.0.1

# Run main.py when the container launches
# CMD ["python3","-m","flask", "run","--host=0.0.0.0"]
CMD ["flask", "run"]
