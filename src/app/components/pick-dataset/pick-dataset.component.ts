import {Component, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {DatasetService} from "../../services/dataset/dataset.service";
import {MatFormField, MatInputModule} from "@angular/material/input";
import {MatCommonModule} from "@angular/material/core";
import {Router} from "@angular/router";
import {TranslocoDirective} from "@jsverse/transloco";
import {getIdFromURI} from "../utils/funcions";
import {GenericTableComponent, IGenericTableColumn} from "../generic-table/generic-table.component";
import {Dataset} from "../../domain/dataset";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-pick-dataset',
  templateUrl: './pick-dataset.component.html',
  styleUrl: './pick-dataset.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormField,
    MatCommonModule,
    MatInputModule,
    TranslocoDirective,
    GenericTableComponent,
    NgIf
  ]
})
export class PickDatasetComponent implements OnInit {
  rows: Dataset[] | undefined;
  columns: IGenericTableColumn[] = [
    {
      nameDef: 'name',
      i18nKey: 'pickDataset.name_column_header'
    },
    {
      nameDef: 'description',
      i18nKey: 'pickDataset.description_column_header'
    },
    {
      nameDef: 'registeredBy',
      i18nKey: 'pickDataset.author_column_header'
    },
    {
      nameDef: 'registrationDate',
      i18nKey: 'pickDataset.registration_date_column_header'
    }
  ];

  constructor(private datasetService: DatasetService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.datasetService.getPage().subscribe((data) => {
      this.rows = data.resources;
    })
  }


  rowHandlerEvent(row: Dataset) {
    const id = getIdFromURI(row.uri!);
    this.router.navigate(['/dataset' , id]).then();
  }
}
