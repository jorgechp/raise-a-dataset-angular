import {Component, OnInit} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {TranslocoDirective} from "@jsverse/transloco";
import {getIdFromURI} from "../utils/funcions";
import {finalize, map, mergeMap} from "rxjs/operators";
import {ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {forkJoin, from} from "rxjs";
import {Dataset} from "../../domain/dataset";

interface IInstanceInformation {
    dataset?: string
}

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
    TranslocoDirective
  ]
})
export class RepositoryInfoComponent implements OnInit{
  private idRepository?: number;
  protected repository?: Repository;
  protected raiseInstanceList = new MatTableDataSource<IInstanceInformation>([]);
  protected displayedColumns: Iterable<string> = ['dataset'];

  private raiseInstanceInformationList: IInstanceInformation[] = [];


  constructor(private activatedRoute: ActivatedRoute,
              private repositoryService: RepositoryService,
              private raiseInstanceService: RaiseInstanceService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe(params => {
          if (params.has('id')) {
            this.idRepository = Number(params.get('id'));
          }
        }
    );
  }

  ngOnInit(): void {
    if(this.idRepository){
      this.repositoryService.getResource(this.idRepository).subscribe(
          (response) => {
            this.repository = response;
          }
      )

      this.raiseInstanceService.searchCollection(
          'findAllByRepositoryId', {
            params: {
              id: this.idRepository
            },
            useCache: false
          }
      ).pipe(
          mergeMap((collection: ResourceCollection<RaiseInstance>) => {
            const raiseInstances: Array<RaiseInstance> = collection.resources;
            return from(raiseInstances).pipe(
                mergeMap(instance =>
                    forkJoin([
                      instance.getRelation<Dataset>('dataset')
                    ]).pipe(
                        map(([dataset]) => {
                              this.raiseInstanceInformationList.push({
                                  dataset: '44534535'
                              } as IInstanceInformation);

                            }
                        )
                    )
                ), finalize(() => {
                    this.addToDataSource(this.raiseInstanceInformationList);
                })
            );
          })
      ).subscribe(() => {
      });

    }
  }

  handleClickOnRow(row: RaiseInstance) {
    const id = getIdFromURI(row.uri!);
    this.router.navigate(['/instance' , id]).then();
  }

    private addToDataSource(raiseInstanceInformationList: IInstanceInformation[]) {
        this.raiseInstanceList.data = [...raiseInstanceInformationList];
    }
}
