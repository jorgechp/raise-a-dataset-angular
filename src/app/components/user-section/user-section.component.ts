import {Component, OnInit} from '@angular/core';

import {ReactiveFormsModule,} from '@angular/forms';
import {CommonModule} from "@angular/common";

import {User} from "../../domain/user";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserSectionLoginComponent} from "./user-section-login/user-section-login.component";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {TranslocoDirective, TranslocoService} from "@jsverse/transloco";
import {ChangeLanguageComponent} from "./change-language/change-language.component";
import {UserRole} from "../../domain/user-role";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'user-section',
  templateUrl: './user-section.component.html',
  styleUrl: './user-section.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslocoDirective
  ]
})
export class UserSectionComponent implements OnInit {
  private readonly signUpDialogConfig = new MatDialogConfig();
  private readonly languageDialogConfig = new MatDialogConfig();
  public userRoles: UserRole[] = [];
  protected readonly UserRole = UserRole;
  private loginWelcomeMessage: string = '';
  private logoutMessage: string = '';

  constructor(private dialog: MatDialog,
              private authenticationService: AuthenticationService,
              private translocoService: TranslocoService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.authenticationService.currentUserSubscription.subscribe((user) => {
      this.userRoles = user.getRoles();
    });
    this.loadTranslations();
  }

  displaySignUpModal(): void {
    this.signUpDialogConfig.disableClose = true;
    this.signUpDialogConfig.autoFocus = true;
    this.signUpDialogConfig.data = {};

    const dialogRef = this.dialog.open(UserSectionLoginComponent,
      this.signUpDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      const username = result.username;
      const password = result.password;

      this.authenticationService.login(username, password).subscribe(
        (user: User) => {
          this.snackBar.open(`${this.loginWelcomeMessage}, ${username}!`, undefined,
            {
              duration: 4000
            });
        }
      );
    });
  }

  doLogout() {
    this.authenticationService.generateAndStoreGuestUser();
    this.snackBar.open(`${this.logoutMessage}`, undefined,
      {
        duration: 4000
      });
  }

  displayChangeLanguageModal() {
    this.languageDialogConfig.disableClose = true;
    this.languageDialogConfig.autoFocus = true;
    this.languageDialogConfig.data = {};

    const dialogRef = this.dialog.open(ChangeLanguageComponent,
      this.languageDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.translocoService.setActiveLang(result.language);
    });
  }

  private loadTranslations() {
    this.translocoService.selectTranslate('login.welcomeAfterLogin')
      .subscribe(value => this.loginWelcomeMessage = value);
    this.translocoService.selectTranslate('logout.messageAfterLogout')
      .subscribe(value => this.logoutMessage = value);
  }
}
