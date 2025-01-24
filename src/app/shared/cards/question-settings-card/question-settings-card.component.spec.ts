import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSettingsCardComponent } from './question-settings-card.component';

describe('QuestionSettingsCardComponent', () => {
  let component: QuestionSettingsCardComponent;
  let fixture: ComponentFixture<QuestionSettingsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionSettingsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionSettingsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
