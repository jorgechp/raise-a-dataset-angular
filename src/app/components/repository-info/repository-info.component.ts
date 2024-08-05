import {Component, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute, Router} from "@angular/router";
import {RepositoryService} from "../../services/repository/repository.service";
import {Repository} from "../../domain/repository";
import {RaiseInstance} from "../../domain/raise-instance";
import {RaiseInstanceService} from "../../services/raise-instance/raise-instance.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {TranslocoDirective} from "@jsverse/transloco";
import {getIdFromURI} from "../utils/funcions";
import {IRepositoryDataFormat} from "../common/repository-data-format";
import {InstancesExtractor} from "../common/instances-extractor";


@Component({
  selector: 'app-repository-info',
  templateUrl: './repository-info.component.html',
  styleUrl: './repository-info.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSort,
    MatTable,
    TranslocoDirective,
    MatHeaderCellDef
  ]
})
export class RepositoryInfoComponent implements OnInit{
  protected repositoryDataArray = new MatTableDataSource<IRepositoryDataFormat>([]);
  protected repository?: Repository;
  protected displayedColumns: Iterable<string> = ['name', 'maintainer'];
  private datasetId?: number;
  private repositoryData: IRepositoryDataFormat[] = []



  constructor(private activatedRoute: ActivatedRoute,
              private repositoryService: RepositoryService,
              private raiseInstanceService: RaiseInstanceService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe(params => {
          if (params.has('id')) {
            this.datasetId = Number(params.get('id'));
          }
        }
    );
  }

  ngOnInit(): void {
    if (this.datasetId) {
      this.repositoryService.getResource(this.datasetId).subscribe(
          (response) => {
            this.repository = response;
          }
      )

      this.raiseInstanceService.searchCollection(
        'findAllByRepositoryId', {
          params: {
            id: this.datasetId!
          },
          sort: {
            dataset: 'ASC'
          },
          useCache: false
        }
      ).pipe(
        InstancesExtractor.mergeMapRaiseInstances(this.repositoryData, this.repositoryDataArray)
      ).subscribe(() => {
      });

    }
  }

  handleClickOnRow(row: RaiseInstance) {
    const id = getIdFromURI(row.uri!);
    this.router.navigate(['/instance' , id]).then();
  }
}
