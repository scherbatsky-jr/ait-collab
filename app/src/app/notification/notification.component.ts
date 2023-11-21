// notification.component.ts

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <div *ngIf="showNotifications" class="notification-dropdown">
      <p (click)="goToConnections()">You have connection requests</p>
    </div>
  `,
  styles: [`
    .notification-dropdown {
      position: absolute;
      top: 50px;
      right: 10px;
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      color: black;
      z-index: 1000;
    }
  `],
})
export class NotificationComponent {
  @Input() showNotifications: boolean = false;

  goToConnections(): void {
    // Add navigation logic to go to the connections page
    // For example, you can use Angular Router:
    // this.router.navigate(['/connections']);
  }
}
