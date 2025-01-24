import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionModel } from '../../models/question/question-model';
import { SectionService } from '../section/section.service';
import { SubSectionService } from '../subSection/sub-section.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions: QuestionModel[] = [];

  private selectedQuestionSubject = new BehaviorSubject<QuestionModel | null>(null);
  selectedQuestion$ = this.selectedQuestionSubject.asObservable();

  getQuestions(sectionId: number): QuestionModel[] | null {
    const questions = this.sectionService.getAllQuestions(sectionId) || null;
    if(questions) {
      this.questions = questions;
    }
    return questions;
  }

  getSelectedQuestion(): QuestionModel | null {
    return this.selectedQuestionSubject.value;
  }

  setSelectedQuestion(question: QuestionModel) {
    this.selectedQuestionSubject.next(question);
  }

  resetSelectedQuestion() {
    this.selectedQuestionSubject.next(null);
  }

  constructor(private sectionService: SectionService, private subSectionService: SubSectionService) {}

  saveQuestionToSubSection(
    questionnaireId: number,
    sectionId: number,
    subSectionId: number,
    question: QuestionModel
  ): void {
    this.subSectionService.saveQuestionToSubSection(questionnaireId, sectionId, subSectionId, question);
  }

  saveQuestion(
    questionnaireId: number,
    sectionId: number,
    question: QuestionModel
  ): void {
    this.sectionService.saveQuestionToSection(questionnaireId, sectionId, question);
  }

  deleteQuestion(
    questionnaireId: number,
    sectionId: number,
    questionId: number
  ): void {
    this.sectionService.deleteQuestionFromSection(questionnaireId, sectionId, questionId);
  }

  deleteSubSectionQuestion(
    questionnaireId: number,
    sectionId: number,
    subSectionId: number,
    questionId: number
  ): void {
    this.subSectionService.deleteQuestionFromSection(questionnaireId, sectionId, subSectionId, questionId);
  }

  
}
