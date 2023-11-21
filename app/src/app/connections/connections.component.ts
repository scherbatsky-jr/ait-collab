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

  constructor(private userService: UserService) {}

  ngOnInit () {
    this.userService.getConnections()
      .then(response => {
        this.mentors = response.data.connections
      })

      this.userService.getPendingConnectionRequests()
      .then(response => {
        this.pendingRequests = response.data
      })

      this.userService.getSuggestions()
      .then(response => {
        this.suggestions = response.data
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
        this.suggestions = this.suggestions?.filter(mentor => mentor._id != id)
      })
  }
  
}
