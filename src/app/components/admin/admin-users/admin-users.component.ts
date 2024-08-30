import {Component, inject} from '@angular/core';
import {GenericTableComponent, IGenericTableColumn} from "../../generic-table/generic-table.component";
import {NgIf} from "@angular/common";
import {RiskDataset} from "../../../domain/risk-dataset";
import {Router} from "@angular/router";
import {User} from "../../../domain/user";
import {UserService} from "../../../services/user/user.service";
import {MatDialogTitle} from "@angular/material/dialog";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TranslocoDirective} from "@jsverse/transloco";
import {MatButton} from "@angular/material/button";
import PasswordMatchValidator from "../../utils/validators/password-match-validator";

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    GenericTableComponent,
    NgIf,
    MatDialogTitle,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormFieldModule,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    TranslocoDirective,
    MatButton,
    MatCardActions
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent {
  protected selectedUser? :User;
  private fb = inject(FormBuilder);

  columns: IGenericTableColumn[] = [
    {
      nameDef: 'username',
      i18nKey: 'user.username'
    },
    {
      nameDef: 'email',
      i18nKey: 'user.email'
    }
  ];
  rows: User[] | undefined;

  protected form?: FormGroup;

  constructor(private userService: UserService,
              private router: Router) {
  }

  rowHandlerEvent(row: User) {
    this.selectedUser = row;
    this.form = this.fb.group({
      username: [row.username, Validators.required],
      mail: [row.email, Validators.required]
    })
  }

  private getDatasetPage(isRescued= false){
    this.userService.getPage({
    }).subscribe((data) => {
      this.rows = data.resources.map(resource => {
        return {
          ...resource
        };
      }) as unknown as User[];
    })
  }


  ngOnInit(): void {
    this.getDatasetPage(false);
  }

  onSubmit(): void {
    if (this.form && this.form.valid) {

    }
  }
}
