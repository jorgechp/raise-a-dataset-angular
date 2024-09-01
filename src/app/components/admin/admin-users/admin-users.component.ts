import {Component, inject} from '@angular/core';
import {GenericTableComponent, IGenericTableColumn} from "../../generic-table/generic-table.component";
import {NgIf} from "@angular/common";
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
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TranslocoDirective} from "@jsverse/transloco";
import {MatButton} from "@angular/material/button";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {UserRole} from "../../../domain/user-role";
import {Role} from "../../../domain/role";
import {RoleService} from "../../../services/roles/roles.service";
import {AbstractAdminComponent} from "../abstract-admin/abstract-admin.component";

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
    MatCardActions,
    MatSliderModule,
    MatSlideToggleModule,
    AbstractAdminComponent
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent {
  columns: IGenericTableColumn[] = [
    {
      nameDef: 'username',
      i18nKey: 'register.username'
    },
    {
      nameDef: 'email',
      i18nKey: 'register.email'
    }
  ];
  private fb = inject(FormBuilder);
  private isBanned: boolean = false;
  private isAdmin: boolean = false;

  protected form?: FormGroup;

  constructor(protected userService: UserService,
              private rolesService: RoleService) {

  }

  prepareObjectToBeSent(item: User, isValidForm: any, onResult: any) {
    if (!this.form) return;

    let roles: Role[] = [];

    if (this.form.value.isAdmin) {
      roles.push(<Role>this.rolesService.roles.get(UserRole.ROLE_ADMIN.valueOf()));
    }

    if (this.form.value.isBanned) {
      roles.push(<Role>this.rolesService.roles.get(UserRole.ROLE_BAN.valueOf()));
    } else {
      roles.push(<Role>this.rolesService.roles.get(UserRole.ROLE_USER.valueOf()));
    }

    item.bindRelation('roles', roles).subscribe();

    item.username = this.form.value.username;
    item.email = this.form.value.email;
    isValidForm(this.form.valid);
    onResult(item);
  }

  prepareControls($event: User) {
    this.isAdmin = $event.isRole(UserRole.ROLE_ADMIN.valueOf());
    this.isBanned = $event.isRole(UserRole.ROLE_BAN.valueOf());

    this.form = this.fb.group({
      username: [$event.username, Validators.required],
      email: [$event.email, Validators.required],
      isAdmin: [this.isAdmin, Validators.required],
      isBanned: [this.isBanned, Validators.required],
    })
  }

}
