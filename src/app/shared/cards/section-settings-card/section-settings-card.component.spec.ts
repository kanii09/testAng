import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSettingsCardComponent } from './section-settings-card.component';

describe('SectionSettingsCardComponent', () => {
  let component: SectionSettingsCardComponent;
  let fixture: ComponentFixture<SectionSettingsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionSettingsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionSettingsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
