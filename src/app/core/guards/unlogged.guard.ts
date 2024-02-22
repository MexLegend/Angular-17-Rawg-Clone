import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '@coreServices/common/user.service';

export const unloggedGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const userData = userService.getUserData();

  if (!userData()) {
    return router.parseUrl('/auth');
  } else {
    return true;
  }
};
