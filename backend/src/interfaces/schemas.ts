import { z } from 'zod';

export const createDocumentSchema = z.object({
  title: z.string().min(1, "El título no puede estar vacío"),
  content: z.string().min(1, "El contenido no puede estar vacío")
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;