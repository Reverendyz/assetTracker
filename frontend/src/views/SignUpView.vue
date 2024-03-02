<template>
  <div>
    <v-sheet class='mx-auto w-50'>
      <v-form fast-fail @submit.prevent='signUp'>
        <v-text-field label='email' type='text' v-model='formData.email' />
        <v-text-field label='password' type='password' v-model='formData.password' />
        <v-text-field label='birth' type='text' v-model='formData.birth' />
        <v-btn type='submit' variant='outlined'>Sign-Up</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

interface FormData {
  email: string,
  password: string,
  birth: string
}

export default defineComponent({
  data() {
    return {
      formData: {
        email: '',
        password: '',
        birth: '',
      } as FormData
    };
  },
  methods: {
    async signUp() {
      const endpoint = '/auth/signup';
      await fetch(`${process.env.VUE_APP_API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formData)
      }).then(
        response => response.json()
      ).then(
        data => {
          console.log('Response from server:', data);
        })
        .catch(error => {
          console.error('Error posting data:', error);
        });
    }
  }
});
</script>
