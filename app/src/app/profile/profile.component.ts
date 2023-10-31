import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';

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
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  disableSubmit: boolean = false;

  userInfo: UserInfo = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    gender: '',
    nationality: '',
    dateOfBirth: null
  }

  constructor (
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) {
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

  saveUserInfo(userInfoForm: NgForm) {
    if (userInfoForm.valid) {
      this.disableSubmit = true;

      this.userService.updateUser(this.userInfo)
        .then((responnse) => {
          this.showSuccessMessage = true;

          this.userInfo = responnse.data

          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000)
        })
        .catch((error) => {
          this.showErrorMessage = true;

          setTimeout(() => {
            this.showErrorMessage = false
          }, 3000)
        })
        .finally(() => {
          this.disableSubmit = false;
        })
    }
  }
}
