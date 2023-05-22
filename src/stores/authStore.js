import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithRedirect, logout, handleRedirectCallback, isAuthenticated, getUser } = useAuth0();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    async login() {
      loginWithRedirect();
    },
    async logout() {
      logout({
        returnTo: window.location.origin,
      });
    },
    async handleRedirectCallback() {
      await handleRedirectCallback();
    },
    async isAuthenticated() {
      this.isAuthenticated = await isAuthenticated();

      if (this.isAuthenticated) {
        this.user = await getUser();
      } else {
        this.user = null;
      }
    },
  },
});
