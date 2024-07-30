import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {finalize, map, mergeMap} from 'rxjs/operators';
import {forkJoin, from, Subscription} from "rxjs";
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
import {RaiseInstance} from "../../domain/raise-instance";
import {Repository} from "../../domain/repository";
import {TranslocoDirective} from "@jsverse/transloco";
import {MatSort} from "@angular/material/sort";

interface IRepositoryDataFormat {
  name: string;
  maintainer: string;
}

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

  private addToDataSource(data: IRepositoryDataFormat[]) {
    this.repositoryDataArray.data = [...data];
  }

  private loadDatasetInfo(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.datasetService.getResource(params['id']).subscribe(
          (data: Dataset) => {
            this.dataset = data;
            this.datasetId = Number(this.dataset?.uri?.slice(-1));
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
        mergeMap((collection: ResourceCollection<RaiseInstance>) => {
          const raiseInstances: Array<RaiseInstance> = collection.resources;
          return from(raiseInstances).pipe(
            mergeMap(instance =>
              forkJoin([
                instance.getRelation<User>('user'),
                instance.getRelation<Repository>('repository'),
              ]).pipe(
                map(([user, repository]) => {
                    this.repositoryData.push({
                      name: repository.name!,
                      maintainer: user.username!,
                    } as IRepositoryDataFormat);
                  }
                )
              )
            ), finalize(() => {
              this.addToDataSource(this.repositoryData);
            })
          );
        })
      ).subscribe(() => {
      });
  }

}
