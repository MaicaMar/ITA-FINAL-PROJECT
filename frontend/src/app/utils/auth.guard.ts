import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const token = localStorage.getItem('token');

  if( !token ) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }

  return true;
};

