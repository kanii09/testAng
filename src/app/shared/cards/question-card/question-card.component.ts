import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QuestionModel } from '../../../core/models/question/question-model';
import { FormsModule } from '@angular/forms';
import { QuestionTypeCardComponent } from '../question-type-card/question-type-card.component';
import { QuestionService } from '../../../core/services/question/question.service';
import { IconTextsColComponent } from "../../components/icon-texts-col/icon-texts-col.component";
import { SectionService } from '../../../core/services/section/section.service';
import { CommonModule } from '@angular/common';
import { SingleSelectComponent } from '../../questionTypes/single-select/single-select.component';
import { MultiChoiceComponent } from '../../questionTypes/multi-choice/multi-choice.component';
import { TextComponent } from '../../questionTypes/text/text.component';
import { ListComponent } from '../../questionTypes/list/list.component';
import { OptionItem } from '../../../core/models/optionItem/option-item';



@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule, FormsModule, QuestionTypeCardComponent, IconTextsColComponent],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css'
})
export class QuestionCardComponent {
  @Input() question!: QuestionModel;
  @Input() questionIndex!: number;

  @Output() onDelete = new EventEmitter<number>(); // Event emitter for button click
  @Output() saveEvent = new EventEmitter<QuestionModel>();

  isSectionSelected: boolean = false;

  isEditMode: boolean = true; // Start in edit mode for new questions

  // Mapping of question types to their respective components
  questionTypeComponents: Record<string, any> = {
    'Single select': SingleSelectComponent,
    'Multiple choice': MultiChoiceComponent,
    'Text': TextComponent,
    'List': ListComponent
    // Add more mappings as needed
  };

  get questionComponent() {
    if (this.question.type) {
      return {
        component: this.questionTypeComponents[this.question.type] || null,
        inputs: {
          options: this.question.options || [],  // Ensure options array is passed correctly
        },
      };
    }
    return null;
  }

  handleSaveOption(option: OptionItem) {
    if(option) {
      if (!this.question.options) {
        this.question.options = [];
      }
      this.question.options.push(option);
      this.saveEvent.emit(this.question);
    }
    
  }
  

  onQuestionTypeChange(type: string) {
    this.question.type = type;
    this.saveEvent.emit(this.question);
  }

  editQuestion() {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.saveEvent.emit(this.question);
    this.isEditMode = false;
  }

  constructor(private sectionService: SectionService, private questionService: QuestionService) {
    this.sectionService.selectedSection$.subscribe((section) => {
      this.isSectionSelected = section != null;
    });

  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  openSettings() {
    if(this.isSectionSelected) {
      this.sectionService.resetSelectedSection();
    }
    this.questionService.setSelectedQuestion(this.question);
  }

}