import {Component, OnInit} from '@angular/core';
import {map, mergeMap} from 'rxjs/operators';
import {forkJoin, from} from "rxjs";
import {AsyncPipe, CommonModule, DatePipe} from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute} from "@angular/router";
import {DatasetService} from "../../services/dataset/dataset.service";
import {Dataset} from "../../domain/dataset";
import {ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {User} from "../../domain/user";
import {MatTableModule} from "@angular/material/table";
import {RaiseInstanceService} from "../../services/raise-instance/raise-instance.service";
import {RaiseInstance} from "../../domain/raise-instance";
import {Repository} from "../../domain/repository";
import {TranslocoDirective} from "@jsverse/transloco";

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
    TranslocoDirective
  ]
})
export class DatasetInfoComponent implements OnInit {
  displayedColumns: Iterable<string> = ['name', 'maintainer'];
  protected dataset: Dataset | undefined;
  protected maintainers: User[];
  protected repositoryDataArray: IRepositoryDataFormat[];

  constructor(private activatedRoute: ActivatedRoute,
              private datasetService: DatasetService,
              private raiseInstanceService: RaiseInstanceService) {
    this.maintainers = [];
    this.repositoryDataArray = [];
  }

  ngOnInit(): void {
    this.loadDatasetInfo();
  }

  private loadDatasetInfo(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.datasetService.getResource(params['id']).subscribe(
          (data: Dataset) => {
            this.dataset = data;
            this.dataset.maintainedBy = [];
            this.dataset.getRelatedCollection<ResourceCollection<User>>('maintainedBy').subscribe(
              (maintainedBy: ResourceCollection<User>) => {
                maintainedBy.resources.forEach((user) => {
                  this.maintainers?.push(user);
                });
                this.loadRepositoryDataInfo(Number(this.dataset?.uri?.slice(-1)));
              }
            )
          }
        )
      }
    })
  }

  private loadRepositoryDataInfo(datasetId: number): void {
    this.raiseInstanceService.searchCollection('findAllByDatasetId', {
      params: {
        id: datasetId
      },
      sort: {
        dataset: 'ASC'
      }
    })
      .pipe(
        mergeMap((collection: ResourceCollection<RaiseInstance>) => {
          const raiseInstances: Array<RaiseInstance> = collection.resources;
          return from(raiseInstances).pipe(
            mergeMap(instance =>
              forkJoin([
                instance.getRelation<User>('user'),
                instance.getRelation<Repository>('repository'),
              ]).pipe(
                map(([user, repository]) => (
                  this.repositoryDataArray.push({
                    name: repository.name!,
                    maintainer: user.username!,
                  } as IRepositoryDataFormat)
                ))
              )
            )
          );
        })
      ).subscribe(data => console.log(data));
  }

}
