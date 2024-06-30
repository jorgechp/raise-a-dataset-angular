import {HateoasConfigurationService} from "../../services/hateoas/hateoas-configuration.service";
import { ENVIRONMENT_INITIALIZER, inject, Provider } from '@angular/core';


export const provideHateoas = (): Provider =>
{
  return [
    {
      provide : ENVIRONMENT_INITIALIZER,
      useValue: () => inject(HateoasConfigurationService),
      multi   : true,
    },
  ];
};
