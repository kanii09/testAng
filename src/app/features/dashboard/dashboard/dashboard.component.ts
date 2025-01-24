import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AppbarComponent } from '../../../shared/components/appbar/appbar.component';
import { SideMenuComponent } from '../../../shared/components/side-menu/side-menu.component';


@Component({
  selector: 'app-dashboard',
  imports: [AppbarComponent, SideMenuComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
