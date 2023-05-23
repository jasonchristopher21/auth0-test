import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

var options = {
  method: 'POST',
  url: `https://${import.meta.env.VUE_APP_AUTH0_DOMAIN}/oauth/token`,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: `${import.meta.env.VUE_APP_AUTH0_CLIENT_ID}`,
    client_secret: `${import.meta.env.VUE_APP_AUTH0_CLIENT_SECRET}`,
    audience: `https://${import.meta.env.VUE_APP_AUTH0_DOMAIN}/api/v2/`
  })
}

export const useManagementTokenStore = defineStore('managementToken', () => {
  const token = ref(null)
  const exp = ref(null)

  async function fetchManagementApiToken() {
    // await axios.request(options)
    await axios
      .post(
        'https://dev-cioju4o7r00ule5j.us.auth0.com/oauth/token',
        // {
        //   grant_type: 'client_credentials',
        //   client_id: "R9mqxjLUFpFHzxSfYdMl859yXayHFUK4",
        //   client_secret: "6H6xt1mde4v24kTQIL3FfZw6R-x-zNMAOvPgSQYBYI_C5xwfeLdqNbWK2sAjsxyM",
        //   audience: `https://dev-cioju4o7r00ule5j.us.auth0.com/api/v2/`
        // },
        {
          client_id: 'WMbzkslnH7kfiUKHiz63r3qMNJKygsRI',
          client_secret: 'Qo0uXfJ0kVVv95YecVmKs9fGJAA6Ivsakhj6WCRJ-75J7iLRUqwD3w8S6mtKdF9w',
          audience: 'https://dev-cioju4o7r00ule5j.us.auth0.com/api/v2/',
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

//   state: () => ({
//     token: null,
//     exp: null
//   }),
//   getters: {
//     isAuthenticated: (state) => !!state.token
//   },
//   actions: {
//     async login() {
//       // Perform login logic here (e.g., using Auth0 login)

//       // Once logged in, obtain the Auth0 Management API token
//       await this.fetchManagementApiToken()
//     },
//     async fetchManagementApiToken() {
//       // Make a request to your server or Auth0 to retrieve the Management API token
//       console.log('reached')
//       await axios
//         .request(options)
//         .then(function (response) {
//           console.log("responsse:" + response);
//           const token = response.data.token
//           this.setManagementApiToken(token)
//           this.exp = new Date().getTime() + response.data.expires_in * 1000
//           this.scheduleTokenRefresh(response.data.expires_in * 1000)
//         })
//         .catch(function (error) {
//           console.error(error)
//         })
//     },
//     setManagementApiToken(token) {
//       this.token = token
//     },
//     scheduleTokenRefresh(expiresInMilliseconds) {
//       // Calculate the refresh time by subtracting a buffer period (e.g., 5 minutes)
//       const refreshTime = expiresInMilliseconds - 300000 // 5 minutes in milliseconds

//       // Schedule the token refresh
//       setTimeout(() => {
//         this.refreshManagementApiTokenIfNeeded()
//       }, refreshTime)
//     },
//     async refreshManagementApiTokenIfNeeded() {
//       // Check if the token is expired or about to expire
//       if (!this.token) {
//         // Token not available, fetch a new one
//         await this.fetchManagementApiToken()
//       } else {
//         // Get the current timestamp
//         const currentTime = new Date().getTime()

//         // Decode the token to access the expiration time
//         const expirationTime = this.exp * 1000 // Convert to milliseconds

//         // Calculate the remaining time until expiration
//         const remainingTime = expirationTime - currentTime

//         if (remainingTime <= 0) {
//           // Token has expired, fetch a new one
//           await this.fetchManagementApiToken()
//         } else {
//           // Schedule the next token refresh based on the remaining time
//           this.scheduleTokenRefresh(remainingTime)
//         }
//       }
//     },
//     getToken() {
//       if (!this.token) {
//         this.fetchManagementApiToken()
//       }
//       return this.token;
//     }
//   }
// })
