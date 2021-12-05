import { action, persist } from "easy-peasy";

const GlobelStore = persist({
  user: [],
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  clearState: action((state, payload) => {
    state[payload] = [];
  }),
});

export default GlobelStore;
