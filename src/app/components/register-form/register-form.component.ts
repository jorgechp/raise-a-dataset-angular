import {Component, inject} from '@angular/core';

import {FormBuilder, ReactiveFormsModule, Validators,} from '@angular/forms';
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
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    TranslocoDirective
  ]
})
export class RegisterFormComponent {
  public PASSWORD_ERROR_TYPE: any = PASSWORD_ERROR_TYPE;
  public isUsedCreated = false;

  constructor(private userService: UserService) { }

  private fb = inject(FormBuilder);
  signupForm = this.fb.group({
    username: [null, Validators.required],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    ageConditions: [null, Validators.requiredTrue],
    acceptedConditions: [null, Validators.requiredTrue],
    password1: [null, Validators.compose([
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


  onSubmit(): void {
    if(this.signupForm.valid){
      const user = new User();
      user.username = this.signupForm.get("username")!.value!;
      user.email = this.signupForm.get("email")!.value!;
      user.password = this.signupForm.get("password1")!.value!;
      this.userService.add(user).subscribe(value => {
        this.isUsedCreated = true;
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
