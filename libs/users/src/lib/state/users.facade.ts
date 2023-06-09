import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
  private readonly store = inject(Store);
  currentUser$ = this.store.pipe(select(UsersSelectors.getUser));
  isAuthenticated$ = this.store.pipe(select(UsersSelectors.getUserIsAuth));

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  // Commentted lines
  // loaded$ = this.store.pipe(select(UsersSelectors.selectUsersLoaded));
  // allUsers$ = this.store.pipe(select(UsersSelectors.selectAllUsers));
  // selectedUsers$ = this.store.pipe(select(UsersSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  buildUserSession() {
    this.store.dispatch(UsersActions.buildUserSession());
  }
}
