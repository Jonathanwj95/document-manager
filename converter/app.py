# converter/app.py
from flask import Flask, request, make_response, jsonify
from fpdf import FPDF
from flask_cors import CORS
import logging
import io

app = Flask(__name__)
CORS(app)  # Habilita CORS en todas las rutas

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/convert', methods=['POST'])
def convert():
    try:
        logger.info("✅ Petición recibida en /convert: %s", request.json)
        data = request.get_json(force=True)

        title = data.get('title', '').strip()
        content = data.get('content', '').strip()
        if not content:
            return jsonify({"error": "Se requiere 'content' en el body"}), 400

        # Crear PDF
        pdf = FPDF()
        pdf.add_page()

      
        if title:
            pdf.set_font("Arial", "B", 16)
            pdf.cell(0, 10, title, ln=True, align='C')
            pdf.ln(5)

        # Imprimir contenido
        pdf.set_font("Arial", size=12)
        pdf.multi_cell(0, 8, content)

       
        buffer = io.BytesIO()
        pdf.output(buffer)
        buffer.seek(0)

       
        response = make_response(buffer.read())
        response.headers['Content-Type'] = 'application/pdf'
        response.headers['Content-Disposition'] = 'attachment; filename=documento.pdf'
        return response

    except Exception as e:
        logger.error("❌ Error en /convert: %s", e, exc_info=True)
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok"}), 200

if __name__ == '__main__':
    
    app.run(host='0.0.0.0', port=6000, debug=True)
