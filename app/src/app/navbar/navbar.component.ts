import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showNotification: boolean = false;
  notifications: Array<any> = []

  constructor (
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.userService.getUnreadNotifications()
        .then(response => {
          this.notifications = response.data
        })
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleNotifications(): void {
    this.showNotification = !this.showNotification;

    const notIds = this.notifications.map(n => n._id)
    this.userService.markNotificationsAsRead(notIds)
  }

  onLogout(): void {
    this.authService.logout();

    this.router.navigate(['/login'])
  }
}
