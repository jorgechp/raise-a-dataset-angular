import { Injectable } from '@angular/core';
import { NgxHateoasClientConfigurationService } from '@lagoshny/ngx-hateoas-client';
import {User} from "../../domain/user";

@Injectable({providedIn: 'root'})
export class HateoasConfigurationService {

  constructor(config: NgxHateoasClientConfigurationService) {
    // put your configuration here
    config.configure({
      http: {
        rootUrl: "http://localhost:8080/"
      },
      useTypes: {
        resources: [User]
      }
    })
  }

}
