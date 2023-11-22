import { Component,  ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { SchoolService } from '../_services/school.service';

import { months } from '../_constants/months';
import { programs } from '../_constants/programs';

import {
  AcademicInfo,
  DropdownOption,
  School,
  UserInfo
} from '../_interfaces/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  imageUrl: string | ArrayBuffer = '';
  profileImage!: File;

  profileSection: string = 'user-info-tab'
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  disableSubmit: boolean = false;
  schools: Array<School> = [];
  months: Array<String> = months;
  programs: Array<String> = programs;
  selectedFile: File | null = null;

  userInfo: UserInfo = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    gender: '',
    nationality: '',
    mentor: false,
    dateOfBirth: null
  }

  academicInfo: AcademicInfo = {
    intakeYear: '',
    intakeMonth: '',
    school: '',
    program: '',
    fieldOfStudy: '',
  }

  currentPassword = ''
  newPassword = ''
  confirmPassword = ''

  constructor (
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private schoolService: SchoolService
  ) {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.profileSection = fragment;
      }
    });
  }

  ngOnInit() {
    const user = this.authService.getUser() as UserInfo
    this.schoolService.fetchSchools();

    this.userInfo = user
    this.academicInfo = user.academicInfo ? user.academicInfo : this.academicInfo;
    this.schools = this.schoolService.getSchools() as Array<School>;
  }

  onCheckMentor() {
    this.userInfo.mentor = !this.userInfo.mentor
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileImage = file
      this.readImage(file);
    }
  }

  readImage(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  fieldOptions(): Array<DropdownOption> {
    if (this.academicInfo.school) {
      const school = this.schools.find(school => school.code === this.academicInfo.school)
      
      if (school) {
          return school.fieldOfStudies.map(field => {
            return {
              label: field.name,
              value: field.code
            } as DropdownOption
          })
        }
    }
    return [];
  }

  schoolOptions(): Array<DropdownOption> {
    return this.schools.map(school => {
      return {
        label: school.name,
        value: school.code
      }
    })
  }

  yearOptions(): Array<DropdownOption> {
    const currentYear = new Date().getFullYear();
    const startYear = 1970;
    const years = [];

    for (let year = currentYear; year >= startYear; year--) {
      years.push({
        label: year.toString(),
        value: year
      });
    }

    return years;
  }

  getTabPaneClass(tab: string): Array<string> {
    const cls = ['tab-pane']
    
    if (tab == this.profileSection) {
      cls.push('active')
    }

    return cls
  }

  saveAcademicInfo(academicForm: NgForm) {
    if (academicForm.valid) {
      this.userInfo.academicInfo = this.academicInfo;

      this.updateUser();
    }
  }

  saveUserInfo(userInfoForm: NgForm) {
    if (userInfoForm.valid) {
      this.updateUser();
    }
  }

  updateUser() {
    this. disableSubmit = true
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

  uploadPhoto() {
    if (this.profileImage) {
      this.userService.uploadPhoto(this.profileImage)
    }
  }

  changePassword() {
    this. disableSubmit = true
    this.userService.updatePassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    })
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
