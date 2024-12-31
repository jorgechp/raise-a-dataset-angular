import {Component, inject, OnInit} from '@angular/core';

import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {StrongPasswordRegx} from "../utils/regexp/regexps";
import {CommonModule} from "@angular/common";
import PasswordMatchValidator from "../utils/validators/password-match-validator";
import {MatCheckboxModule} from "@angular/material/checkbox";

import {User} from "../../domain/user";
import {UserService} from "../../services/user/user.service";
import {TranslocoDirective, TranslocoService} from "@jsverse/transloco";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {NavigationEnd, Router} from "@angular/router";
import {getIdFromURI} from "../utils/funcions";
import {MatSlideToggleChange, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSnackBar} from "@angular/material/snack-bar";
import {takeWhile} from "rxjs";
import {AbstractTranslationsComponent} from "../abstract/abstract-translations-component";
import {MatDialog} from "@angular/material/dialog";
import {OrcidModalComponent} from "./orcid-modal/orcid-modal.component";

export enum PASSWORD_ERROR_TYPE {
  UPPERCASE, LOWERCASE, DIGIT, SPECIAL_CHARACTER
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  standalone: true,

  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    TranslocoDirective,
    MatSlideToggleModule
  ]
})
export class RegisterFormComponent extends AbstractTranslationsComponent implements OnInit{
  protected PASSWORD_ERROR_TYPE: any = PASSWORD_ERROR_TYPE;
  protected isUserCreated = false;
  protected isUserSettings = false;
  protected isChangePassword = false;
  protected form?: FormGroup;
  private currentUser?: User;
  private fb = inject(FormBuilder);

  private usernameFormControl = new FormControl('', Validators.required);
  private emailFormControl = new FormControl('', Validators.compose([Validators.required, Validators.email]));
  private currentPasswordFormControl = new FormControl('', Validators.required);
  private password1FormControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(StrongPasswordRegx),
      Validators.minLength(8),
      Validators.maxLength(50)
    ]
  ));
  private password2FormControl = new FormControl(null, Validators.compose([
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(50)
  ]));

  private userSettingChangesMessage: string | undefined;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog,
              protected override translocoService: TranslocoService) {
    super(translocoService);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isUserSettings = event.urlAfterRedirects === '/settings';
      }
    });
  }

  openOrcidModal() {
    const dialogRef = this.dialog.open(OrcidModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Manejar la información del usuario obtenida de ORCID
        // Por ejemplo, llenar los campos de correo electrónico e ID de ORCID
      }
    });
  }

  override ngOnInit(): void {
    if(this.isUserSettings){
      this.form = this.getUpdateSettingsForm();
      this.userService.getResource(Number(getIdFromURI(this.authenticationService.getCurrentUser().uri!))).subscribe(
          (response: User) => {
            this.currentUser = response;
            this.currentUser.username && this.form!.get('username')!.setValue(this.currentUser.username);
            this.currentUser.email && this.form!.get('email')!.setValue(this.currentUser.email);
          }
      );
    } else {
      this.form = this.getSignUpForm();
    }
  }

  onSubmit(): void {
    if (this.form && this.form.valid) {
      const user = this.isUserSettings && this.currentUser ? this.currentUser : new User();
      user.username = this.form.get("username")!.value!;
      user.email = this.form.get("email")!.value!;


      if (this.isUserSettings) {
        const currentPassword = this.form.get("currentPassword")!.value!;
        if (this.isChangePassword) {
          user.password = this.form.get("password1")!.value!;
          user.passwordReset = this.isChangePassword;
        }
        this.authenticationService.login(user.username!, currentPassword).subscribe(() => {
              this.userService.patchResource(user).subscribe(value => {
                this.snackBar.open(`${this.userSettingChangesMessage}`, undefined,
                    {
                      duration: 4000
                    });
              });
            }
        )


      } else {
        this.userService.add(user).subscribe(value => {
          this.isUserCreated = true;
        });
      }
    }
  }

  private updateUser(user: User, password: string): void {
    this.userService.updateResource(user).subscribe(value => {
      this.isUserCreated = true;
    });
  }

  getErrorInPassword(field: string): PASSWORD_ERROR_TYPE[] {
    const passwordFormField = this.form!.get(field);
    const value = (passwordFormField && passwordFormField.value)?passwordFormField.value:'';

    let errorType: PASSWORD_ERROR_TYPE[] = [];

    if(!value.match('^(?=.*[A-Z])')){
      errorType.push(PASSWORD_ERROR_TYPE.UPPERCASE);
    }
    if(!value.match('(?=.*[a-z])')){
      errorType.push(PASSWORD_ERROR_TYPE.LOWERCASE);
    }
    if(!value.match('(.*[0-9].*)')){
      errorType.push(PASSWORD_ERROR_TYPE.DIGIT);
    }
    if(!value.match('(?=.*[!@#$%^&*])')){
      errorType.push(PASSWORD_ERROR_TYPE.SPECIAL_CHARACTER);
    }
    return errorType;
  }

  doChangePassword($event: MatSlideToggleChange) {
    if ($event.checked) {
      this.form?.addControl('currentPassword', this.currentPasswordFormControl);
      this.form?.addControl('password1', this.password1FormControl);
      this.form?.addControl('password2', this.password2FormControl);
      this.form?.addValidators([PasswordMatchValidator.match('password1', 'password2')]);
    } else {
      this.form?.removeControl('currentPassword');
      this.form?.removeControl('password1');
      this.form?.removeControl('password2');
      this.form?.clearValidators();
    }
  }

  private getSignUpForm(): FormGroup {
    return this.fb.group({
      username: this.usernameFormControl,
      email: this.emailFormControl,
      ageConditions: [, Validators.requiredTrue],
      acceptedConditions: [, Validators.requiredTrue],
      password1: this.password1FormControl,
      password2: this.password2FormControl
    }, {
      validators: [PasswordMatchValidator.match('password1', 'password2')]
    });
  }

  private getUpdateSettingsForm(): FormGroup {
    return this.fb.group({
      username: this.usernameFormControl,
      email: this.emailFormControl,
      currentPassword: this.currentPasswordFormControl

    }, {});
  }

  protected loadTranslations(): void {
    this.translocoService.selectTranslate('repository.repositoryCreated').pipe(takeWhile(() => this.isAlive))
        .subscribe(value => this.userSettingChangesMessage = value);
  }
}
