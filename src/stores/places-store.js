import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const usePlacesStore = defineStore('places', {
  state: () => ({
    list: [],
    thePlace: null,
  }),
  getters: {
    getList: (state) => state.list,
    getOne: (state) => state.thePlace,
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
    fetchOnePlace(id) {
      api
        .get(`/places/${id}`)
        .then((response) => {
          this.thePlace = response.data
        })
        .catch(() => {
          // log error
        })
    },
  },
})
