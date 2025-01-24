import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Questionnaire } from '../../models/questionnaire/questionnaire';
import { SectionModel } from '../../models/section/section';
import { QuestionModel } from '../../models/question/question-model';
import { SubSectionModel } from '../../models/subSection/sub-section';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  private questionnaires: Questionnaire[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedData = localStorage.getItem('questionnaires');
      this.questionnaires = savedData ? JSON.parse(savedData) : [];
    } else {
      // Fallback for server-side rendering (e.g., initialize to an empty array)
      this.questionnaires = [];
    }
  }

  getQuestionnaires(): Questionnaire[] {
    return this.questionnaires;
  }

  /**
   * Retrieves a questionnaire by its ID.
   * @param id - The ID of the questionnaire to retrieve.
   * @returns The questionnaire if found, otherwise `null`.
   */
  getQuestionnaireById(id: number): Questionnaire | null {
    const questionnaire = this.questionnaires.find((q) => q.id === id) || null;
    if (questionnaire && !Array.isArray(questionnaire.sections)) {
      questionnaire.sections = []; // Ensure sections is always an array
    }
    return questionnaire;
  }
  

  saveQuestionnaire(questionnaire: Questionnaire): void {
    this.questionnaires.push(questionnaire);
    this.updateLocalStorage();
  }

  deleteQuestionnaire(id: number): void {
    this.questionnaires = this.questionnaires.filter((q) => q.id !== id);
    this.updateLocalStorage();
  }

  
  deleteSectionfromQuestionnaire(questionnaireId: number, sectionId: number): void {
    const questionnaire = this.getQuestionnaireById(questionnaireId);
    if (questionnaire) {
        // Remove the section with the specified ID
        questionnaire.sections = questionnaire.sections.filter((s) => s.id !== sectionId);
        // Update the questionnaire in the storage
        this.updateQuestionnaire(questionnaire);
    }
  }

  deleteSubSectionfromSection(questionnaireId: number, sectionId: number, subSectionId: number): void {
    const questionnaire = this.getQuestionnaireById(questionnaireId);
    if (questionnaire) {
      const section = questionnaire.sections.find((s) => s.id === sectionId);
      if (section) {
        // Remove the question with the specified ID
        section.subSections = section.subSections.filter((ss) => ss.id !== subSectionId);

        section.items = section.items.filter((is) => is.id !== subSectionId);

        // Update the questionnaire in the storage
        this.updateQuestionnaire(questionnaire);
      }
    }
  }

  deleteQuestion(questionnaireId: number, sectionId: number, questionId: number): void {
    const questionnaire = this.getQuestionnaireById(questionnaireId);
    if (questionnaire) {
      const section = questionnaire.sections.find((s) => s.id === sectionId);
      if (section) {
        // Remove the question with the specified ID
        section.questions = section.questions.filter((q) => q.id !== questionId);

        section.items = section.items.filter((iq) => iq.id !== questionId);

        // Update the questionnaire in the storage
        this.updateQuestionnaire(questionnaire);
      }
    }
  }

  deleteQuestionFromSubSection(questionnaireId: number, sectionId: number, subSectionId: number, questionId: number): void {
    const questionnaire = this.getQuestionnaireById(questionnaireId);
    if (questionnaire) {
      const section = questionnaire.sections.find((s) => s.id === sectionId);
      if (section) {
        const subSection = section.subSections.find((ss) => ss.id === subSectionId);

        if(subSection) {
          // Remove the question with the specified ID
          subSection.questions = subSection.questions.filter((q) => q.id !== questionId);
          // Update the questionnaire in the storage
          this.updateQuestionnaire(questionnaire);
        }
        
      }
    }
  }
  

  /**
   * Updates a questionnaire in the storage and synchronizes it with local storage.
   * @param questionnaire - The questionnaire to update.
   */
  updateQuestionnaire(questionnaire: Questionnaire): void {
    const currentTimestamp = new Date().toISOString(); // Get the current timestamp

    questionnaire.modifiedAt = currentTimestamp;

    const index = this.questionnaires.findIndex((q) => q.id === questionnaire.id);
    if (index > -1) {
      this.questionnaires[index] = questionnaire;
    } else {
      this.questionnaires.push(questionnaire);
    }
    this.updateLocalStorage();
  }

  addSection(index: number, section: SectionModel): void {
    this.questionnaires[index].sections.push(section);
  }

  getAllSections(questionnaireId: number): SectionModel[] {
    const questionnaire = this.getQuestionnaireById(questionnaireId); 
    return questionnaire!.sections;
  }

  saveSectionToQuestionnaire(questionnaireId: number, section: SectionModel): void {
    const questionnaire = this.getQuestionnaireById(questionnaireId);
    if (questionnaire) {
      const index = questionnaire.sections.findIndex((s) => s.id === section.id);
      if (index > -1) {
        questionnaire.sections[index] = section;
      } else {
        questionnaire.sections.push(section);
      }
      this.updateQuestionnaire(questionnaire);
    }
  } 

  saveSubSectionToSection(questionnaireId: number, sectionId: number, subSection: SubSectionModel): void {
    const questionnaire = this.getQuestionnaireById(questionnaireId);
    if (questionnaire) {
      const section = questionnaire.sections.find((s) => s.id === sectionId);
      if (section) {
        const index = section.subSections.findIndex((ss) => ss.id === subSection.id);

        if (index > -1) {
          section.subSections[index] = subSection;
        } else {
          section.subSections.push(subSection);
        }

        //all items
        const itemsIndex = section.items.findIndex((ii) => ii.id === subSection.id);

        if (itemsIndex > -1) {
          section.items[index] = subSection;
        } else {
          section.items.push(subSection);
        }
        this.updateQuestionnaire(questionnaire);
      }
    }
  }

  saveQuestionToSubSection(questionnaireId: number, sectionId: number, subSectionId: number, question: QuestionModel): void {
    const questionnaire = this.getQuestionnaireById(questionnaireId);
    if (questionnaire) {
      const section = questionnaire.sections.find((s) => s.id === sectionId);
      if (section) {
        const subSection = section.subSections.find((ss) => ss.id === subSectionId);

        if(subSection) {
          const index = subSection.questions.findIndex((q) => q.id === question.id);
        if (index > -1) {
          subSection.questions[index] = question;
        } else {
          subSection.questions.push(question);
        }
        this.updateQuestionnaire(questionnaire);
        }
        
      }
    }
  }

  saveQuestionToSection(questionnaireId: number, sectionId: number, question: QuestionModel): void {
    const questionnaire = this.getQuestionnaireById(questionnaireId);
    if (questionnaire) {
      const section = questionnaire.sections.find((s) => s.id === sectionId);
      if (section) {
        const index = section.questions.findIndex((q) => q.id === question.id);
        if (index > -1) {
          section.questions[index] = question;
        } else {
          section.questions.push(question);
        }
        
        //all items
        const itemsIndex = section.items.findIndex((ii) => ii.id === question.id);

        if (itemsIndex > -1) {
          section.items[index] = question;
        } else {
          section.items.push(question);
        }
        this.updateQuestionnaire(questionnaire);
      }
    }
  }


  private updateLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('questionnaires', JSON.stringify(this.questionnaires));
    }
  }
}
