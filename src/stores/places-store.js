import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const usePlacesStore = defineStore('places', {
  state: () => ({
    list: [],
  }),
  getters: {
    getList: (state) => state.list,
  },
  actions: {
    searchList(searchString) {
      api
        .get(`/places/search?str=${searchString}`)
        .then((response) => {
          this.list = response.data
        })
        .catch(() => {
          // log error
        })
    },
  },
})
