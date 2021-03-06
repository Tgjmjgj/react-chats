import { ActionTypes } from './actionTypes';
import * as Firebase from 'firebase/app';
import 'firebase/auth';
import { updateUserData } from 'services/firebaseApi';
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

export function authCommit(uid: string, email: string, username: string | null, pictureUrl: string | null) {
  return {
    type: ActionTypes.AUTH_SUCCESSFUL,
    uid,
    email,
    username,
    pictureUrl,
  } as const;
}

export function logoutCommit() {
  return {
    type: ActionTypes.LOGOUT,
  } as const;
}

export function logout() {
  return () => {
    Firebase.auth().signOut();
  };
}

export function simpleSignUp(name: string, email: string, password: string) {
  return async (dispatch: Dispatch<any>) => {
    try {
      const result = await Firebase.auth().createUserWithEmailAndPassword(email, password);
      if (result.user) {
        dispatch(updateUserName(name));
        console.log('1');
        updateUserData({ name });
        console.log('2');
        result.user.updateProfile({ displayName: name });
        console.log('3');
      }
    } catch (error) {
      console.log(error);
      dispatch(authFailed(error.message));
    }
  };
}

export function authWithGithub() {
  return (dispatch: Dispatch<any>) => {
    dispatch(openAuthPopup());
    const provider = new Firebase.auth.GithubAuthProvider();
    try {
      Firebase.auth().signInWithPopup(provider);
      console.log('Github Sign In');
    } catch (error) {
      console.log(error);
      dispatch(authFailed(error.message));
    }
  };
}

export function authWithGoogle() {
  return (dispatch: Dispatch<any>) => {
    dispatch(openAuthPopup());
    const provider = new Firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: 'user@example.com',
    });
    try {
      Firebase.auth().signInWithPopup(provider);
      console.log('Google Sign In');
    } catch (error) {
      console.log(error);
      dispatch(authFailed(error.message));
    }
  };
}

export function authWithFacebook() {
  return (dispatch: Dispatch<any>) => {
    dispatch(openAuthPopup());
    const provider = new Firebase.auth.FacebookAuthProvider();
    try {
      Firebase.auth().signInWithPopup(provider);
      console.log('Facebook Sign In');
    } catch (error) {
      console.log(error);
      dispatch(authFailed(error.message));
    }
  };
}

export function updateUserName(newName: string) {
  return {
    type: ActionTypes.UPDATE_USER_NAME,
    username: newName,
  } as const;
}

export type SomeAuthAction = ReturnType<
  typeof openAuthPopup |
  typeof authFailed |
  typeof authCommit |
  typeof logoutCommit |
  typeof updateUserName
>
