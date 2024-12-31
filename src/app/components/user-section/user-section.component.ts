import {Component, OnInit} from '@angular/core';

import {ReactiveFormsModule,} from '@angular/forms';
import {CommonModule} from "@angular/common";

import {MatIconModule} from "@angular/material/icon";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserSectionLoginComponent} from "./user-section-login/user-section-login.component";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {TranslocoDirective, TranslocoService} from "@jsverse/transloco";
import {ChangeLanguageComponent} from "./change-language/change-language.component";
import {UserRole} from "../../domain/user-role";
import {MatSnackBar} from "@angular/material/snack-bar";
import {takeWhile} from "rxjs";
import {AbstractTranslationsComponent} from "../abstract/abstract-translations-component";
import {Router} from "@angular/router";


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
export class UserSectionComponent extends AbstractTranslationsComponent implements OnInit {
  private readonly signUpDialogConfig = new MatDialogConfig();
  private readonly languageDialogConfig = new MatDialogConfig();
  public userRoles: UserRole[] = [];
  protected readonly UserRole = UserRole;
  private logoutMessage: string = '';

  constructor(protected override translocoService: TranslocoService,
              private dialog: MatDialog,
              private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar,
              private router: Router) {
    super(translocoService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.authenticationService.currentUserSubscription.subscribe((user) => {
      this.userRoles = user.getRoles();
    });
  }

  displaySignUpModal(): void {
    this.signUpDialogConfig.disableClose = true;
    this.signUpDialogConfig.autoFocus = true;
    this.signUpDialogConfig.data = {};

    const dialogRef = this.dialog.open(UserSectionLoginComponent,
      this.signUpDialogConfig);
  }

  doLogout() {
    this.authenticationService.generateAndStoreGuestUser();
    this.snackBar.open(`${this.logoutMessage}`, undefined,
      {
        duration: 4000
      });
    this.router.navigate(['/']).then();
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

  protected loadTranslations() {
    this.translocoService.selectTranslate('logout.messageAfterLogout').pipe(takeWhile(() => this.isAlive))
      .subscribe(value => this.logoutMessage = value);
  }

  doUserSettings() {
    this.router.navigate(['/settings']).then();
  }
}
