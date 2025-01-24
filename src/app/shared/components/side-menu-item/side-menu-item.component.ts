import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideMenuItem } from '../../../core/models/sideMenuIem/side-menu-item';
import { IconComponent } from "../../../../../projects/icon/src/lib/icon/icon.component";

@Component({
  selector: 'app-side-menu-item',
  imports: [RouterModule, RouterLink, CommonModule, IconComponent],
  templateUrl: './side-menu-item.component.html',
  styleUrl: './side-menu-item.component.css'
})
export class SideMenuItemComponent {
  @Input() item: SideMenuItem = new SideMenuItem();
  @Input() isMenuOpen: boolean = true;

  constructor(public router: Router) {}

  isActive(link?: string): boolean {
    return link ? this.router.url.includes(link) : false;
  }
}
