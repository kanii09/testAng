import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiChoiceComponent } from './multi-choice.component';

describe('MultiChoiceComponent', () => {
  let component: MultiChoiceComponent;
  let fixture: ComponentFixture<MultiChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiChoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
