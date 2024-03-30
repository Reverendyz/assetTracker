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
import { useStore } from 'vuex';

const store = useStore();
const isLogged = computed(() => {
  return store.getters['auth/isLogged'];
});

onBeforeMount(() => {
  const token = sessionStorage.getItem('token');

  if (token) {
    store.dispatch('auth/validate').then(() => {
      store.commit('auth/setLogged', true);
    }).catch(() => {
      sessionStorage.removeItem('token');
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
