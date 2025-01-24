import { OptionItem } from "../optionItem/option-item";

export class QuestionModel {
description: any;
    constructor(
      public id?: number,
      public title?: string,
      public variableName?: string,
      public skipWhen?: string,
      public type?: string,
      public question?: any,
      public options?: OptionItem[],
      public validators?: [],
      public isMandatory?: boolean
    ) {}
    static generateId(): number {
      // Generate a unique 4-digit number ID (between 1000 and 9999)
      return Math.floor(Math.random() * 9000) + 1000; // Ensures 4-digit range
    }
  }
  