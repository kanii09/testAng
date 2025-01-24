import { Component } from '@angular/core';
import { PrimaryButtonComponent } from "../../../shared/form/primary-button/primary-button.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [PrimaryButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) {}

  login() {
    //add login logic
    this.router.navigate(['dashboard/']); // Navigate to dashboard
  }
}
