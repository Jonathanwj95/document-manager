# Gestor de Documentos

Sistema de gestión de documentos con:

- **Backend**: Node.js + Express + TypeScript  
- **Frontend**: React + TypeScript + TailwindCSS  
- **Conversor PDF**: Flask + FPDF  
- **Docker**: Cada servicio en su propio contenedor, orquestado con docker-compose

---

## Requisitos

- [Docker](https://www.docker.com/get-started)  
- [Docker Compose](https://docs.docker.com/compose/install/)  
- (Opcional, para desarrollo local sin Docker) Node.js ≥16, npm o yarn

---

## Estructura

├─ backend/ # API Node/Express
├─ frontend/ # React app
├─ converter/ # Servicio Flask de conversión a PDF
└─ docker-compose.yml

-------------------------------------------------------------------------------------------------

## Levantar con Docker

1. Desde la raíz del proyecto, compila e inicia todos los servicios::

   ```bash
   docker-compose up --build

2. Abrir en el navegador:

Frontend: http://localhost:3000

Backend API: http://localhost:5000/api

Converter PDF: http://localhost:6000/health

3. Para detener:

docker-compose down

## Endpoints API (Express)

GET /api/documents
Listar documentos (acepta ?page= y ?limit=).

GET /api/documents/:id
Obtener un documento por ID.

POST /api/documents
Crear documento.

**Body JSON:**

{ "title": "Mi título", "content": "Mi contenido" }

DELETE /api/documents/:id
Borrar documento por ID.

POST /api/convert
Genera un PDF con { title, content } y lo devuelve como descarga.

-------------------------------------------------------------------------------------------------

**Desarrollo local (sin Docker)**
1. Backend


cd backend
npm install
npm run 

2. Frontend

cd frontend
npm install
npm run

3. Converter (Python)

cd converter
pip install -r requirements.txt
python app.py

-------------------------------------------------------------------------------------------------

GRACIAS POR LEER :D
