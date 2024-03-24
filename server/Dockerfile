FROM python:3.8-slim

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . /app

RUN pip3 install --no-cache-dir -r requirements.txt

EXPOSE 8080

ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=127.0.0.1

CMD ["flask", "run","--host=0.0.0.0", "--port=8080"]
