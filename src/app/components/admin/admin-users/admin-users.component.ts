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
import {TranslocoDirective, TranslocoService} from "@jsverse/transloco";
import {MatButton} from "@angular/material/button";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {UserRole} from "../../../domain/user-role";
import {Role} from "../../../domain/role";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {RoleService} from "../../../services/roles/roles.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AbstractTranslationsComponent} from "../../abstract/abstract-translations-component";
import {takeWhile} from "rxjs";

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
    MatSlideToggleModule
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent extends AbstractTranslationsComponent {
  protected selectedUser? :User;
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
  resourcesRows: PagedResourceCollection<User> | undefined;
  private fb = inject(FormBuilder);
  private isBanned: boolean = false;
  private isAdmin: boolean = false;
  private saveSettingsMessage: string = '';
  private deletedUserMessage: string = '';

  protected form?: FormGroup;

  constructor(private userService: UserService,
              private rolesService: RoleService,
              private snackBar: MatSnackBar,
              private translateService: TranslocoService) {
    super(translateService);
  }


  rowHandlerEvent(row: User) {
    this.selectedUser = row;

    this.isAdmin = this.selectedUser.isRole(UserRole.ROLE_ADMIN.valueOf());
    this.isBanned = this.selectedUser.isRole(UserRole.ROLE_BANNED.valueOf());

    this.form = this.fb.group({
      username: [row.username, Validators.required],
      email: [row.email, Validators.required],
      isAdmin: [this.isAdmin, Validators.required],
      isBanned: [this.isBanned, Validators.required],
    })
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDatasetPage(false);
  }

  onSubmit(): void {
    if (this.form && this.form.valid && this.selectedUser) {
      const user = this.selectedUser;
      user.username = this.form.value.username;
      user.email = this.form.value.email;

      let roles: Role[] = [];

      if (this.form.value.isAdmin) {
        roles.push(<Role>this.rolesService.roles.get(UserRole.ROLE_ADMIN.valueOf()));
      }

      if (this.form.value.isBanned) {
        roles.push(<Role>this.rolesService.roles.get(UserRole.ROLE_BANNED.valueOf()));
      } else {
        roles.push(<Role>this.rolesService.roles.get(UserRole.ROLE_USER.valueOf()));
      }

      user.bindRelation('roles', roles).subscribe();
      this.userService.patchResource(user).subscribe(
        (response) => {
          this.snackBar.open(`${this.saveSettingsMessage}`, undefined,
            {
              duration: 4000
            });
        }
      );
    }
  }

  handleDeleteAccount() {
    if (this.selectedUser) {
      this.userService.deleteResource(this.selectedUser).subscribe(
        (response) => {
          this.selectedUser = undefined;
          this.getDatasetPage(false);
          this.snackBar.open(`${this.deletedUserMessage}`, undefined,
            {
              duration: 4000
            });
        }
      );
    }
  }

  protected override loadTranslations() {
    this.translocoService.selectTranslate('userAdmin.saved_settings').pipe(takeWhile(() => this.isAlive))
      .subscribe(value => this.saveSettingsMessage = value);
    this.translocoService.selectTranslate('userAdmin.user_removed').pipe(takeWhile(() => this.isAlive))
      .subscribe(value => this.deletedUserMessage = value);
  }

  private getDatasetPage(isRescued= false){
    this.userService.getPage({
    }).subscribe((data) => {
      this.resourcesRows = data;
    })
  }
}
