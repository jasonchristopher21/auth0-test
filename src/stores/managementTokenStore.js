import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useManagementTokenStore = defineStore('managementToken', () => {
  const token = ref(null)
  const exp = ref(null)

  async function fetchManagementApiToken() {
    // await axios.request(options)
    await axios
      .post(
        `https://${import.meta.env.VITE_AUTH0_DOMAIN}/oauth/token`,
        {
          client_id: `${import.meta.env.VITE_AUTH0_CLIENT_ID}`,
          client_secret: `${import.meta.env.VITE_AUTH0_CLIENT_SECRET}`,
          audience: `${import.meta.env.VITE_AUTH0_API_URL}`,
          grant_type: 'client_credentials'
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then((response) => {
        token.value = response.data.access_token
        exp.value = new Date().getTime() + response.data.expires_in * 1000
        scheduleTokenRefresh(response.data.expires_in * 1000)
      })
      .catch((err) => console.error(err))
  }

  function scheduleTokenRefresh(expiresInMilliseconds) {
    // Calculate the refresh time by subtracting a buffer period (e.g., 5 minutes)
    const refreshTime = expiresInMilliseconds - 300000 // 5 minutes in milliseconds

    // Schedule the token refresh
    setTimeout(() => {
      refreshManagementApiTokenIfNeeded()
    }, refreshTime)
  }

  async function refreshManagementApiTokenIfNeeded() {
    // Check if the token is expired or about to expire
    if (!token.value) {
      // Token not available, fetch a new one
      await fetchManagementApiToken()
    } else {
      // Get the current timestamp
      const currentTime = new Date().getTime()

      // Decode the token to access the expiration time
      const expirationTime = exp.value * 1000 // Convert to milliseconds

      // Calculate the remaining time until expiration
      const remainingTime = expirationTime - currentTime

      if (remainingTime <= 0) {
        // Token has expired, fetch a new one
        fetchManagementApiToken()
      } else {
        // Schedule the next token refresh based on the remaining time
        scheduleTokenRefresh(remainingTime)
      }
    }
  }

  async function getToken() {
    if (!token.value) {
      await fetchManagementApiToken()
    }
    return token.value
  }

  return {
    getToken,
    fetchManagementApiToken,
    token,
    exp
  }
})
