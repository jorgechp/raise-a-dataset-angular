import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from "../services/user/user.service";

export const userCountResolver: ResolveFn<number> = (route, state) => {
  const userService = inject(UserService);
  return userService.countUsers();
};
