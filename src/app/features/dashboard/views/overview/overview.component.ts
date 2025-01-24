import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Questionnaire } from '../../../../core/models/questionnaire/questionnaire';
import { QuestionnaireService } from '../../../../core/services/questionnaire/questionnaire.service';
import { FormatDatePipe } from '../../../../core/pipes/format-date.pipe';
import { DialogBoxComponent } from "../../../../shared/components/dialog-box/dialog-box.component";
import { IconModule } from "../../../../../../projects/icon/src/lib/icon/icon.module";


@Component({
  selector: 'app-overview',
  imports: [RouterModule, RouterLink, FormatDatePipe, DialogBoxComponent, IconModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  
questionnaires: Questionnaire[] = [];
activeDropdown: number | null = null;
selectedQuestionnaire: Questionnaire = new Questionnaire();
selectedQuestionnaireId: number = 0;
showDeleteDialog: boolean = false;

constructor(
  private questionnaireService: QuestionnaireService,
  private router: Router
) {}

ngOnInit(): void {
  this.questionnaires = this.questionnaireService.getQuestionnaires();
}

toggleDropdown(index: number): void {
  this.activeDropdown = this.activeDropdown === index ? null : index;
}

confirmDelete(questionnaire: Questionnaire): void {
  this.selectedQuestionnaire = questionnaire;
  this.showDeleteDialog = true;
  this.activeDropdown = null;
}

editQuestionnaire(index: number): void {
  const questionnaire = this.questionnaires[index];
  // Navigate to edit page with questionnaire data
  this.router.navigate(['/survey-section'], { state: { questionnaire } });
  this.activeDropdown = null;
}

deleteQuestionnaire(): void {
  if(this.selectedQuestionnaire.id != null) {
    this.questionnaireService.deleteQuestionnaire(this.selectedQuestionnaire.id!);
    this.showDeleteDialog = false;
    this.questionnaires = this.questionnaireService.getQuestionnaires();
  }
    
}

}
