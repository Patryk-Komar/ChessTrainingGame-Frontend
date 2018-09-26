import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'account-page',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountPage implements OnInit {

  selectedFile: File;

  email: string;
  oldPassword: string;
  newPassword: string;

  constructor(private profileService: ProfileService, private userService: UserService) {
  }

  ngOnInit() {
    this.selectedFile = null;
    this.email = "";
    this.oldPassword = "";
    this.newPassword = "";
    this.showPlayerAvatar();
  }

  showPlayerAvatar(): void {
    this.profileService.getPlayerAvatar()
    .then(response => {
      if (response.success) {
        const {
          path
        } = response;
        $("img.profile-image").attr("src", path);
      } else {
        $("img.profile-image").attr("src", "../../../assets/shared/default-avatar.png");
      }
    });
  }

  onFileSelection(event) {
    this.selectedFile = <File>event.target.files[0];
    const fileName = this.selectedFile.name;
    let input = $("#fileUpload");
    if (this.selectedFile.size > 2097152) {
      alert("Size of file you tried to upload is too big.");
      input.replaceWith(input = input.clone(true));
    } else if (fileName.length < 5 || (fileName.slice(-4) !== ".jpg" && fileName.slice(-4) !== ".png")) {
      alert("Wrong file format.");
      input.replaceWith(input = input.clone(true));
    }
  }

  uploadFile() {
    if (this.selectedFile !== null && this.selectedFile.name.length > 5) {
      if (this.selectedFile.size <= 2097152) {
        const fileExtension = this.selectedFile.name.slice(-4);
        if (fileExtension === ".jpg" || fileExtension === ".png") {
          this.profileService.getPlayerSecretKey()
          .then(response => {
            if (response.success) {
              const {
                secret
              } = response;
              const formData = new FormData();
              const fileName = fileExtension === ".jpg" ? `${secret}.jpg` : `${secret}.png`;
              formData.append('file', this.selectedFile, fileName);
              this.profileService.uploadAvatar(formData)
              .then(response => {
                if (response.success) {
                  alert("File uploaded successfully. Refresh page to see your changes.");
                }
              });
            }
          });
        }
      }
    }
  }

  changePassword() {
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const passwordRegex = new RegExp(/^[A-Za-z\d.!@#$%^^&*-_](?=.*[A-Za-z])(?=.*\d)[A-Za-z\d.!@#$%^&*-_]{7,19}$/);
    if (emailRegex.test(this.email) && passwordRegex.test(this.newPassword) && passwordRegex.test(this.oldPassword)) {
      this.userService.changePassword(this.email, this.oldPassword, this.newPassword)
      .then(response => {
        if (!response.success) {
          alert("Something went wrong. Check credentials and try again.");
        }
      });
    } else {
      alert("You entered incorrect credentials.");
    }
  }

}
