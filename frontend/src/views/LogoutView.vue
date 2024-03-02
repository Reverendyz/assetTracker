<template>
    <v-progress-circular color='purple' :size='60' :width='12' indeterminate></v-progress-circular>
</template>

<script lang='ts'>
import { MutationTypes } from '@/store/mutation-types';
import { useStore } from '@/store/store';
import { useRouter } from 'vue-router';
export default {
  mounted() {
    const router = useRouter();
    const store = useStore();
    store.commit(MutationTypes.SET_LOGGED, false);
    sessionStorage.removeItem('token');
    router.push({
      path: '/',
      name: 'home',
    });
    // TODO fetch('/auth/logout', {})
  }
};

</script>
