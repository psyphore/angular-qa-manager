import { createSelector, MemoizedSelector } from '@ngrx/store';

import { SignInStoreSelectors } from './sign-in-store';
import { OptionsStoreSelectors } from './options-store';
import { MeStoreSelectors } from './me-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  SignInStoreSelectors.selectMyFeatureError,
  MeStoreSelectors.selectMyFeatureError,
  OptionsStoreSelectors.selectMyFeatureError,
  (signInError: string, meError: string, optionsError: string) => {
    return signInError || meError || optionsError;
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  SignInStoreSelectors.selectMyFeatureIsLoading,
  MeStoreSelectors.selectMyFeatureIsLoading,
  OptionsStoreSelectors.selectMyFeatureIsLoading,
  (signInLoading: boolean, meLoading: boolean, optionsLoading: boolean) => {
    return signInLoading || meLoading || optionsLoading;
  }
);
