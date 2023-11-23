import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  disableSubmit: boolean = false;
  showError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard'])
    }
  }

  onSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      const userInfo = {
        'firstName': this.firstName,
        'lastName': this.lastName,
        'username': this.email.split('@')[0],
        'email': this.email,
        'password': this.password
      }

      this.disableSubmit = true;

      this.authService.register(userInfo)
        .then((response) => {
          this.router.navigate(['/dashboard'])
        })
        .catch((error) => {
          this.showError = true;
        })
        .finally(() => {
          this.disableSubmit = false;
        })
    }
  }
}
