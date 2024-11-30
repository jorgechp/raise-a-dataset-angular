import {Component, inject} from '@angular/core';
import {GenericTableComponent, IGenericTableColumn} from "../../generic-table/generic-table.component";
import {NgIf} from "@angular/common";
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
import {GenericAdminComponent} from "../generic-admin/generic-admin.component";
import {FairPrincipleIndicator} from "../../../domain/fair-principle-indicator";
import {FairPrincipleService} from "../../../services/fair-principle/fair-principle.service";

@Component({
  selector: 'app-admin-fair-principles',
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
    GenericAdminComponent
  ],
  templateUrl: './admin-fair-principles.component.html',
  styleUrl: './admin-fair-principles.component.scss'
})
export class AdminFairPrinciplesComponent {
  columns: IGenericTableColumn[] = [
    {
      nameDef: 'name',
      i18nKey: 'fairPrinciplesAdmin.name'
    },
    {
      nameDef: 'description',
      i18nKey: 'fairPrinciplesAdmin.descriptionColumn'
    },
    {
      nameDef: 'url',
      i18nKey: 'fairPrinciplesAdmin.url'
    },
    {
      nameDef: 'namePrefix',
      i18nKey: 'fairPrinciplesAdmin.namePrefix'
    },
    {
      nameDef: 'difficulty',
      i18nKey: 'fairPrinciplesAdmin.difficulty'
    },
    {
      nameDef: 'category',
      i18nKey: 'fairPrinciplesAdmin.category'
    }
  ];
  protected form?: FormGroup;
  private fb = inject(FormBuilder);

  constructor(protected fairPrincipleService: FairPrincipleService) {

  }

  prepareObjectToBeSent(item: FairPrincipleIndicator, isValidForm: any, onResult: any) {
    if (!this.form) return;
    item.name = this.form.value.name;
    item.description = this.form.value.description;
    item.url = this.form.value.url;
    item.namePrefix = this.form.value.namePrefix;
    item.difficulty = this.form.value.difficulty;
    item.category = this.form.value.category;
    isValidForm(this.form.valid);
    onResult(item);
  }

  prepareControls($event: FairPrincipleIndicator) {
    this.form = this.fb.group({
      name: [$event.name, Validators.required],
      description: [$event.description, Validators.required],
      url: [$event.url, Validators.required],
      namePrefix: [$event.namePrefix, Validators.required],
      difficulty: [$event.difficulty, Validators.required],
      category: [$event.category, Validators.required]
    })
  }

}
