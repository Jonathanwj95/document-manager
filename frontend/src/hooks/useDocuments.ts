import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Valores por defecto para la paginación
const DEFAULT_META: PaginationMeta = {
  total: 0,
  page: 1,
  limit: 5,
  pages: 1
};

export default function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>(DEFAULT_META);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const fetchDocuments = async (page = DEFAULT_META.page, limit = DEFAULT_META.limit) => {
    setLoading(true);
    setError(null);

    // Retraso artificial para probar el spinner
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const response = await axios.get<{ data: Document[]; meta: PaginationMeta }>(
        'http://localhost:5000/api/documents',
        { params: { page, limit } }
      );
      setDocuments(response.data.data);
      setMeta(response.data.meta || DEFAULT_META);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError('Error al obtener los documentos.');
    } finally {
      setLoading(false);
    }
  };

  
  const createDocument = async (title: string, content: string) => {
    setError(null);
    try {
      const { data } = await axios.post<Document>(
        'http://localhost:5000/api/documents',
        { title, content }
      );
      
      await fetchDocuments(1, meta?.limit || DEFAULT_META.limit);
      return data;
    } catch (err) {
      console.error('Error creating document:', err);
      setError('Error al crear el documento.');
      throw err;
    }
  };

 
  const deleteDocument = async (id: string) => {
    setError(null);
    try {
      await axios.delete(`http://localhost:5000/api/documents/${id}`);
      
      await fetchDocuments(meta?.page || DEFAULT_META.page, meta?.limit || DEFAULT_META.limit);
    } catch (err) {
      console.error('Error deleting document:', err);
      setError('Error al borrar el documento.');
      throw err;
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    meta,
    loading,
    error,
    fetchDocuments,
    createDocument,
    deleteDocument,
  };
}