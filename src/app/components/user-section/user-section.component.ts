import {Component} from '@angular/core';

import {ReactiveFormsModule,} from '@angular/forms';
import {CommonModule} from "@angular/common";

import {User} from "../../domain/user";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserSectionLoginComponent} from "./user-section-login/user-section-login.component";
import {AuthenticationService} from "../../services/authentication/authentication.service";


@Component({
  selector: 'user-section',
  templateUrl: './user-section.component.html',
  styleUrl: './user-section.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class UserSectionComponent {
  private readonly dialogConfig = new MatDialogConfig();

  constructor(private dialog: MatDialog,
              private authenticationService: AuthenticationService) {
  }

  displaySignUpModal(): void {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.data = {};

    const dialogRef = this.dialog.open(UserSectionLoginComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      const username = result.username;
      const password = result.password;

      this.authenticationService.login(username, password).subscribe(
        (user: User) => {

        }
      );
    });
  }

  displayChangeLanguageModal() {

  }
}
