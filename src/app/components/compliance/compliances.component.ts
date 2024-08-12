import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {IComplianceDTO} from "../../domain/compliance-dto";
import {ComplianceDtoService} from "../../services/compliance/compliance-dto.service";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {TranslocoDirective} from "@jsverse/transloco";


@Component({
  selector: 'app-compliances',
  standalone: true,
  imports: [CommonModule, MatTableModule, TranslocoDirective],
  templateUrl: './compliances.component.html',
  styleUrl: './compliances.component.scss'
})
export class CompliancesComponent implements OnInit {
  displayedColumns: Iterable<string> = ['datasetName', 'repositoryName', 'fairPrincipleName', 'fairCategory', 'authorName', 'verificationDate'];
  dataSource: MatTableDataSource<IComplianceDTO>;


  constructor(private complianceDTOService: ComplianceDtoService,
              private router: Router) {
    this.dataSource = new MatTableDataSource<IComplianceDTO>([]);
  }

  ngOnInit(): void {
      this.complianceDTOService.retrieveAllCompliancesDTO().subscribe(
          (verificationResponse) => {
            this.dataSource = new MatTableDataSource<IComplianceDTO>(verificationResponse);
          }
      )
  }

  handleClickOnVerification(row: IComplianceDTO) {
    this.router.navigate(['validate'], {state: {verificationDto: row}}).then();
  }
}
