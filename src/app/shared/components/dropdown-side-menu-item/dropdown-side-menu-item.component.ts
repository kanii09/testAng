import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideMenuItem } from '../../../core/models/sideMenuIem/side-menu-item';
import { IconComponent } from "../../../../../projects/icon/src/lib/icon/icon.component";

@Component({
  selector: 'app-dropdown-side-menu-item',
  imports: [RouterModule, IconComponent, RouterLink, CommonModule],
  templateUrl: './dropdown-side-menu-item.component.html',
  styleUrl: './dropdown-side-menu-item.component.css'
})
export class DropdownSideMenuItemComponent {
  @Input() item: SideMenuItem = new SideMenuItem(); // Accept the dropdown menu item object as input
  @Input() isMenuOpen: boolean = true;

  @Output() toggleDropdownEvent = new EventEmitter<SideMenuItem>();

  constructor(public router: Router) {}

  toggleDropdown(item: any): void {
    item.isOpen = !item.isOpen;
  }

  isActive(link?: string): boolean {
    return link ? this.router.url.includes(link) : false;
  }
}
