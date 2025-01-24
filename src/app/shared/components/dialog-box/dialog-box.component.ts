import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SectionSettingsCardComponent } from "../../cards/section-settings-card/section-settings-card.component";
import { PrimaryButtonComponent } from "../../form/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../form/secondary-button/secondary-button.component";

@Component({
  selector: 'app-dialog-box',
  imports: [PrimaryButtonComponent, SecondaryButtonComponent],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css'
})
export class DialogBoxComponent {
  @Input() dialogHeading: string = '';
  @Input() dialogMessage: string = '';
  @Input() confirmText: string = '';
 
  @Output() cancelDialogEvent = new EventEmitter<void>();
  @Output() confirmDialogEvent = new EventEmitter<void>();

}
