import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-input-field',
  imports: [FormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css'
})
export class InputFieldComponent {
  @Input() inputId?: string;
  @Input() label?: string;  // Label for the input field
  @Input() placeholder?: string;  // Placeholder text
  @Input() type: string = 'text';  // Type of input field (e.g. text, number)
  @Input() value?: string;  // Default value for the input
  @Input() required: boolean = false;  // Whether the field is required

  @Output() valueChange = new EventEmitter<string>();  // To emit value changes to parent component

  // This will handle input changes and emit the value
  onValueChange(event: any): void {
    this.valueChange.emit(event.target.value);
  }
}
