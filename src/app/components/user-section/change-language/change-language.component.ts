import {Component} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {LangDefinition, TranslocoDirective, TranslocoService} from "@jsverse/transloco";
import {MatOption, MatSelect} from "@angular/material/select";
import {UserSectionComponent} from "../user-section.component";


interface DialogData {
  language: string;
}

@Component({
  selector: 'app-change-language',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatSelect,
    MatOption,
    MatDialogClose,
    TranslocoDirective,
  ],
  templateUrl: './change-language.component.html',
  styleUrl: './change-language.component.scss'
})
export class ChangeLanguageComponent {
  public formData: DialogData = {language: ''}
  public languageList: LangDefinition[];

  constructor(private translocoService: TranslocoService,
              private dialogRef: MatDialogRef<UserSectionComponent>) {
    this.formData.language = this.translocoService.getActiveLang();
    this.languageList = <LangDefinition[]>translocoService.getAvailableLangs();
  }


  onChangeClick() {
    this.dialogRef.close(this.formData);
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
