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
import { MutationTypes } from '@/store/mutation-types';
import { useStore } from '@/store/store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const formData = ref({
  email: '',
  password: '',
});

const router = useRouter();
const store = useStore();

async function signIn() {
  try {
    const endpoint = '/auth/signin';
    await fetch(process.env.VUE_APP_API_URL + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(formData.value),
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
      sessionStorage.setItem('token', data.access_token);
      store.commit(MutationTypes.SET_LOGGED, true);
      router.push({
        path: '/wallet',
        name: 'wallet',
      });
    }).catch(error => {
      console.error('Error posting data:', error);
    });
  } catch (error) {
    console.error(error);
  }
}

</script>
