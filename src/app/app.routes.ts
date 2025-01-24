import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { OverviewComponent } from './features/dashboard/views/overview/overview.component';
import { CreateQuestionnaireComponent } from './features/dashboard/views/create-questionnaire/create-questionnaire.component';
import { AddSectionComponent } from './features/dashboard/views/add-section/add-section.component';
import { UseTemplateComponent } from './features/dashboard/views/use-template/use-template.component';
import { UploadFileComponent } from './features/dashboard/views/upload-file/upload-file.component';
import { MessagesComponent } from './features/dashboard/views/messages/messages.component';
import { ManageQuestionnairesComponent } from './features/dashboard/views/manage-questionnaires/manage-questionnaires.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    // canActivate: [authGuard],
    children: [
        { path: '', component: OverviewComponent },
        { path: 'overview', component: OverviewComponent },
        { path: 'create-questionnaire', component: CreateQuestionnaireComponent },
        { path: 'add-section/:id', component: AddSectionComponent },
        { path: 'use-template', component: UseTemplateComponent },
        { path: 'upload-file', component: UploadFileComponent },
        { path: 'messages', component: MessagesComponent },
        { path: 'manage-questionnaires', component: ManageQuestionnairesComponent },
      ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

