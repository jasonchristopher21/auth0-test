import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';
import { ref } from "vue"

export const useAuthStore = defineStore('auth', () => {

  const { loginWithRedirect, logout, handleRedirectCallback, isAuthenticated, user } = useAuth0();

  function handleLogin() {
    loginWithRedirect().then(() => updateAuthenticationStatus);
  }

  function handleLogout() {
    logout({ returnTo: window.location.origin })
    updateAuthenticationStatus();
  }

  function updateAuthenticationStatus() {
    if (isAuthenticated) {
      console.log("Is authenticated")
      user.value = getUser();
    } else {
      console.log("Not authenticated")
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
