<template lang="pug">
  q-page.flex.flex-center
    q-btn(@click='handleOpenPlaces') Places Magic is here!!
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function handleOpenPlaces() {
  router.push({ name: 'places-list' })
}
</script>
