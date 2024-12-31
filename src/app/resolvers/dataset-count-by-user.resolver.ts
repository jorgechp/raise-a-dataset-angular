import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {RaiseInstanceService} from '../services/raise-instance/raise-instance.service';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {getIdFromURI} from '../components/utils/funcions';

export const datasetCountByUserResolver: ResolveFn<number> = (route, state) => {
  const raiseInstanceService = inject(RaiseInstanceService);
  const authenticationService = inject(AuthenticationService);
  const userId = Number(getIdFromURI(authenticationService.getCurrentUser().uri!));
  return raiseInstanceService.countRaiseInstancesByUser(userId);
};
