import {Component, inject} from '@angular/core';
import {GenericTableComponent, IGenericTableColumn} from "../../generic-table/generic-table.component";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslocoDirective} from "@jsverse/transloco";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Repository} from "../../../domain/repository";
import {RepositoryService} from "../../../services/repository/repository.service";
import {AbstractAdminComponent} from "../abstract-admin/abstract-admin.component";

@Component({
  selector: 'app-admin-repositories',
  standalone: true,
  imports: [
    GenericTableComponent,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatError,
    MatFormField,
    MatInput,
    MatSlideToggle,
    NgIf,
    ReactiveFormsModule,
    TranslocoDirective,
    MatLabel,
    AbstractAdminComponent
  ],
  templateUrl: './admin-repositories.component.html',
  styleUrl: './admin-repositories.component.scss'
})
export class AdminRepositoriesComponent {

  columns: IGenericTableColumn[] = [
    {
      nameDef: 'name',
      i18nKey: 'repositoryAdmin.name'
    },
    {
      nameDef: 'address',
      i18nKey: 'repositoryAdmin.address'
    },
    {
      nameDef: 'description',
      i18nKey: 'repositoryAdmin.description'
    }
  ];
  protected selectedRepository?: Repository
  protected form: FormGroup | undefined;
  private fb = inject(FormBuilder);

  constructor(protected repositoryService: RepositoryService,
              private snackBar: MatSnackBar) {

  }

  prepareObjectToBeSent(item: Repository, isValidForm: any, onResult: any) {
    if (!this.form) return;
    item.name = this.form.value.name;
    item.address = this.form.value.address;
    item.description = this.form.value.description;

    isValidForm(this.form.valid);
    onResult(item);
  }

  prepareControls($event: Repository) {

    this.form = this.fb.group({
      name: [$event.name, Validators.required],
      address: [$event.address, Validators.required],
      description: [$event.description, Validators.required]
    })
  }
}
