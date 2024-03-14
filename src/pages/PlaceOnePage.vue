<template lang="pug">
  q-page.places-container
    q-card(v-if='place' flat bordered)
      q-card-section
        .text-h3.text-bold {{ place.name }}
      q-card-section
        .flex
          .col
            .text-h5.text-bold Address
            .text-body1.places-one-text {{ place.address }}
            .text-h5.text-bold.q-mt-md Website(s)
            .text-body1.places-one-text(v-for='website in place.websites' ) {{ website }}
            .text-h5.text-bold.q-mt-md Phone(s)
            .text-body1.places-one-text(v-for='phoneNumber in place.phoneNumbers' ) {{ phoneNumber }}
          .col
            .text-h5.text-bold Opening hours
            .text-body1.places-one-text.flex.justify-between(v-for='openingHour in openingHours' )
              .col {{ openingHour.label }}
              .col(v-if='openingHour.value.length > 0')
                .col(v-for='v in openingHour.value' )
                  .col {{ v.start }} - {{ v.end }}
              .col(v-else ) Closed
      q-inner-loading(:showing="loading")
        q-spinner-gears(size="50px" color="primary")
          .col
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePlacesStore } from 'stores/places-store'
import { useRoute } from 'vue-router'

const placesStore = usePlacesStore()
const loading = ref(true)
const route = useRoute()

defineOptions({
  name: 'PageOnePage',
})

onMounted(() => {
  loadData(route.params.id)
})

const place = computed(() => {
  return placesStore.getOne
})

const openingHours = computed(() => {

  const openingHoursArray = Object.entries(placesStore.getOne.openingHours)
  let counter = 0
  let startingLabel = openingHoursArray[0][0]
  const displayRows = [{ label: openingHoursArray[0][0], value: openingHoursArray[0][1] }]

  // group by value (same opening hours)
  for (let i = 1; i < openingHoursArray.length; i++){
    if (JSON.stringify(openingHoursArray[i][1]) !== JSON.stringify(openingHoursArray[i - 1][1])) {
      counter++
      startingLabel = openingHoursArray[i][0]
    }
    displayRows[counter] = { label: `${startingLabel} - ${openingHoursArray[i][0]}`, value: openingHoursArray[i][1]}
  }

  // return while cleaning up duplicate labels
  return displayRows.map(row => {
    const parts = row.label.split(' - ')
    if (parts[0] === parts[1]) {
      return { label: parts[0], value: row.value }
    }
    return row
  })
})

async function loadData (id) {
  loading.value = true
  placesStore.fetchOnePlace(id)
  loading.value = false
}
</script>
