import {finalize, map, mergeMap} from "rxjs/operators";
import {ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {RaiseInstance} from "../../domain/raise-instance";
import {forkJoin, from} from "rxjs";
import {User} from "../../domain/user";
import {Repository} from "../../domain/repository";
import {IRepositoryDataFormat} from "./repository-data-format";
import {MatTableDataSource} from "@angular/material/table";

export class InstancesExtractor {

  static mergeMapRaiseInstances(repositoryData: IRepositoryDataFormat[],
                                datasource: MatTableDataSource<IRepositoryDataFormat>) {
    return mergeMap((collection: ResourceCollection<RaiseInstance>) => {
      const raiseInstances: Array<RaiseInstance> = collection.resources;
      return from(raiseInstances).pipe(
        mergeMap(instance =>
          forkJoin([
            instance.getRelation<User>('user'),
            instance.getRelation<Repository>('repository'),
          ]).pipe(
            map(([user, repository]) => {
                repositoryData.push({
                  uri: instance.uri,
                  name: repository.name!,
                  maintainer: user.username!,
                } as IRepositoryDataFormat);
              }
            )
          )
        ), finalize(() => {
          datasource.data = [...repositoryData]
        })
      );
    })
  }
}
