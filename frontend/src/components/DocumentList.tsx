import { Document } from '../hooks/useDocuments';
import PdfButton from './PdfButton';

type Props = {
  documents: Document[];
  loading: boolean;
  error: string | null;
};

export default function DocumentList({ documents, loading, error }: Props) {
  if (loading) {
    return <p className="text-blue-500">Cargando documentos...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (documents.length === 0) {
    return <p className="text-gray-600">No hay documentos disponibles.</p>;
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div key={doc.id} className="border p-4 rounded-lg bg-white shadow">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">{doc.title}</h3>
            <PdfButton 
            title={doc.title}
            content={doc.content}
            />
          </div>
          <p className="mt-2 text-gray-600">{doc.content}</p>
          <p className="text-xs text-gray-400 mt-2">
            Creado: {new Date(doc.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
