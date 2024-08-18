import {Component, OnInit} from '@angular/core';
import {GenericTableComponent, IGenericTableColumn} from "../generic-table/generic-table.component";
import {NgIf} from "@angular/common";
import {RiskDatasetService} from "../../services/risk-dataset/risk-dataset.service";
import {RiskDataset} from "../../domain/risk-dataset";

@Component({
  selector: 'app-rescue-table',
  standalone: true,
  imports: [
    GenericTableComponent,
    NgIf
  ],
  templateUrl: './rescue-table.component.html',
  styleUrl: './rescue-table.component.scss'
})
export class RescueTableComponent implements OnInit {
  columns: IGenericTableColumn[] = [
    {
      nameDef: 'name',
      i18nKey: 'rescue.name'
    },
    {
      nameDef: 'description',
      i18nKey: 'rescue.description'
    },
    {
      nameDef: 'registrationDate',
      i18nKey: 'rescue.registrationDate'
    }
  ];
  columnDescription: string[] = [];
  rows: RiskDataset[] | undefined;

  constructor(private riskDataset: RiskDatasetService) {
  }

  rowHandlerEvent(row: RiskDataset) {
    console.log(row);
  }

  ngOnInit(): void {
    this.riskDataset.getPage().subscribe((data) => {
      this.rows = data.resources;
    })
  }
}
