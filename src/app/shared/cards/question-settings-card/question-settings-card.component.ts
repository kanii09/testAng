import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QuestionModel } from '../../../core/models/question/question-model';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../../core/services/question/question.service';
import { SecondaryButtonComponent } from "../../form/secondary-button/secondary-button.component";
import { PrimaryButtonComponent } from "../../form/primary-button/primary-button.component";
import { FormatDatePipe } from "../../../core/pipes/format-date.pipe";
import { IconModule } from "../../../../../projects/icon/src/lib/icon/icon.module";
import { CommonModule } from '@angular/common';
import { OptionItem } from '../../../core/models/optionItem/option-item';

@Component({
  selector: 'app-question-settings-card',
  imports: [FormsModule, SecondaryButtonComponent, PrimaryButtonComponent, CommonModule, IconModule],
  templateUrl: './question-settings-card.component.html',
  styleUrl: './question-settings-card.component.css'
})
export class QuestionSettingsCardComponent {
  selectedQuestion: QuestionModel | null = null;
  optionBeingEdited: OptionItem | null = null;

  @Input() sectionId: number | undefined;
  @Output() saveQuestionEvent = new EventEmitter<QuestionModel>(); // Emits save event

  validationAccordionOpen = false;

  toggleValidationAccordion() {
    this.validationAccordionOpen = !this.validationAccordionOpen;
  }

  constructor(private questionService: QuestionService) {
    this.subcription();
  }

  subcription() {
    this.questionService.selectedQuestion$.subscribe((question) => {
      this.selectedQuestion = question;
    });
  }

  saveQuestion() {
    if (this.selectedQuestion) {
      this.saveQuestionEvent.emit(this.selectedQuestion); // Emit the updated question
    }
  }

  addItem() {
    if (!this.selectedQuestion) return;
    let newId: number;
    do {
      newId = OptionItem.generateId();
    } while (this.selectedQuestion.options?.some(option => option.id === newId));

    const newOption = new OptionItem({ id: newId, variableName: '', name: '' });
    this.selectedQuestion.options = this.selectedQuestion.options || [];
    this.selectedQuestion.options.push(newOption);
    this.optionBeingEdited = newOption;
  }

  saveItem() {
    this.saveQuestion(); // Save all created/modified options
    this.optionBeingEdited = null;
  }

  toggleEdit(index: number) {
    if (!this.selectedQuestion?.options) return;
    const item = this.selectedQuestion.options[index];
    if (this.optionBeingEdited?.id === item.id) {
      this.saveItem();
    } else {
      this.optionBeingEdited = item;
    }
  }

  deleteItem(index: number) {
    if (!this.selectedQuestion?.options) return;
    this.selectedQuestion.options.splice(index, 1);
    this.saveQuestion();
  }
}
