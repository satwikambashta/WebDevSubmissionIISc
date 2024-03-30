# Face Detection App

This application demonstrates face detection using OpenCV in a Flask backend and a Vite React frontend.

## Demonstration Videos

- **Demo with Dev Server:**
 [![Running Using Dev Server](http://img.youtube.com/vi/sM3yKsrbCdc/0.jpg)](https://www.youtube.com/watch?v=sM3yKsrbCdc "Project Demo")

- **Demo with Docker Compose:**
 [![Running Using Docker Compose](http://img.youtube.com/vi/YxhkgAkN03A/0.jpg)](https://www.youtube.com/watch?v=YxhkgAkN03A "Project Demo")

## Docker Setup

To run the application using Docker, follow these steps:

1. Navigate to the base directory `iisctask`.
2. Build the Docker images:
`docker-compose build`
`docker-compose up`
3. Start the application:


## Backend Setup

Navigate to the `backend` folder and install the required dependencies:
in a virtual environment or install globally using:
`pip install -r requirements.txt`

or

``` 
pip install Flask-CORS
pip install flask   
pip install opencv-python
```

## Frontend Setup

Navigate to the `frontend` folder and install the required dependencies:

`npm i`

## Backend start server:
nagivate to the backend folder by `cd server`
`python main.py`

## Frontend development server:
`npm run dev`

## Navigate to localhost:5173 to access the website

<!-- in the backend folder(server):
pip install Flask-CORS
pip install flask   
pip install opencv-python

in the frontend folder(client):
npm i 


To run: 

in the backend folder(server):
python main.py 

in the frontend folder(client):
npm run dev -->
