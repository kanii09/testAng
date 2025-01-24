import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-textarea',
  imports: [FormsModule],
  templateUrl: './custom-textarea.component.html',
  styleUrl: './custom-textarea.component.css'
})
export class CustomTextareaComponent {
  @Input() label?: string;  // Label for the input field
  @Input() placeholder?: string;  // Placeholder text
  @Input() value: string = '';  // Default value for the input
  @Input() required: boolean = false;  // Whether the field is required

  @Output() valueChange = new EventEmitter<string>();  // To emit value changes to parent component

  // This will handle input changes and emit the value
  onValueChange(event: any): void {
    this.valueChange.emit(event.target.value);
  }
}
