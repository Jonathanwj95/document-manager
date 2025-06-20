import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createDocumentSchema } from '../interfaces/schemas';
import { z } from 'zod';

export default function DocumentForm({ onSubmit }: { onSubmit: (data: z.infer<typeof createDocumentSchema>) => void }) {
  type DocumentFormData = z.infer<typeof createDocumentSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DocumentFormData>({ resolver: zodResolver(createDocumentSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          {...register('title')}
          className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contenido</label>
        <textarea
          {...register('content')}
          rows={4}
          className={`w-full p-2 border rounded ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.content && <p className="text-red-500 text-xs">{errors.content.message}</p>}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Crear Documento
      </button>
    </form>
  );
}
