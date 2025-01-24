import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSideMenuItemComponent } from './dropdown-side-menu-item.component';

describe('DropdownSideMenuItemComponent', () => {
  let component: DropdownSideMenuItemComponent;
  let fixture: ComponentFixture<DropdownSideMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownSideMenuItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownSideMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
