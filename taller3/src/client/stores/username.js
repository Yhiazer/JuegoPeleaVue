import { defineStore } from 'pinia';

export const useUserDataStore = defineStore({
  id: 'userData',
  state: () => ({
    username: '',
  }),
  actions: {
    setUsername(username) {
      this.username = username;
    },
  },
});
