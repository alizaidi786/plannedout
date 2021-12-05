import { createStore } from "easy-peasy";

import GlobelStore from "./globelStore.model";

const storeModal = {
  GlobelStore: GlobelStore,
};

export default createStore(storeModal);
