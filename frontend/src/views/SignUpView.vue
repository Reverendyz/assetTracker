<template>
    <div>
        <label for="email">Email: </label><input type="text" v-model="formData.email" >
        <label for="email">Password: </label><input type="password" v-model="formData.password" >
        <label for="email">Birth: </label><input type="text" v-model="formData.birth" >
        <button @click="signUp">Submit</button>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

interface FormData{
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
            }as FormData
        };
    },
    methods: {
        async signUp() {
            const endpoint = 'http://0.0.0.0:3000/auth/signup';
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response from server:', data);
            })
            .catch(error => {
                console.error('Error posting data:', error);
            });
        }
    }
});
</script>
