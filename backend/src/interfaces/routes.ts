import express, { RequestHandler } from 'express';
import { DocumentController } from './DocumentController';
import { DocumentRepositoryInMemory } from '../infrastructure/DocumentRepositoryInMemory';
import { DocumentService } from '../application/DocumentService';

const router = express.Router();
const repository = new DocumentRepositoryInMemory();
const service = new DocumentService(repository);
const controller = new DocumentController(service);

// Rutas de gestión de documentos
type Handler = RequestHandler;
router.post(
  '/documents',
  controller.createDocument.bind(controller) as Handler
);
router.get(
  '/documents',
  controller.getAllDocuments.bind(controller) as Handler
);
router.get(
  '/documents/:id',
  controller.getDocumentById.bind(controller) as Handler
);

// Nueva ruta para conversión de contenido a PDF
router.post(
  '/convert',
  controller.convert.bind(controller) as Handler
);

router.delete(
  '/documents/:id',
  controller.deleteDocument.bind(controller) as RequestHandler
);

export default router;
