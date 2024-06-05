import { defineStore } from 'pinia';

export const useGameDataStore = defineStore({
  id: 'gameData',
  state: () => ({
    selectedImages: [],
  }),
  actions: {
    setSelectedImages(images) {
      this.selectedImages = images;
    },
  },
});
