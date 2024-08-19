import {Component, inject, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {StrongPasswordRegx} from "../utils/regexp/regexps";
import {CommonModule} from "@angular/common";
import PasswordMatchValidator from "../utils/validators/password-match-validator";
import {MatCheckboxModule} from "@angular/material/checkbox";

import {User} from "../../domain/user";
import {UserService} from "../../services/user/user.service";
import {TranslocoDirective} from "@jsverse/transloco";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {NavigationEnd, Router} from "@angular/router";
import {getIdFromURI} from "../utils/funcions";
import {MatSlideToggle, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";


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
export class RegisterFormComponent implements OnInit{
  protected PASSWORD_ERROR_TYPE: any = PASSWORD_ERROR_TYPE;
  protected isUserCreated = false;
  protected isUserSettings = false;
  protected isChangePassword = false;
  private currentUser?: User;


  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isUserSettings = event.urlAfterRedirects === '/settings';
      }
    });
  }

  private fb = inject(FormBuilder);
  signupForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    ageConditions: [, Validators.requiredTrue],
    acceptedConditions: [, Validators.requiredTrue],
    password1: ['', Validators.compose([
      Validators.required,
      Validators.pattern(StrongPasswordRegx),
      Validators.minLength(8),
      Validators.maxLength(50)
      ]
    )
    ],
    password2: [null, Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50)
    ])
    ]
  }, {
    validators: [PasswordMatchValidator.match('password1', 'password2')]
  });

  updateSettingsForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])]

  }, {});

  protected getFormControl() {
    if(this.isUserSettings){
      return this.updateSettingsForm;
    }
    return this.signupForm;
  }


  ngOnInit(): void {
    if(this.isUserSettings){
      this.userService.getResource(Number(getIdFromURI(this.authenticationService.getCurrentUser().uri!))).subscribe(
          (response: User) => {
            this.currentUser = response;
            this.currentUser.username && this.updateSettingsForm.get('username')!.setValue(this.currentUser.username);
            this.currentUser.email && this.updateSettingsForm.get('email')!.setValue(this.currentUser.email);
          }
      );
    }
  }

  onSubmit(): void {
    if(this.signupForm.valid){
      const user = new User();
      user.username = this.signupForm.get("username")!.value!;
      user.email = this.signupForm.get("email")!.value!;
      user.password = this.signupForm.get("password1")!.value!;
      this.userService.add(user).subscribe(value => {
        this.isUserCreated = true;
      });
    }
  }

  getErrorInPassword(field: string): PASSWORD_ERROR_TYPE[] {
    const passwordFormField = this.signupForm.get(field);
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
}
