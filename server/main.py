from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import cv2
import numpy as np
import os

# import mediapipe as mp

app = Flask(__name__, static_folder="images")
cors = CORS(app, origins="*")


def facial_grid(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = cv2.CascadeClassifier(
        cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    ).detectMultiScale(gray, scaleFactor=1.1, minNeighbors=7, minSize=(30, 30))
    for x, y, w, h in faces:
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
    os.makedirs(app.static_folder, exist_ok=True)
    processed_image_path = os.path.join(
        app.static_folder, "processed_" + os.path.basename(image_path)
    )
    cv2.imwrite(processed_image_path, image)
    return processed_image_path


# def facial_grid(image_path):
#     mp_face_mesh = mp.solutions.face_mesh
#     mp_drawing = mp.solutions.drawing_utils
#     with mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1, min_detection_confidence=0.5) as face_mesh:
#         image = cv2.imread(image_path)
#         results = face_mesh.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

#         if results.multi_face_landmarks:
#             for face_landmarks in results.multi_face_landmarks:
#                 mp_drawing.draw_landmarks(image, face_landmarks, mp_face_mesh.FACE_CONNECTIONS)

#         os.makedirs(app.static_folder, exist_ok=True)
#         processed_image_path = os.path.join(app.static_folder, 'processed_' + os.path.basename(image_path))
#         cv2.imwrite(processed_image_path, image)
#         return processed_image_path


@app.route("/api/upload", methods=["POST"])
def upload_image():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = file.filename
        file_path = os.path.join(app.static_folder, filename)
        file.save(file_path)
        processed_image_path = facial_grid(file_path)
        return jsonify({"filename": os.path.basename(processed_image_path)}), 200


@app.route("/images/<path:filename>")
def serve_image(filename):
    return send_from_directory(app.static_folder, filename)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
