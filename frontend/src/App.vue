<template>
  <nav class='d-flex justify-center mb-6' v-if='!$route.meta.hideNavBar'>
    <router-link v-if='!isLogged' to='/'><v-btn>HOME</v-btn></router-link>
    <router-link v-if='!isLogged' to='/signup'><v-btn class='nav-button'>Sign-Up</v-btn></router-link>
    <div class='nav-bar-logged' v-if='isLogged'>
      <router-link to='/wallet'><v-btn>Wallet</v-btn></router-link>
      <router-link to='/assets'><v-btn>Assets</v-btn></router-link>
      <router-link to='/logout'><v-btn prepend-icon='mdi-logout'>Logout</v-btn></router-link>
    </div>
  </nav>
  <router-view />
</template>

<script lang='ts' setup>
import { onBeforeMount, computed } from 'vue';
import { useStore } from './store/store';
import { MutationTypes } from './store/mutation-types';
  
const store = useStore();
const isLogged = computed(() => {
  return store.getters.isLogged;
});

onBeforeMount(() => {
  const token = sessionStorage.getItem('token');

  if (token) {
    const endpoint = '/auth/validate';
    fetch(process.env.VUE_APP_API_URL + endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if (response.ok) {
        store.commit(MutationTypes.SET_LOGGED, true);
      } else {
        localStorage.removeItem('token');
      }
    });
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
