import { GlobalState, AuthState } from './types';

export const INITIAL_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  token: '',
  user: null,
  isLoading: false,
  error: null,
};

export const INITIAL_GLOBAL_STATE: GlobalState = {
  isInited: true,
  passcode: {},
  isAppUpdateAvailable: false,
  shouldShowContextMenuHint: true,
  serviceNotifications: [],
  trustedBotIds: [],

  settings: {
    byKey: {
      theme: 'light',
      language: 'en',
      timeFormat: '24h',
    },
    performance: {}, // Add performance settings if needed
    privacy: {}, 
  },

  authState: {
    default: INITIAL_AUTH_STATE,
  },

};
