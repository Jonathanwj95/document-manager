import { Request, Response, NextFunction } from 'express';
import { DocumentService } from '../application/DocumentService';
import PDFDocument from 'pdfkit';
import { createDocumentSchema } from './schemas';

export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  // Crea un nuevo documento en la base de datos con validación
  async createDocument(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = createDocumentSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ errors: result.error.flatten() });
      return;
    }

    const { title, content } = result.data;
    try {
      const document = await this.documentService.createDocument(title, content);
      res.status(201).json(document);
    } catch (error) {
      console.error('Error en createDocument:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Obtiene todos los documentos con paginación
  async getAllDocuments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.max(1, parseInt(req.query.limit as string) || 5);

      const all = await this.documentService.getAllDocuments();
      const start = (page - 1) * limit;
      const pageDocs = all.slice(start, start + limit);

      res.json({
        data: pageDocs,
        meta: {
          total: all.length,
          page,
          limit,
          pages: Math.ceil(all.length / limit),
        },
      });
    } catch (error) {
      console.error('Error en getAllDocuments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Obtiene un documento por su ID
  async getDocumentById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    try {
      const document = await this.documentService.getDocumentById(id);
      if (!document) {
        res.status(404).json({ error: 'Document not found' });
        return;
      }
      res.json(document);
    } catch (error) {
      console.error('Error en getDocumentById:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Convierte contenido a PDF
  async convert(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log('📥 [convert] Request body:', req.body);
    const { title, content } = req.body;
    try {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');

      const doc = new PDFDocument();
      doc.pipe(res);

      doc.fontSize(18).text(title || 'Documento', {
        align: 'center',
        underline: true,
      });
      doc.moveDown();

      doc.fontSize(12).text(content, { align: 'left' });
      doc.end();
    } catch (error) {
      console.error('Error en convert:', error);
      res.status(500).json({ error: 'Error al generar el PDF' });
    }
  }

  // Borra un documento por su ID
  async deleteDocument(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    console.log('📥 [deleteDocument] llego DELETE para id', id);
    try {
      await this.documentService.deleteDocument(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error en deleteDocument:', error);
      res.status(500).json({ error: 'Error al borrar el documento' });
    }
  }
}
