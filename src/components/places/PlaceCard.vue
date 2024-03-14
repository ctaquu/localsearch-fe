<template lang="pug">
  q-card.places-card.q-pointer(flat bordered)
    q-card-section
      .text-h6 {{ place.name }}
    q-separator(inset)
    q-card-section
      .full-width {{ address[0] }}
      .full-width {{ address[1] }}
    q-inner-loading(:showing="loading")
      q-spinner-gears(size="50px" color="primary")
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['place', 'loading'])
const address = computed(() => {
  return props.place.address.split(',')
})
</script>
