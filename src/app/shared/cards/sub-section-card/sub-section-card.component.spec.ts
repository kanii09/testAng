import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSectionCardComponent } from './sub-section-card.component';

describe('SubSectionCardComponent', () => {
  let component: SubSectionCardComponent;
  let fixture: ComponentFixture<SubSectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubSectionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubSectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
