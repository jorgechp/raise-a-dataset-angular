import {Component, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {IComplianceDTO} from "../../domain/compliance-dto";
import {ComplianceDtoService} from "../../services/compliance/compliance-dto.service";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {TranslocoDirective} from "@jsverse/transloco";
import {GenericTableComponent, IGenericTableColumn} from "../generic-table/generic-table.component";


@Component({
  selector: 'app-compliances',
  standalone: true,
  imports: [CommonModule, MatTableModule, TranslocoDirective, GenericTableComponent],
  templateUrl: './compliances.component.html',
  styleUrl: './compliances.component.scss'
})
export class CompliancesComponent implements OnInit {
  rows: IComplianceDTO[] | undefined;
  columns: IGenericTableColumn[] = [
    {
      nameDef: 'datasetName',
      i18nKey: 'compliance.dataset_column_header'
    },
    {
      nameDef: 'repositoryName',
      i18nKey: 'compliance.repository_column_header'
    },
    {
      nameDef: 'fairPrincipleName',
      i18nKey: 'compliance.indicator_column_header'
    },
    {
      nameDef: 'fairCategory',
      i18nKey: 'compliance.fair_principle_column_header'
    },
    {
      nameDef: 'authorName',
      i18nKey: 'compliance.author_column_header'
    },
    {
      nameDef: 'complianceDate',
      i18nKey: 'compliance.date_column_header'
    }
  ];

  constructor(private complianceDTOService: ComplianceDtoService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.complianceDTOService.retrieveAllCompliancesDTO().subscribe(
      (verificationResponse) => {
        this.rows = verificationResponse;
      }
    )
  }

  rowHandlerEvent(row: IComplianceDTO) {
    this.router.navigate(['validate'], {state: {verificationDto: row}}).then();
  }
}
