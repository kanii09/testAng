import { Injectable } from '@angular/core';
import { SectionService } from '../section/section.service';
import { SubSectionModel } from '../../models/subSection/sub-section';
import { QuestionModel } from '../../models/question/question-model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SubSectionService {
  private sections: SubSectionModel[] = [];

  private selectedSectionSubject = new BehaviorSubject<SubSectionModel | null>(null);
    selectedSection$ = this.selectedSectionSubject.asObservable();
  
  
  getSelectedSubSection(): SubSectionModel | null {
    return this.selectedSectionSubject.value;
  }

  getSubSections(questionnaireId: number): SubSectionModel[] | null {
    const sections = this.sectionService.getAllSubSections(questionnaireId) || null;
    if(sections) {
      this.sections = sections;
    }
    return sections;
  }

  getSubSectionById(id: number): SubSectionModel | null {
    const section = this.sections.find((s) => s.id === id) || null;
    if (section && !Array.isArray(section.questions)) {
      section.questions = []; // Ensure question is always an array
    }
    return section;
  }

  setSelectedSubSection(subSection: SubSectionModel) {
    console.log('Setting selected section:', subSection);
    this.selectedSectionSubject.next(subSection);
  }

  constructor(private sectionService: SectionService) {}

  saveSubSection(questionnaireId: number,
    sectionId: number, subSection: SubSectionModel): void {
    this.sectionService.saveSubSectionToSection(questionnaireId, sectionId, subSection);
  }

  deleteSubSection(
    questionnaireId: number,
    sectionId: number,
    subSectionId: number
  ): void {
    this.sectionService.deleteSubSectionfromSection(questionnaireId, sectionId, subSectionId);
  }

  saveQuestionToSubSection(
    questionnaireId: number,
    sectionId: number,
    subSectionId: number,
    question: QuestionModel
  ): void {
    this.sectionService.saveQuestionToSubSection(questionnaireId, sectionId, subSectionId, question);
  }
  
  deleteQuestionFromSection(
    questionnaireId: number,
    sectionId: number,
    subSectionId: number,
    questionId: number
  ): void {
    this.sectionService.deleteQuestionFromSubSection(questionnaireId, sectionId, subSectionId, questionId);
  }

  getAllQuestions(sectionId: number): QuestionModel[] {
    const section = this.getSubSectionById(sectionId); 

    return section!.questions;
  }

  // private sections: SectionModel[] = [];

  // editSection(updatedSection: SectionModel): void {
  //   const section = this.sections.find(s => s.id === updatedSection.id);
  //     if(section) {
  //       this.sections.push(section);
  //     }
  //   }

  // getSections(): SectionModel[] {
  //   return this.sections;
  // }

  // addSection(section: SectionModel): void {
  //   this.sections.push(section);
  // }

  // addQuestionToSection(sectionIndex: number, question: QuestionModel): void {
  //   this.sections[sectionIndex].questions.push(question);
  // }

  resetSelectedSubSection() {
    this.selectedSectionSubject.next(null);
  }

  
}
