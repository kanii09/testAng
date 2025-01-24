import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHeaderbtnComponent } from './section-headerbtn.component';

describe('SectionHeaderbtnComponent', () => {
  let component: SectionHeaderbtnComponent;
  let fixture: ComponentFixture<SectionHeaderbtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionHeaderbtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionHeaderbtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
