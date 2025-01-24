import { SectionModel } from "../section/section";

export class Questionnaire {
  constructor(
    public id?: number,
    public createdAt?: string, // Store as a string in ISO format
    public modifiedAt?: string, // Store as a string in ISO format
    public title?: string,
    public description?: string,
    public status?: string,
    public category?: string,
    public ownerId?: string,
    public editorIds?: [],
    public viewerIds?: [],
    public sections: SectionModel[] = []
  ) {}

  static generateId(): number {
    // Generate a unique 4-digit number ID (between 1000 and 9999)
    return Math.floor(Math.random() * 9000) + 1000; // Ensures 4-digit range
  }
}
