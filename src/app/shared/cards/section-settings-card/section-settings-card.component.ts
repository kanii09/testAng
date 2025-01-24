import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SectionModel } from '../../../core/models/section/section';
import { SectionService } from '../../../core/services/section/section.service';
import { FormsModule } from '@angular/forms';
import { SecondaryButtonComponent } from "../../form/secondary-button/secondary-button.component";
import { PrimaryButtonComponent } from "../../form/primary-button/primary-button.component";

@Component({
  selector: 'app-section-settings-card',
  imports: [FormsModule, SecondaryButtonComponent, PrimaryButtonComponent],
  templateUrl: './section-settings-card.component.html',
  styleUrl: './section-settings-card.component.css'
})
export class SectionSettingsCardComponent {
selectedSection: SectionModel | null = null;
  @Output() saveSectionEvent = new EventEmitter<SectionModel>(); // Emits save event
  
  constructor(private sectionService: SectionService) {
    this.sectionService.selectedSection$.subscribe((section) => {
      this.selectedSection = section;
    });
  }

  validationAccordionOpen = false;

  toggleValidationAccordion() {
    this.validationAccordionOpen = !this.validationAccordionOpen;
  }

  saveSection() {
    if(this.selectedSection != null) {
      this.saveSectionEvent.emit(this.selectedSection); // Emit the updated question

    }
  }
}
