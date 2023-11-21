import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent {
  mentors: Array<any> = []
  suggestions: Array<any> = []
  pendingRequests: Array<any> = []

  loadingConnections: boolean = false
  loadingSuggestions: boolean = false
  loadingRequests: boolean = false

  constructor(private userService: UserService) {}

  ngOnInit () {
    this.getConnections()
    this.getPendingRequests()
    this.getSuggestions()      
  }

  getConnections() {
    this.loadingConnections = true
    
    this.userService.getConnections()
    .then(response => {
      this.mentors = response.data.connections
    })
    .finally(() => {
      this.loadingConnections = false
    })
  }

  getPendingRequests() {
    this.loadingRequests = true
    this.userService.getPendingConnectionRequests()
      .then(response => {
        this.pendingRequests = response.data
      })
      .finally(() => {
        this.loadingRequests = false
      })
  }

  getSuggestions () {
    this.loadingSuggestions = true
    this.userService.getSuggestions()
    .then(response => {
      this.suggestions = response.data
    })
    .finally(() => {
      this.loadingSuggestions = false
    })
  }

  acceptConnectionRequest(id: string) {
    this.userService.acceptConnectionRequest(id)
      .then((response) => {
        this.ngOnInit()
      })
  }

  sendConnectionRequest(id: string) {
    this.userService.sendConnectionRequest(id)
      .then((response) => {
        this.getSuggestions()
      })
  }
  
}
