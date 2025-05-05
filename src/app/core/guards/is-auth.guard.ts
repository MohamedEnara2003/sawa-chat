import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { authClient } from '../../environments/environment';


async function checkIsAuthenticated(router: Router): Promise<boolean | UrlTree> {
  const { data, error } = await authClient.getSession();
  if (error || !data.session){
  return router.navigate(['/auth/sign-up']); 
  }
  return true;
}

export const isAuthGuard: CanMatchFn = async (route, segments) => {
  const router = inject(Router);
  return checkIsAuthenticated(router);
};
