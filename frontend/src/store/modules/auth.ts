import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { createStore } from 'vuex';
import { AxiosResponse } from 'axios';

import http from '@/plugins/http';

// Declare empty store
const store = createStore({});

@Module({ namespaced: true, store, name: 'auth' })
export default class Auth extends VuexModule {
  logged = false;

  @Mutation
  setLogged(value: boolean) {
    this.logged = value;
  }

  get isLogged() {
    return this.logged;
  }

  @Action
  async signin(payload: object) {
    return http.post('/auth/signin', payload).then((response: AxiosResponse) => {
      sessionStorage.setItem('token', response.data.access_token);
      return response.data;
    });
  }

  @Action
  async signup(payload: object) {
    return http.post('/auth/signup', payload).then((response: AxiosResponse) => {
      return response.data;
    });
  }

  @Action
  async validate() {
    return http.post('/auth/validate').then((response: AxiosResponse) => {
      return response.data;
    });
  }
}
