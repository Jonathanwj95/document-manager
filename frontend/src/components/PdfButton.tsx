import axios from 'axios';
import { useState } from 'react';

export default function PdfButton({
  title,
  content
}: { title: string; content: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePDF = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!content.trim()) {
        throw new Error('El texto no puede estar vacío');
      }

      const response = await axios.post(
        'http://localhost:5000/api/convert',
        { title, content },
        {
          responseType: 'blob',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `documento-${new Date().toISOString().slice(0, 10)}.pdf`;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(pdfUrl);
      }, 100);
    } catch (err: any) {
      console.error('Error:', err);
      setError(
        axios.isAxiosError(err)
          ? `Error del servidor: ${err.response?.status || err.message}`
          : 'Error al generar el PDF'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={generatePDF}
        disabled={isLoading}
        className={`btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Generando...' : 'Exportar PDF'}
      </button>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
          <div className="text-xs mt-1">
            Consejo: Verifica la URL de la petición en tu componente.
          </div>
        </div>
      )}
    </div>
  );
}
