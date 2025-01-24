import { Injectable } from '@angular/core';
import { SectionModel } from '../../models/section/section';
import { BehaviorSubject } from 'rxjs';
import { QuestionModel } from '../../models/question/question-model';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';
import { SubSectionModel } from '../../models/subSection/sub-section';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  private sections: SectionModel[] = [];

  private selectedSectionSubject = new BehaviorSubject<SectionModel | null>(null);
    selectedSection$ = this.selectedSectionSubject.asObservable();
  
  
  getSelectedSection(): SectionModel | null {
    return this.selectedSectionSubject.value;
  }

  getSections(questionnaireId: number): SectionModel[] | null {
    const sections = this.questionnaireService.getAllSections(questionnaireId) || null;
    if(sections) {
      this.sections = sections;
    }
    return sections;
  }

  getSectionById(id: number): SectionModel | null {
    const section = this.sections.find((s) => s.id === id) || null;
    if (section && !Array.isArray(section.questions)) {
      section.questions = []; // Ensure question is always an array
    }
    return section;
  }

  setSelectedSection(section: SectionModel) {
    console.log('Setting selected section:', section);
    this.selectedSectionSubject.next(section);
  }

  constructor(private questionnaireService: QuestionnaireService) {}

  saveSection(questionnaireId: number, section: SectionModel): void {
    this.questionnaireService.saveSectionToQuestionnaire(questionnaireId, section);
  }

  deleteSection(
    questionnaireId: number,
    sectionId: number,
  ): void {
    this.questionnaireService.deleteSectionfromQuestionnaire(questionnaireId, sectionId);
  }

  deleteSubSectionfromSection(
    questionnaireId: number,
    sectionId: number,
    subSectionId: number
  ): void {
    this.questionnaireService.deleteSubSectionfromSection(questionnaireId, sectionId, subSectionId);
  }

  saveSubSectionToSection(
    questionnaireId: number,
    sectionId: number,
    subSection: SubSectionModel
  ): void {
    this.questionnaireService.saveSubSectionToSection(questionnaireId, sectionId, subSection);
  }

  saveQuestionToSubSection(
    questionnaireId: number,
    sectionId: number,
    subSectionId: number,
    question: QuestionModel
  ): void {
    this.questionnaireService.saveQuestionToSubSection(questionnaireId, sectionId, subSectionId, question);
  }

  saveQuestionToSection(
    questionnaireId: number,
    sectionId: number,
    question: QuestionModel
  ): void {
    this.questionnaireService.saveQuestionToSection(questionnaireId, sectionId, question);
  }

  deleteQuestionFromSection(
    questionnaireId: number,
    sectionId: number,
    questionId: number
  ): void {
    this.questionnaireService.deleteQuestion(questionnaireId, sectionId, questionId);
  }

  

  deleteQuestionFromSubSection(
    questionnaireId: number,
    sectionId: number,
    subSectionId: number,
    questionId: number
  ): void {
    this.questionnaireService.deleteQuestionFromSubSection(questionnaireId, sectionId, subSectionId, questionId);
  }

  getAllSubSections(sectionId: number): SubSectionModel[] {
    const section = this.getSectionById(sectionId); 

    return section!.subSections;
  }

  getAllQuestions(sectionId: number): QuestionModel[] {
    const section = this.getSectionById(sectionId); 

    return section!.questions;
  }

  resetSelectedSection() {
    this.selectedSectionSubject.next(null);
  }

  
}
