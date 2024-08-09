import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {
  VerificationService
} from "../../services/fair-principle-verification/verification.service";
import {forkJoin} from "rxjs";
import {Dataset} from "../../domain/dataset";
import {Repository} from "../../domain/repository";
import {map} from "rxjs/operators";

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


  constructor(private fairPrincipleVerificationService: VerificationService) {
    this.dataSource = new MatTableDataSource<ITableStructure>([]);
  }

  ngOnInit(): void {
      this.fairPrincipleVerificationService.getCollection().subscribe(
          (raiseInstance) => {
            this.raiseInstanceModel = raiseInstance;

            forkJoin([
              raiseInstance.getRelation<Dataset>('dataset'),
              raiseInstance.getRelation<Repository>('repository'),
            ]).pipe(
                map(([dataset, repository]) => {
                  this.dataset = dataset
                  this.repository = repository
                })
            ).subscribe()
          }
      )

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
