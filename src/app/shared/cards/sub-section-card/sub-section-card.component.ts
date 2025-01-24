import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionModel } from '../../../core/models/question/question-model';
import { SectionModel } from '../../../core/models/section/section';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { SectionService } from '../../../core/services/section/section.service';
import { QuestionService } from '../../../core/services/question/question.service';
import { IconModule } from "../../../../../projects/icon/src/lib/icon/icon.module";
import { CommonModule } from '@angular/common';
import { QuestionCardComponent } from "../question-card/question-card.component";
import { IconTextsColComponent } from "../../components/icon-texts-col/icon-texts-col.component";
import { FormsModule } from '@angular/forms';
import { SubSectionModel } from '../../../core/models/subSection/sub-section';
import { SubSectionService } from '../../../core/services/subSection/sub-section.service';


@Component({
  selector: 'app-sub-section-card',
    imports: [FormsModule, IconModule, CommonModule, DragDropModule, QuestionCardComponent, IconTextsColComponent],
  templateUrl: './sub-section-card.component.html',
  styleUrl: './sub-section-card.component.css'
})
export class SubSectionCardComponent {
  @Input() subSection!: SubSectionModel;
  @Input() index: number | undefined;

  // section events 
  @Output() onSubSectionDelete = new EventEmitter<number>();
  @Output() onSubSectionSave = new EventEmitter<SubSectionModel>();
  @Output() emitSubSectionId = new EventEmitter<number>();

  // Question events
  @Output() addQuestionEvent = new EventEmitter<void>();
  @Output() onQuestionDelete = new EventEmitter<number>(); 
  @Output() onQuestionSave = new EventEmitter<QuestionModel>();

  isQuestionSelected: boolean = false;
  isSectionSelected: boolean = false;
  isEditing: boolean = false;

  constructor(private sectionService: SectionService, private subSectionService: SubSectionService, private questionService: QuestionService) {
    this.questionService.selectedQuestion$.subscribe((question) => {
      this.isQuestionSelected = question != null;
    });

    this.sectionService.selectedSection$.subscribe((section) => {
      this.isSectionSelected = section != null;
    });
  }

  showQuestions = false;

  toggleQuestions(): void {
    this.showQuestions = !this.showQuestions;
    this.emitSubSectionId.emit(this.subSection.id); // Emit section.id when toggling questions
  }

  addNewQuestion(): void {
    if (!this.showQuestions) {
      this.showQuestions = true;
    }

    this.addQuestionEvent.emit();

    this.emitSubSectionId.emit(this.subSection.id);
  }

  deleteQuestion(questionId: number): void {
    this.onQuestionDelete.emit(questionId);
  }
  

  drop(event: CdkDragDrop<QuestionModel[]>): void {
    moveItemInArray(this.subSection.questions, event.previousIndex, event.currentIndex);
  }

  openSettings() {
    // destory any open settings 
    if(this.isSectionSelected) {
      this.sectionService.resetSelectedSection();
    }else if(this.isQuestionSelected) {
      this.questionService.resetSelectedQuestion();
    }
    this.subSectionService.setSelectedSubSection(this.subSection);
  }
}
