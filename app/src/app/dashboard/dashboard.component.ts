import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  suggestions: Array<any> = []
  connections: Array<any> = []
  loadingSuggestions: boolean = false
  loadingConnections: boolean = false
  user?: any;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getUser()

    if (this.user.mentor) {
      this.getConnections()
    } else {
      this.getSuggestions()
    }
  }

  getConnections() {
    this.loadingConnections = true
    
    this.userService.getConnections()
    .then(response => {
      this.connections = response.data.connections
    })
    .finally(() => {
      this.loadingConnections = false
    })
  }

  getSuggestions () {
    this.loadingSuggestions = true
    this.userService.getSuggestions(4)
    .then(response => {
      this.suggestions = response.data
    })
    .finally(() => {
      this.loadingSuggestions = false
    })
  }

  sendConnectionRequest(id: string) {
    this.userService.sendConnectionRequest(id)
      .then((response) => {
        this.getSuggestions()
      })
  }
}
