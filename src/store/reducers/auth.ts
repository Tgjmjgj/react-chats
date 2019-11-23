import { ActionTypes } from '../actionTypes';
import { SomeAuthAction } from '../actions'; 

export type AuthState = {
  readonly popup: boolean,
  readonly error: string | null,
  readonly user: {
    readonly name: string,
  } | null,
};

const initialState: AuthState = {
  popup: false,
  error: null,
  user: null,
};

export default function(state = initialState, action: SomeAuthAction) {
  switch (action.type) {
    case ActionTypes.AUTH_EXTERNAL_POPUP:
      return { ...state, popup: true };
    case ActionTypes.AUTH_UNSUCCESSFUL:
      return { ...state, popup: false, error: action.error, user: null };
    case ActionTypes.AUTH_SUCCESSFUL:
      return { ...state, popup: false, error: null, user: { name: action.username } };
    default:
      return state;
  }
}
