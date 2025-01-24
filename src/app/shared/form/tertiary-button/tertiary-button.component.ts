import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tertiary-button',
  imports: [],
  templateUrl: './tertiary-button.component.html',
  styleUrl: './tertiary-button.component.css'
})
export class TertiaryButtonComponent {
  @Input() buttonTitle: string = '';
  // @Input() type: string = 'submit';

  @Output() onClickEvent = new EventEmitter<void>();
}
