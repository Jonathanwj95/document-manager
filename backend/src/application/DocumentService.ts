// src/application/DocumentService.ts
import { Document } from "../domain/Document";
import { DocumentRepositoryInMemory } from "../infrastructure/DocumentRepositoryInMemory";

export class DocumentService {
  constructor(private readonly repository: DocumentRepositoryInMemory) {}

  async createDocument(title: string, content: string): Promise<Document> {
    return this.repository.save({ title, content });
  }

  async getAllDocuments(): Promise<Document[]> {
    return this.repository.findAll();
  }

  async getDocumentById(id: string): Promise<Document | undefined> {
    return this.repository.findById(id);
  }

  async deleteDocument(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
