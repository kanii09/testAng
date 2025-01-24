import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Questionnaire } from '../../../../core/models/questionnaire/questionnaire';
import { QuestionnaireService } from '../../../../core/services/questionnaire/questionnaire.service';
import { FormsModule } from '@angular/forms'; 
import { InputFieldComponent } from '../../../../shared/form/input-field/input-field.component';
import { CustomTextareaComponent } from '../../../../shared/form/custom-textarea/custom-textarea.component';
import { PrimaryButtonComponent } from "../../../../shared/form/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../../../shared/form/secondary-button/secondary-button.component";

@Component({
  selector: 'app-create-questionnaire',
  imports: [FormsModule, PrimaryButtonComponent, SecondaryButtonComponent],
  templateUrl: './create-questionnaire.component.html',
  styleUrl: './create-questionnaire.component.css'
})
export class CreateQuestionnaireComponent {
  questionnaire: Questionnaire = new Questionnaire();
  questionnaireTitle: string = '';
  questionnaireDescription: string = '';
  questionnaireStatus: string = 'draft'; // Default value
  showDialog: boolean = false;
  editingIndex: number | null = null;
  isLoading: boolean = false; // Loader state

ngModelOptions: any;

  constructor(
    private questionnaireService: QuestionnaireService,
    private router: Router
  ) {
    this.questionnaire.category = this.types[0];
  }

  types = ['Education', 'Household', 'Health'];

  onCancelDialog(): void {
    this.showDialog = false;
  }


  saveQuestionnaire(): void {
    this.isLoading = true; // Start loader
    const currentTimestamp = new Date().toISOString(); // Get the current timestamp
  
    const newQuestionnaire = new Questionnaire(
      Questionnaire.generateId(),
      currentTimestamp, // Assign current timestamp to createdAt
      currentTimestamp,
      this.questionnaireTitle,
      this.questionnaireDescription,
      this.questionnaireStatus,
      this.questionnaire.category
    );
    
    // Simulating a delay to mimic an asynchronous operation
    setTimeout(() => {
      this.questionnaireService.saveQuestionnaire(newQuestionnaire);
      this.isLoading = false; // Stop loader
      this.router.navigate(['dashboard/overview']); // Navigate to overview
    }, 2000); // 2-second delay for demonstration purposes

    this.resetForm();
  }

  deleteQuestionnaire(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.questionnaireTitle = '';
    this.questionnaireDescription = '';
  }
}
