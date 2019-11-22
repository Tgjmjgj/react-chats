import { ActionTypes } from './actionTypes';
import * as Firebase from 'firebase';
import { Dispatch } from 'redux';

function openAuthPopup() {
  return {
    type: ActionTypes.AUTH_EXTERNAL_POPUP,
  } as const;
}

function authFailed(error: string) {
  return {
    type: ActionTypes.AUTH_UNSUCCESSFUL,
    error,
  } as const;
}

function authCommit(username: string) {
  return {
    type: ActionTypes.AUTH_SUCCESSFUL,
    username,
  } as const;
}

export function authWithGithub() {
  return async (dispatch: Dispatch<any>) => {
    dispatch(openAuthPopup());
    const provider = new Firebase.auth.GithubAuthProvider();
    try {
      const result = await Firebase.auth().signInWithPopup(provider);
      if (result.user) {
        const token = await result.user.getIdToken();
        console.log(token);
      }
      const user = result.user;
      console.log(user);
      dispatch(authCommit((user && user.displayName) || 'Some'));
    } catch (error) {
      console.log(error);
      dispatch(authFailed(error.message));
    }
  };
}

export function logIn() {
  return {
    type: ActionTypes.LOGIN,
  } as const;
}

export function logOut() {
  return {
    type: ActionTypes.LOGOUT,
  } as const;
}

export type SomeAuthAction = ReturnType<
  typeof openAuthPopup |
  typeof authFailed |
  typeof authCommit |
  typeof logIn |
  typeof logOut
>
