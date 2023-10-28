import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showLoginError: boolean = false;
  disableSubmit: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { username, password } = form.value;

      this.disableSubmit = true;

      this.authService.login(username, password)
      .then((response) => {
        this.router.navigate(['/dashboard'])
      })
      .catch(error => {
        this.showLoginError = true;
      })
      .finally(() => {
        this.disableSubmit = false;
      })
    }
  }
}
