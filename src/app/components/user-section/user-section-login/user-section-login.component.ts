import {Component} from '@angular/core';
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
import {TranslocoDirective} from "@jsverse/transloco";


interface DialogData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-user-section-login',
  standalone: true,
  imports: [
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
export class UserSectionLoginComponent {
  public formData: DialogData = {username: '', password: ''}

  constructor(private dialogRef: MatDialogRef<UserSectionComponent>) {
  }

  onLoginClick(): void {
    this.dialogRef.close(this.formData);
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
