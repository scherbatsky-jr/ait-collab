import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface UserInfo {
  firstName: string
  lastName: string
  email: string
  username: string
  gender: string
  nationality: string
  dateOfBirth: Date | null
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileSection: string = 'user-info-tab'

  userInfo: UserInfo = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    gender: '',
    nationality: '',
    dateOfBirth: null
  }

  constructor (private route: ActivatedRoute, private authService: AuthService) {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.profileSection = fragment;
      }
    });
  }

  ngOnInit() {
    const user = this.authService.getUser() as UserInfo

    this.userInfo = user
  }

  getTabPaneClass(tab: string): Array<string> {
    const cls = ['tab-pane']
    
    if (tab == this.profileSection) {
      cls.push('active')
    }

    return cls
  }

  saveUserInfo() {

  }
}
