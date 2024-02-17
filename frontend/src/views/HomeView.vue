<template>
  <div class="home">
    <label for="email">email: </label><input type="text" v-model="formData.email"/>
    <label for="password">password: </label><input type="text" v-model="formData.password"/>
    <button @click="signIn">Sign-in</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const formData = ref({
  email: '',
  password: '',
});

async function signIn(){
  try {
    const endpoint = "/auth/signin"
    await fetch("http://0.0.0.0:3000" + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(formData.value),
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      sessionStorage.setItem('token', data.access_token);
    })
    .catch(error => {
      console.error('Error posting data:', error);
    });
  } catch (error) {
    console.error(error)
  }
}

</script>
