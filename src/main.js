import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Add auth 0 here
import { createAuth0 } from '@auth0/auth0-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(
  createAuth0({
    domain: 'dev-cioju4o7r00ule5j.us.auth0.com',
    clientId: 'R9mqxjLUFpFHzxSfYdMl859yXayHFUK4',
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
)
app.use(router)

app.mount('#app')
