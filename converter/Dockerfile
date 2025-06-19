# converter/Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Copiamos únicamente las dependencias y las instalamos
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos solo el código de la app
COPY app.py ./

# Exponemos el puerto 6000 donde corre Flask
EXPOSE 6000

# Arrancamos el servicio
CMD ["python", "app.py"]