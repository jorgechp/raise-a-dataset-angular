import {Component, Input} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {UserSectionComponent} from "../user-section.component";
import {TranslocoDirective, TranslocoService} from "@jsverse/transloco";
import {catchError, of, takeWhile, tap} from "rxjs";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommonModule} from "@angular/common";
import {AbstractTranslationsComponent} from "../../abstract/abstract-translations-component";


interface DialogData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-user-section-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    TranslocoDirective,
  ],
  templateUrl: './user-section-login.component.html',
  styleUrl: './user-section-login.component.scss'
})
export class UserSectionLoginComponent extends AbstractTranslationsComponent {
  public formData: DialogData = {username: '', password: ''}
  @Input() isLoginError: boolean = false;
  private loginWelcomeMessage: string = '';

  constructor(protected override translocoService: TranslocoService,
              private dialogRef: MatDialogRef<UserSectionComponent>,
              private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar) {
    super(translocoService);
  }

  public login() {
    if (this.formData.username.length === 0 || this.formData.password.length === 0) {
      this.isLoginError = true;
      return;
    }
    this.authenticationService.login(this.formData.username, this.formData.password).pipe(
      tap(() => {
        this.snackBar.open(`${this.loginWelcomeMessage}, ${this.formData.username}!`, undefined,
          {
            duration: 4000
          });
        this.dialogRef.close();
      }),
      catchError(error => {
        if (error.status === 401) {
          this.isLoginError = true;
          return of(null);
        }
        return error;
      })
    ).subscribe();
  }

  onLoginClick(): void {
    this.login();
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  protected loadTranslations() {
    this.translocoService.selectTranslate('login.welcomeAfterLogin').pipe(takeWhile(() => this.isAlive))
      .subscribe(value => this.loginWelcomeMessage = value);
  }
}
