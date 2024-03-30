<template>
  <div class='home'>
    <v-sheet class='mx-auto w-50'>
      <v-form fast-fail @submit.prevent='signIn'>
        <v-text-field label='email' variant='solo-filled' type='text' v-model='formData.email' />
        <v-text-field label='password' type='password' v-model='formData.password' />
        <v-btn type='submit' variant='outlined'>Sign-in</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script lang='ts' setup>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ActionTypes } from '../store/action-types';

const formData = ref({
  email: '',
  password: '',
});


const router = useRouter();
const store = useStore();

async function signIn() {
  try {
    store.dispatch(
      'auth/signin',
      formData.value,
    ).then(data => {
      router.push({
        path: '/wallet',
        name: 'wallet',
      });
      store.commit('auth/setLogged', true);
    }).catch(error => {
      console.error('Error posting data:', error);
    });
  } catch (error) {
    console.error(error);
  }
}

</script>
