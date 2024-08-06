import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {
  FairPrincipleVerificationService
} from "../../services/fair-principle-verification/fair-principle-verification.service";

interface ITableStructure {
  instanceUri: string,
  datasetName: string,
  repositoryName: string
}

@Component({
  selector: 'app-verifications',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './verifications.component.html',
  styleUrl: './verifications.component.scss'
})
export class VerificationsComponent implements OnInit {
  displayedColumns: Iterable<string> = [];
  dataSource: MatTableDataSource<ITableStructure> | undefined;


  constructor(private fairPrincipleVerificationService: FairPrincipleVerificationService) {
    this.dataSource = new MatTableDataSource<ITableStructure>([]);
  }

  ngOnInit(): void {
    this.fairPrincipleVerificationService.getCollection({
      sort: {
        verificationDate: 'DESC'
      },
    }).subscribe((response) => {
      const dataList: ITableStructure[] = [];
      response.resources.forEach((resource) => {
        dataList.push({
          datasetName: resource.getRelation()
        })
      });
      this.dataSource.data = [...response.resources];
    });
  }

}
