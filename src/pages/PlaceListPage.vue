<template lang="pug">
  q-page.places-container.flex.flex-center
    q-input.row.places-input-search(
      v-model="search"
      filled
      placeholder="Search for places"
      dense
      clearable
      debounce="600"
      @update:model-value="searchForPlaces"
    )
    q-separator
    .q-pa-md.row.items-start.q-gutter-md.full-width.justify-center
      PlaceCard(
        v-if="placesStore.getList?.length > 0"
        v-for="place in placesStore.getList"
        :key="place.id"
        v-bind:place="place"
        v-bind:loading="loading"
        @click="handleOpenOnePlace(place.id)"
      )
      .text-h5(v-else) No places found, please type something else
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PlaceCard from 'components/places/PlaceCard.vue'
import { usePlacesStore } from 'stores/places-store'

const placesStore = usePlacesStore()
const router = useRouter()

defineOptions({
  name: 'PageListPage',
})

const search = ref('')
const loading = ref(false)

async function loadData (searchString) {
  placesStore.searchList(searchString)
}

async function searchForPlaces() {
  if(loading.value === true) {
    return
  }
  loading.value = true
  await loadData(search.value)
  loading.value = false
}

function handleOpenOnePlace(id) {
  router.push({ name: 'places-one', params: { id } })
}
</script>
