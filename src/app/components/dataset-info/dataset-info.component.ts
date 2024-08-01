import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {AsyncPipe, CommonModule, DatePipe} from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute, Router} from "@angular/router";
import {DatasetService} from "../../services/dataset/dataset.service";
import {Dataset} from "../../domain/dataset";
import {ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {User} from "../../domain/user";
import {MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {RaiseInstanceService} from "../../services/raise-instance/raise-instance.service";
import {TranslocoDirective} from "@jsverse/transloco";
import {MatSort} from "@angular/material/sort";
import {getIdFromURI} from "../utils/funcions";
import {IRepositoryDataFormat} from "../common/repository-data-format";
import {InstancesExtractor} from "../common/instances-extractor";


@Component({
  selector: 'app-dataset-info',
  templateUrl: './dataset-info.component.html',
  styleUrl: './dataset-info.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    DatePipe,
    TranslocoDirective,
    MatSort
  ]
})
export class DatasetInfoComponent implements OnInit, AfterViewInit, OnDestroy {
  protected displayedColumns: Iterable<string> = ['name', 'maintainer'];
  protected dataset: Dataset | undefined;
  @ViewChild('table', {static: true}) repositoriesTable: MatTable<any> | undefined;
  protected maintainers: User[];
  protected datasetId: number | undefined;
  protected repositoryDataArray: MatTableDataSource<IRepositoryDataFormat>;
  private repositoryData: IRepositoryDataFormat[] = []
  private raiseInstanceCollectionSuscription: Subscription | undefined;


  constructor(private activatedRoute: ActivatedRoute,
              private datasetService: DatasetService,
              private raiseInstanceService: RaiseInstanceService,
              private router: Router) {
    this.maintainers = [];
    this.repositoryDataArray = new MatTableDataSource<IRepositoryDataFormat>(this.repositoryData);
  }

  ngOnInit(): void {
    this.loadDatasetInfo();
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy() {
    this.raiseInstanceCollectionSuscription?.unsubscribe();
  }

  registerNewRepositoryHandle() {
    this.router.navigate(['raise'], {state: {dataset: this.dataset}}).then();
  }

  private loadDatasetInfo(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.datasetService.getResource(Number(params.get('id'))).subscribe(
          (data: Dataset) => {
            this.dataset = data;
            this.datasetId = Number(getIdFromURI(this.dataset?.uri!));
            this.dataset.maintainedBy = [];
            this.dataset.getRelatedCollection<ResourceCollection<User>>('maintainedBy').subscribe(
              (maintainedBy: ResourceCollection<User>) => {
                maintainedBy.resources.forEach((user) => {
                  this.maintainers?.push(user);
                });
                this.loadRepositoryDataInfo();
              }
            )
          }
        )
      }
    })
  }

  private loadRepositoryDataInfo(): void {
    this.raiseInstanceCollectionSuscription = this.raiseInstanceService.searchCollection(
      'findAllByDatasetId', {
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

    handleClickOnRow(row: IRepositoryDataFormat) {
      const uri = row.uri;
      this.router.navigate(['/instance',  uri?.at(-1)]).then();
    }
}
