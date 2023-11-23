import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() showNotifications: boolean = false;
  @Input() notifications: Array<any> = []

  constructor(private router: Router) {}

  goToConnections(): void {
    this.router.navigate(['/connections']);
  }
}
