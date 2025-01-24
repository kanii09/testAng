import { Component, EventEmitter, Output } from '@angular/core';
import { IconTextComponent } from '../../components/icon-text/icon-text.component';

@Component({
  selector: 'app-question-type-card',
  imports: [IconTextComponent ],
  templateUrl: './question-type-card.component.html',
  styleUrl: './question-type-card.component.css'
})
export class QuestionTypeCardComponent {
  @Output() onClickEvent = new EventEmitter<string>();

  questionTypeOptions = [
    {
      'title': 'Text',
      'icon': 'ph:text-aa'
    },
    {
      'title': 'Single select',
      'icon': 'ph:check-square'
    },
    {
      'title': 'Multiple choice',
      'icon': 'ph:list-checks'
    },
    {
      'title': 'List',
      'icon': 'ph:list-bullets'
    },
  ];

  selectedOption: string | null = null; // To track the selected option

  onOptionSelect(optionTitle: string): void {
    this.selectedOption = optionTitle; // Set selected option
    this.onClickEvent.emit(optionTitle); // Emit event for parent component
  }

}
