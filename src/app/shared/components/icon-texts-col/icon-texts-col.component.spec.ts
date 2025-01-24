import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTextsColComponent } from './icon-texts-col.component';

describe('IconTextsColComponent', () => {
  let component: IconTextsColComponent;
  let fixture: ComponentFixture<IconTextsColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconTextsColComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconTextsColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
