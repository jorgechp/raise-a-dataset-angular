import {Component, OnInit} from '@angular/core';
import {GenericTableComponent, IGenericTableColumn} from "../generic-table/generic-table.component";
import {NgIf} from "@angular/common";
import {RiskDatasetService} from "../../services/risk-dataset/risk-dataset.service";
import {RiskDataset} from "../../domain/risk-dataset";
import {Router} from "@angular/router";

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
    },
    {
      nameDef: 'category',
      i18nKey: 'rescue.category'
    }
  ];
  rows: RiskDataset[] | undefined;

  constructor(private riskDataset: RiskDatasetService,
              private router: Router) {
  }

  rowHandlerEvent(row: RiskDataset) {
    this.router.navigate(['raise'], {state: {dataset: row, isRescue: true}}).then();
  }

  private getDatasetPage(isRescued= false){
    this.riskDataset.getPage({
      params: {
        isRescued: isRescued
      }
    }).subscribe((data) => {
      this.rows = data.resources.map(resource => {
        return {
          ...resource,
          category: resource.category?.toString()!.replace(/_/g, ' ') || ''
        };
      }) as unknown as RiskDataset[];
    })
  }


  ngOnInit(): void {
    this.getDatasetPage(false);
  }

}
