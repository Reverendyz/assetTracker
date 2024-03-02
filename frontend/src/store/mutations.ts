import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import { State } from './state';

export type Mutations<S = State> = {
  [MutationTypes.SET_LOGGED](state: S, payload: boolean): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_LOGGED](state, payload: boolean) {
    state.isLogged = payload;
  },
};
