import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import { of } from 'rxjs';
import { switchMap, catchError, concatMap, map } from 'rxjs/operators';
import { LocalstorageService } from '../services/localstorage.service';
import { UsersService } from '../services/users.services';

@Injectable()
export class UsersEffects {
  // private actions$ = inject(Actions);

  // init$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UsersActions.initUsers),
  //     switchMap(() => of(UsersActions.loadUsersSuccess({ users: [] }))),
  //     catchError((error) => {
  //       console.error('Error', error);
  //       return of(UsersActions.loadUsersFailure({ error }));
  //     })
  //   )
  // );
  buildUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if (this.localstorageService.isValidToken()) {
          const userId = this.localstorageService.getUserIdFromToken();
          if (userId) {
            return this.usersService.getUser(userId).pipe(
              map((user) => {
                return UsersActions.buildUserSessionSuccess({ user: user });
              }),
              catchError(() => of(UsersActions.buildUserSessionFailure()))
            );
          } else {
            return of(UsersActions.buildUserSessionFailure());
          }
        } else {
          return of(UsersActions.buildUserSessionFailure());
        }
      })
    )
  );
  constructor(
    private actions$: Actions,
    private localstorageService: LocalstorageService,
    private usersService: UsersService
  ) {}
}
