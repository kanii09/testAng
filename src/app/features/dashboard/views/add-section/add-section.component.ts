import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Questionnaire } from '../../../../core/models/questionnaire/questionnaire';
import { QuestionnaireService } from '../../../../core/services/questionnaire/questionnaire.service';
import { SectionService } from '../../../../core/services/section/section.service';
import { SectionModel } from '../../../../core/models/section/section';
import { QuestionModel } from '../../../../core/models/question/question-model';
import { SectionCardComponent } from "../../../../shared/cards/section-card/section-card.component";
import { SectionHeaderbtnComponent } from '../../../../shared/buttons/section-headerbtn/section-headerbtn.component';
import { QuestionSettingsCardComponent } from "../../../../shared/cards/question-settings-card/question-settings-card.component";
import { QuestionService } from '../../../../core/services/question/question.service';
import { SectionSettingsCardComponent } from "../../../../shared/cards/section-settings-card/section-settings-card.component";
import { FormsModule } from '@angular/forms';
import { DialogBoxComponent } from "../../../../shared/components/dialog-box/dialog-box.component";
import { SecondaryButtonComponent } from "../../../../shared/form/secondary-button/secondary-button.component";
import { PrimaryButtonComponent } from "../../../../shared/form/primary-button/primary-button.component";
import { TertiaryButtonComponent } from "../../../../shared/form/tertiary-button/tertiary-button.component";
import { IconTextComponent } from "../../../../shared/components/icon-text/icon-text.component";
import { SubSectionModel } from '../../../../core/models/subSection/sub-section';
import { SubSectionService } from '../../../../core/services/subSection/sub-section.service';


@Component({
  selector: 'app-add-section',
  imports: [CommonModule, FormsModule, SectionCardComponent, SectionHeaderbtnComponent, QuestionSettingsCardComponent, SectionSettingsCardComponent, DialogBoxComponent, SecondaryButtonComponent, PrimaryButtonComponent, TertiaryButtonComponent],
  templateUrl: './add-section.component.html',
  styleUrl: './add-section.component.css'
})
export class AddSectionComponent implements OnInit {
  sections: SectionModel[] = [];
  subSections: SubSectionModel[] = [];
  question: QuestionModel = new QuestionModel();
  questionnaire: Questionnaire | null = null;
  selectedQuestion: QuestionModel | null = null;
  selectedSection: SectionModel | null = null;

  currentSectionId: number | undefined;
  currentSubSectionId: number | undefined;

  showDeleteSectionDialog: boolean = false;
  showDeleteQuestionDialog: boolean = false;
  showDeleteSubSectionDialog: boolean = false;
  showDeleteSubSectionQuestionDialog: boolean = false;
  isLoading: boolean = false;

  sectionToBeDeletedId: number | undefined;
  questionToBeDeletedId: number | undefined;
  subSectionToBeDeletedId: number | undefined;
  subSectionquestionToBeDeletedId: number | undefined;
  
  constructor(
    private router: Router,
    private sectionService: SectionService,
    private subSectionService: SubSectionService,
    private route: ActivatedRoute,
    private questionnaireService: QuestionnaireService,
    private questionService: QuestionService
  ) {
    this.questionService.selectedQuestion$.subscribe((question) => {
      this.selectedQuestion = question;
    });

    this.sectionService.selectedSection$.subscribe((section) => {
      this.selectedSection = section;
    });

  }


  ngOnInit(): void {
    // Retrieve the 'id' from the route parameters
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.questionnaire = this.questionnaireService.getQuestionnaireById(id);

    if(this.questionnaire) {
      
      const sections = this.sectionService.getSections(this.questionnaire!.id!) || [];


      if(sections) {

        this.sections = sections;

        
      }

      if(this.selectedSection) {
        const subSections = this.subSectionService.getSubSections(this.questionnaire!.id!) || [];
        if(subSections) {
          this.subSections = subSections;
        }
      }
    
      }
  }

  setSelectedQuestion(question: QuestionModel) {
    this.selectedQuestion = question;
  }

  setCurrentSectionId(sectionId: number) {
    this.currentSectionId = sectionId;
  }

  setCurrentSubSectionId(subSectionId: number) {
    this.currentSubSectionId = subSectionId;
  }

  updateSection(updatedSection: SectionModel) {
    const section = this.sections.find(s =>
      s.id === updatedSection.id
    );
    if (section) {
      this.sectionService.saveSection(this.questionnaire?.id!, section)
    }
  }

  // save edit delete sections
  addSectionToQuestionnaire(): void {
    let newId: number;
    if(this.sections.length > 0 ) {
      do {
        newId = SectionModel.generateId();
      } while (this.sections.some(section => section.id === newId));
    
    } else {
      newId = SectionModel.generateId();
    }
    
    const newSection = new SectionModel(newId);
    if (this.questionnaire) {
      this.sectionService.saveSection(this.questionnaire.id!, newSection);
    }
  }

  editSection(updatedSection: SectionModel): void {
    if (this.questionnaire) {
      this.sectionService.saveSection(this.questionnaire.id!, updatedSection);
    }
  }

  confirmSectionDelete(sectionId: number): void {
    this.sectionToBeDeletedId = sectionId;
    this.showDeleteSectionDialog = true;
  }

  cancelSectionDelete() {
    this.sectionToBeDeletedId = undefined;
    this.showDeleteSectionDialog = false;
  }

