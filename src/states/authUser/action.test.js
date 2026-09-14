/**
 * Skenario Pengujian authUser thunks:
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch action correctly and put access token when login succeeds
 *   - should dispatch action and call alert correctly when login fails
 *
 * - asyncUnsetAuthUser thunk
 *   - should dispatch unsetAuthUserActionCreator and clear access token
 *
 * - asyncRegisterUser thunk
 *   - should dispatch action correctly and return success true when registration succeeds
 *   - should dispatch action, call alert, and return success false when registration fails
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
} from './action';

const fakeToken = 'secret-jwt-token';
const fakeAuthUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe',
};
const fakeErrorResponse = new Error('Invalid email or password');

describe('authUser thunks', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
    api._putAccessToken = api.putAccessToken;
    api._register = api.register;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;
    api.register = api._register;

    delete api._login;
    delete api._getOwnProfile;
    delete api._putAccessToken;
    delete api._register;
  });

  describe('asyncSetAuthUser thunk', () => {
    it('should dispatch action correctly and put access token when login succeeds', async () => {
      // arrange
      api.login = () => Promise.resolve(fakeToken);
      api.putAccessToken = vi.fn();
      api.getOwnProfile = () => Promise.resolve(fakeAuthUser);

      const dispatch = vi.fn();

      // action
      const result = await asyncSetAuthUser({
        email: 'john@example.com',
        password: 'password123',
      })(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
      expect(dispatch).toHaveBeenCalledWith(
        setAuthUserActionCreator(fakeAuthUser)
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result).toEqual({ success: true });
    });

    it('should dispatch action and call alert correctly when login fails', async () => {
      // arrange
      api.login = () => Promise.reject(fakeErrorResponse);
      window.alert = vi.fn();

      const dispatch = vi.fn();

      // action
      const result = await asyncSetAuthUser({
        email: 'john@example.com',
        password: 'wrongpassword',
      })(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result).toEqual({
        success: false,
        message: fakeErrorResponse.message,
      });
    });
  });

  describe('asyncUnsetAuthUser thunk', () => {
    it('should dispatch unsetAuthUserActionCreator and clear access token', () => {
      // arrange
      api.putAccessToken = vi.fn();
      const dispatch = vi.fn();

      // action
      asyncUnsetAuthUser()(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
      expect(api.putAccessToken).toHaveBeenCalledWith('');
    });
  });

  describe('asyncRegisterUser thunk', () => {
    it('should dispatch action correctly and return success true when registration succeeds', async () => {
      // arrange
      api.register = () => Promise.resolve(fakeAuthUser);

      const dispatch = vi.fn();

      // action
      const result = await asyncRegisterUser({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      })(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result).toEqual({ success: true });
    });

    it('should dispatch action, call alert, and return success false when registration fails', async () => {
      // arrange
      api.register = () => Promise.reject(fakeErrorResponse);
      window.alert = vi.fn();

      const dispatch = vi.fn();

      // action
      const result = await asyncRegisterUser({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      })(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result).toEqual({
        success: false,
        message: fakeErrorResponse.message,
      });
    });
  });
});
