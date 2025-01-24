import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionModel } from '../../../core/models/question/question-model';
import { SectionModel } from '../../../core/models/section/section';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { IconTextsColComponent } from "../../components/icon-texts-col/icon-texts-col.component";
import { SectionService } from '../../../core/services/section/section.service';
import { QuestionService } from '../../../core/services/question/question.service';
import { SubSectionModel } from '../../../core/models/subSection/sub-section';
import { SubSectionCardComponent } from "../sub-section-card/sub-section-card.component";
import { IconModule } from "../../../../../projects/icon/src/lib/icon/icon.module";

@Component({
  selector: 'app-section-card',
  standalone: true,
  imports: [FormsModule, QuestionCardComponent, DragDropModule, IconTextsColComponent, SubSectionCardComponent, IconModule],
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.css'],
})
export class SectionCardComponent {
  @Input() section: SectionModel = new SectionModel();
  @Input() index: number | undefined;

  // section events 
  @Output() onSectionDelete = new EventEmitter<number>();
  @Output() onSectionSave = new EventEmitter<SectionModel>();
  @Output() emitSectionId = new EventEmitter<number>();

  // Question events
  @Output() addQuestionEvent = new EventEmitter<void>();
  @Output() onQuestionDelete = new EventEmitter<number>(); 
  @Output() onQuestionSave = new EventEmitter<QuestionModel>();

  // Sub section events 
  @Output() addSubSectionEvent = new EventEmitter<void>();
  @Output() onSubSectionDelete = new EventEmitter<number>(); 
  @Output() onSubSectionSave = new EventEmitter<SubSectionModel>();
  @Output() emitSubSectionId = new EventEmitter<number>();
  @Output() onSubSectionQuestionDelete = new EventEmitter<number>(); 
  @Output() onSubSectionQuestionSave = new EventEmitter<QuestionModel>();

  isQuestionSelected: boolean = false;
  isEditing: boolean = false;

  constructor(private sectionService: SectionService, private questionService: QuestionService) {
    this.questionService.selectedQuestion$.subscribe((question) => {
      this.isQuestionSelected = question != null;
    });
  }

  showContent = false;

  isQuestionModel(item: any): item is QuestionModel {
    return item && !('questions' in item);
  }
  
  isSubSectionModel(item: any): item is SubSectionModel {
    return item && 'questions' in item && Array.isArray(item.questions);
  }
  
  

  toggleContent(): void {
    this.showContent = !this.showContent;
    this.emitSectionId.emit(this.section.id); // Emit section.id when toggling questions
  }

  addNewQuestion(): void {
    if (!this.showContent) {
      this.showContent = true;
    }

    this.addQuestionEvent.emit();

    this.emitSectionId.emit(this.section.id);
  }

  addNewSubSection(): void {
    if (!this.showContent) {
      this.showContent = true;
    }

    this.addSubSectionEvent.emit();

    this.emitSectionId.emit(this.section.id);
  }

  deleteQuestion(questionId: number): void {
    this.onQuestionDelete.emit(questionId);
  }
  

  drop(event: CdkDragDrop<QuestionModel[]>): void {
    moveItemInArray(this.section.questions, event.previousIndex, event.currentIndex);
  }

  openSettings() {
    if(this.isQuestionSelected) {
      this.questionService.resetSelectedQuestion();
    }
    this.sectionService.setSelectedSection(this.section);
  }
}
