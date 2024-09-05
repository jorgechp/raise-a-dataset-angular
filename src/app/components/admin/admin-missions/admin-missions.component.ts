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
import {Mission} from "../../../domain/mission";
import {MissionService} from "../../../services/mission/mission.service";

@Component({
  selector: 'app-admin-missions',
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
  templateUrl: './admin-missions.component.html',
  styleUrl: './admin-missions.component.scss'
})
export class AdminMissionsComponent {
  columns: IGenericTableColumn[] = [
    {
      nameDef: 'name',
      i18nKey: 'missionAdmin.username'
    },
    {
      nameDef: 'description',
      i18nKey: 'missionAdmin.descriptionColumn'
    },
    {
      nameDef: 'points',
      i18nKey: 'missionAdmin.points'
    },
    {
      nameDef: 'level',
      i18nKey: 'missionAdmin.level'
    }
  ];
  private fb = inject(FormBuilder);
  protected form?: FormGroup;

  constructor(protected missionService: MissionService) {

  }

  prepareObjectToBeSent(item: Mission, isValidForm: any, onResult: any) {
    if (!this.form) return;
    item.name = this.form.value.name;
    item.description = this.form.value.description;
    item.points = this.form.value.points;
    item.level = this.form.value.level;
    isValidForm(this.form.valid);
    onResult(item);
  }

  prepareControls($event: Mission) {
    this.form = this.fb.group({
      name: [$event.name, Validators.required],
      description: [$event.description, Validators.required],
      points: [$event.points, Validators.required],
      level: [$event.level, Validators.required]
    })
  }

}
