# converter/Dockerfile
FROM python:3.9-slim

WORKDIR /app


COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt


COPY app.py ./


EXPOSE 6000

# Arrancamos el servicio
CMD ["python", "app.py"]