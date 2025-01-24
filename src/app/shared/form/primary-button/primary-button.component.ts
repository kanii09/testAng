import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.css'
})
export class PrimaryButtonComponent {
  @Input() buttonTitle: string = '';
  @Input() isDisabled: boolean = false;
  // @Input() type: string = 'submit';

  @Output() onClickEvent = new EventEmitter<void>();

}