  deleteSection(): void {
    if (this.questionnaire && this.sectionToBeDeletedId) {
      this.sectionService.deleteSection(this.questionnaire.id!, this.sectionToBeDeletedId);
      this.sectionToBeDeletedId = undefined;
      this.showDeleteSectionDialog = false;
      this.sections = this.sectionService.getSections(this.questionnaire!.id!) || [];
    }
  }

  // CRUB sub section
  addSubSectionToSection(sectionId: number): void {
    let newId: number;

    if(this.questionnaire) {
      const section = this.questionnaire.sections.find((s) => s.id === sectionId);

      if(section) {
        do {
          newId = SubSectionModel.generateId();
        } while (section.subSections.some(question => question.id === newId)); 
        // 
      
        const newQuestion = new SubSectionModel(newId);
        this.subSectionService.saveSubSection(this.questionnaire.id!, sectionId, newQuestion);
      
      }
    }
  }

  editSubSection(updatedSubSection: SubSectionModel): void {
    if (this.questionnaire && this.currentSectionId) {
      this.sectionService.saveSubSectionToSection(this.questionnaire.id!, this.currentSectionId, updatedSubSection);
    }
  }

  confirmSubSectionDelete(subSectionId: number): void {
    this.subSectionToBeDeletedId = subSectionId;
    this.showDeleteSubSectionDialog = true;
  }

  cancelSubSectionDelete() {
    this.subSectionToBeDeletedId = undefined;
    this.showDeleteSubSectionDialog = false;
  }

  deleteSubSection(): void {
    if (this.questionnaire && this.currentSectionId && this.subSectionToBeDeletedId) {
      this.sectionService.deleteSubSectionfromSection(this.questionnaire.id!, this.currentSectionId, this.subSectionToBeDeletedId);
      this.subSectionToBeDeletedId = undefined;
      this.showDeleteSubSectionDialog = false;
      this.sections = this.sectionService.getSections(this.questionnaire!.id!) || [];
    }
  }

  // CRUD question on SubSection 
  addQuestionToSubSection(sectionId: number, subSectionId: number): void {
    let newId: number;

    if(this.questionnaire) {
      const section = this.questionnaire.sections.find((s) => s.id === sectionId);

      if(section) {
        const subSection = section.subSections.find((ss) => ss.id === sectionId);

        if(subSection) {
          do {
            newId = QuestionModel.generateId();
          } while (subSection.questions.some(question => question.id === newId)); 
          // 
        
          const newQuestion = new QuestionModel(newId);
          this.questionService.saveQuestionToSubSection(this.questionnaire.id!, sectionId, subSectionId, newQuestion);
        
        }
        
      }
    }
  }

  editSubSectionQuestion(updatedQuestion: QuestionModel): void {
    if (updatedQuestion && this.questionnaire) {
      this.questionService.saveQuestionToSubSection(this.questionnaire.id!, this.currentSectionId!, this.currentSubSectionId!, updatedQuestion);
    }
  }

  confirmSubSectionQuestionDelete(subSectionQuestionId: number): void {
    this.subSectionquestionToBeDeletedId = subSectionQuestionId;
    this.showDeleteSubSectionQuestionDialog = true;
  }

  cancelSubSectionQuestionDelete() {
    this.subSectionquestionToBeDeletedId = undefined;
    this.showDeleteSubSectionQuestionDialog = false;
  }

  deleteSubSectionQuestion(): void {
    if (this.questionnaire && this.subSectionquestionToBeDeletedId) {
      this.questionService.deleteSubSectionQuestion(this.questionnaire.id!, this.currentSectionId!, this.currentSubSectionId!, this.subSectionquestionToBeDeletedId);
      this.questionToBeDeletedId = undefined;
      this.showDeleteQuestionDialog = false;
      this.sections = this.sectionService.getSections(this.questionnaire!.id!) || [];
    }
  }

  addQuestionToSection(sectionId: number): void {
    let newId: number;

    if(this.questionnaire) {
      const section = this.questionnaire.sections.find((s) => s.id === sectionId);

      if(section) {
        do {
          newId = QuestionModel.generateId();
        } while (section.questions.some(question => question.id === newId)); 
        // 
      
        const newQuestion = new QuestionModel(newId);
        this.questionService.saveQuestion(this.questionnaire.id!, sectionId, newQuestion);
      
      }
    }
  }

  editQuestion(updatedQuestion: QuestionModel): void {
    if (updatedQuestion && this.questionnaire) {
      this.questionService.saveQuestion(this.questionnaire.id!, this.currentSectionId!, updatedQuestion);
    }
  }

  confirmQuestionDelete(questionId: number): void {
    this.questionToBeDeletedId = questionId;
    this.showDeleteQuestionDialog = true;
  }

  cancelQuestionDelete() {
    this.questionToBeDeletedId = undefined;
    this.showDeleteQuestionDialog = false;
  }

  deleteQuestion(): void {
    if (this.questionnaire && this.questionToBeDeletedId) {
      this.questionService.deleteQuestion(this.questionnaire.id!, this.currentSectionId!, this.questionToBeDeletedId);
      this.questionToBeDeletedId = undefined;
      this.showDeleteQuestionDialog = false;
      this.sections = this.sectionService.getSections(this.questionnaire!.id!) || [];
    }
  }

  saveQuestionnaireUpdates(): void {
    this.isLoading = true; // Start loader
    
    // Simulating a delay to mimic an asynchronous operation
    setTimeout(() => {
      this.isLoading = false; // Stop loader
      this.router.navigate(['dashboard/overview']); // Navigate to overview
    }, 2000); // 2-second delay for demonstration purposes

  }
}