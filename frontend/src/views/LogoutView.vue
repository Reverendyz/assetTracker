<template>
    <v-progress-circular color='purple' :size='60' :width='12' indeterminate></v-progress-circular>
</template>

<script lang='ts'>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  mounted() {
    const router = useRouter();
    const store = useStore();
    store.commit('auth/setLogged', false);
    sessionStorage.removeItem('token');
    router.push({
      path: '/',
      name: 'home',
    });
    // TODO fetch('/auth/logout', {})
  }
};

</script>
