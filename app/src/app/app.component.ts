import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor (private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
