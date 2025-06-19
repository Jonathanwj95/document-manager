// src/infrastructure/DocumentRepositoryInMemory.ts
import { Document } from "../domain/Document";

export class DocumentRepositoryInMemory {
  private documents: Document[] = [];

  async save(data: Omit<Document, "id" | "createdAt">): Promise<Document> {
    const newDoc: Document = {
      id: Math.random().toString(36).substring(2, 9),
      title: data.title,
      content: data.content,
      createdAt: new Date(),  
    };
    this.documents.push(newDoc);
    return newDoc;
  }

  async findAll(): Promise<Document[]> {
    return [...this.documents];
  }

  async findById(id: string): Promise<Document | undefined> {
    return this.documents.find((doc) => doc.id === id);
  }

  async delete(id: string): Promise<void> {
    this.documents = this.documents.filter((doc) => doc.id !== id);
  }
}
