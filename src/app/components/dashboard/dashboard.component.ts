import {Component, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {RaiseInstanceService} from "../../services/raise-instance/raise-instance.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {RaiseInstance} from "../../domain/raise-instance";
import {finalize, map, mergeMap} from "rxjs/operators";
import {forkJoin, from} from "rxjs";
import {Repository} from "../../domain/repository";
import {Dataset} from "../../domain/dataset";
import {getIdFromURI} from "../utils/funcions";
import {Router} from "@angular/router";


interface IMyRaiseInstance {
  dataset?: string,
  repository?: string,
  status?: any
    uri?: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule
  ]
})
export class DashboardComponent implements OnInit {
  protected myRaiseInstanceDataSource: MatTableDataSource<IMyRaiseInstance>
    = new MatTableDataSource<IMyRaiseInstance>([]);
  protected displayedColumns: Iterable<string> = ['dataset', 'repository', 'status'];
  private repositoryData: IMyRaiseInstance[] = []

  constructor(private raiseInstanceService: RaiseInstanceService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.raiseInstanceService.searchCollection(
      'findAllByUserUsername', {
        params: {
          username: this.authenticationService.getCurrentUser().username!
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
              instance.getRelation<Dataset>('dataset'),
              instance.getRelation<Repository>('repository'),
            ]).pipe(
              map(([dataset, repository]) => {
                  this.repositoryData.push({
                    dataset: dataset.name,
                    repository: repository.name,
                    status: undefined,
                      uri: instance.uri
                  } as IMyRaiseInstance);
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

  private addToDataSource(data: IMyRaiseInstance[]) {
    this.myRaiseInstanceDataSource.data = [...data];
  }


    handleClickOnRow(row : IMyRaiseInstance) {
        const id = getIdFromURI(row.uri!);
        this.router.navigate(['/instance' , id]).then();
    }
}
