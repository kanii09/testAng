import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuestionnairesComponent } from './manage-questionnaires.component';

describe('ManageQuestionnairesComponent', () => {
  let component: ManageQuestionnairesComponent;
  let fixture: ComponentFixture<ManageQuestionnairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageQuestionnairesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
