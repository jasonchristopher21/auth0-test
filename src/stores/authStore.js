import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';
import { ref } from "vue"

export const useAuthStore = defineStore('auth', () => {
  const authenticatedStatus = ref(false);
  const user = ref(null);

  const { loginWithRedirect, logout, handleRedirectCallback, isAuthenticated, getUser } = useAuth0();

  function handleLogin() {
    loginWithRedirect();
    updateAuthenticationStatus();
  }

  function handleLogout() {
    logout({ returnTo: window.location.origin })
    updateAuthenticationStatus();
  }

  function updateAuthenticationStatus() {
    if (isAuthenticated.value) {
      user.value = getUser();
    } else {
      user.value = null;
    }
  }

  return {
    isAuthenticated,
    user,
    handleLogin,
    handleLogout,
  }
});
