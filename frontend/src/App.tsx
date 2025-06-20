// src/App.tsx
import React from 'react';
import useDocuments from './hooks/useDocuments';
import DocumentForm from './components/DocumentForm';
import DocumentTable from './components/DocumentTable';
import { Toaster } from 'react-hot-toast';
import { Spinner } from './components/Spinner';

export default function App() {
 
  const {
    documents,
    meta,
    loading,
    error,
    createDocument,
    deleteDocument,
    fetchDocuments
  } = useDocuments();

  // Log para depurar
  console.log('🚀 App render', { documents, meta });

  if (loading) return <Spinner />;
  if (error)   return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestor de Documentos
          </h1>
          <p className="text-gray-600">Crea y administra tus documentos</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DocumentForm
            onSubmit={({ title, content }) => createDocument(title, content)}
          />
          <DocumentTable
            documents={documents}
            meta={meta}
            fetchPage={fetchDocuments}
            onDelete={deleteDocument}
          />
        </div>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}
