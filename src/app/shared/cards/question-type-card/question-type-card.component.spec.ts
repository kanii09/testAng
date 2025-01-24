import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeCardComponent } from './question-type-card.component';

describe('QuestionTypeCardComponent', () => {
  let component: QuestionTypeCardComponent;
  let fixture: ComponentFixture<QuestionTypeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionTypeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
