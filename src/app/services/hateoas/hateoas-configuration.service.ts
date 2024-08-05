import {Injectable} from '@angular/core';
import {NgxHateoasClientConfigurationService} from '@lagoshny/ngx-hateoas-client';
import {User} from "../../domain/user";
import {Repository} from "../../domain/repository";
import {RaiseInstance} from "../../domain/raise-instance";
import {Dataset} from "../../domain/dataset";

@Injectable({providedIn: 'root'})
export class HateoasConfigurationService {

  constructor(config: NgxHateoasClientConfigurationService) {
    // put your configuration here
    config.configure({
      http: {
        rootUrl: "http://localhost:8080/"
      },
      useTypes: {
        resources: [User, Repository, Dataset, RaiseInstance]
      }
    })
  }

}
