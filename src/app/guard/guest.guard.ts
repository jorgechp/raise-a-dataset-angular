import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router'
import {AuthenticationService} from "../services/authentication/authentication.service";
import {UserRole} from "../domain/user-role";
import {inject} from "@angular/core";


export const canActivateGuest: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (!authService.isCurrentUser() || authService.getCurrentUser().getRoles().indexOf(UserRole.ROLE_GUEST) !== -1) {
    return true;
  }
  return router.createUrlTree(['/']);

};



