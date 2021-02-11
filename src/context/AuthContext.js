/** @format */

import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import {navigate} from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };

    case 'signup':
      return { token: action.payload, errorMessage: '' };

    default:
      return state;
  }
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signup', { email, password });

    await AsyncStorage.setItem('token', response.data.token);

    dispatch({ type: 'signup', payload: response.data.token });

    navigate('TrackList')
    
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Oops! Something went wrong with sign up',
    });
  }
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
  { token: null, errorMessage: '' }
);
