import { QuestionModel } from "../question/question-model";

export class SubSectionModel {
    constructor(
      public id?: number,
      public title?: string,
      public variableName?: string,
      public skipWhen?: string,
      public description?: string,
      public questions: QuestionModel[] = []
    ) {}
    
    static generateId(): number {
      // Generate a unique 4-digit number ID (between 1000 and 9999)
      return Math.floor(Math.random() * 9000) + 1000; // Ensures 4-digit range
    }
  }
  