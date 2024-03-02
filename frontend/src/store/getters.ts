import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
    isLogged(state: State): boolean
}

export const getters: GetterTree<State, State> & Getters = {
  isLogged: (state) => {
    return state.isLogged;
  },
};
