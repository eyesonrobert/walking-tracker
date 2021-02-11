/** @format */

import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return ({ email, password }) => {
    //make api request to sign up with email and pw
    //if we sign up, we need to modify the state to show we are authenticated
    //if signing up fails, show error message somewhere
  };
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    //make api request to sign in with email and pw
    //if we sign in, we need to modify the state to show we are authenticated
    //if signing in fails, show error message somewhere
  };
};

const signout = (dispatch) => {
  return ({ email, password }) => {
    //make api request to sign out
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout },
  { isSignedIn: false }
);
