import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { dropDownOptions, SideMenuItem } from '../../../core/models/sideMenuIem/side-menu-item';
import { SideMenuItemComponent } from "../side-menu-item/side-menu-item.component";
import { DropdownSideMenuItemComponent } from "../dropdown-side-menu-item/dropdown-side-menu-item.component";
import { IconModule } from "../../../../../projects/icon/src/lib/icon/icon.module";


@Component({
  selector: 'app-side-menu',
  imports: [RouterModule, CommonModule, SideMenuItemComponent, DropdownSideMenuItemComponent, IconModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  // Menu Items
  menuItems: SideMenuItem[] = [
    new SideMenuItem({
      text: 'Overview',
      isDropDown: false,
      icon: 'ph:squares-four',
      link: 'overview'
    }),
    // drop down item 
    new SideMenuItem({
      text: 'Create New',
      isDropDown: true,
      icon: 'ph:file-plus',
      isOpen: false,
      options: [
        new dropDownOptions({
          link: 'create-questionnaire',
          text: 'create new'
        }),
        new dropDownOptions({
          link: 'use-template',
          text: 'use template'
        }),
        new dropDownOptions({
          link: 'upload-file',
          text: 'upload file'
        }),
      ]
    }),

    // messages 
    new SideMenuItem({
      text: 'Messages',
      isDropDown: false,
      icon: 'ph:envelope-simple',
      link: 'messages'
    }),

    // manage 
    new SideMenuItem({
      text: 'Manage',
      isDropDown: false,
      icon: 'ph:user-gear',
      link: 'manage-questionnaires'
    }),
  ];

  constructor(public router: Router) {}

  isActive(link?: string): boolean {
    return link ? this.router.url.includes(link) : false;
  }
  

  // State
  isMenuOpen = false;

  // Toggle Menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Toggle Dropdown
  toggleDropdown(item: SideMenuItem) {
    if (this.isMenuOpen) {
      // If the menu is already open, toggle the dropdown
      item.isOpen = !item.isOpen;
    } else {
      // If the menu is closed, open it and set the dropdown to open
      this.isMenuOpen = true;
      item.isOpen = true;
    }
  }
  

}
