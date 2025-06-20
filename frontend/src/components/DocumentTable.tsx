import React, { useState } from 'react';
import axios from 'axios';
import PdfButton from './PdfButton';
import DocumentModal from './DocumentModal';
import { Document } from '../hooks/useDocuments';
import { MagnifyingGlassIcon, PrinterIcon, TrashIcon } from '@heroicons/react/24/outline';

export interface DocumentTableProps {
  documents: Document[];
  meta: { total: number; page: number; limit: number; pages: number };
  fetchPage: (page: number) => void;
  onDelete: (id: string) => void;
}

export default function DocumentTable({ documents, meta, fetchPage, onDelete }: DocumentTableProps) {
  // Estado para el modal
  const [modalDoc, setModalDoc] = useState<Document | null>(null);
  const [query, setQuery] = useState('');

  const filtered = documents.filter(d =>
    d.title.toLowerCase().includes(query.toLowerCase()) ||
    d.content.toLowerCase().includes(query.toLowerCase())
  );

  const handlePrint = async (doc: Document) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/convert',
        { title: doc.title, content: doc.content },
        { responseType: 'blob' }
      );
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const w = window.open(url);
      w?.addEventListener('load', () => w.print());
    } catch (error) {
      console.error('Error al imprimir documento:', error);
    }
  };

  const { page, pages } = meta;

  return (
    <>
      {/* Modal para ver contenido */}
      {modalDoc && (
        <DocumentModal
          isOpen={!!modalDoc}
          onClose={() => setModalDoc(null)}
          title={modalDoc.title}
          content={modalDoc.content}
        />
      )}

      <div className="space-y-4">
        {/* Barra de búsqueda */}
        <div className="flex items-center space-x-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:ring focus:border-primary"
          />
        </div>

        {/* Tabla de documentos */}
        <div className="overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-3">Título</th>
                <th className="p-3">Creado</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filtered.map(doc => (
                <tr key={doc.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <td className="p-3">
                    <button
                      onClick={() => setModalDoc(doc)}
                      className="text-blue-600 hover:underline"
                    >
                      {doc.title}
                    </button>
                  </td>
                  <td className="p-3">{new Date(doc.createdAt).toLocaleString()}</td>
                  <td className="p-3 flex items-center space-x-2">
                    <PdfButton title={doc.title} content={doc.content} />
                    <button onClick={() => handlePrint(doc)} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                      <PrinterIcon className="h-5 w-5 text-green-600" />
                    </button>
                    <button onClick={() => onDelete(doc.id)} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                      <TrashIcon className="h-5 w-5 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={page <= 1}
            onClick={() => fetchPage(page - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ← Anterior
          </button>
          <span>
            Página {page} de {pages}
          </span>
          <button
            disabled={page >= pages}
            onClick={() => fetchPage(page + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </>
  );
}
