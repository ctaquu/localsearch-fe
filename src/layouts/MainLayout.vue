<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header( elevated )
      q-toolbar
        q-btn(
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        )
        q-toolbar-title LocalSearch Test App
        div Damjan
    q-drawer( v-model="leftDrawerOpen" show-if-above bordered )
      q-list
        q-item-label(header) Funny Navigation
        EssentialLink(
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        )
    q-page-container
      router-view
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout',
})

const linksList = [
  {
    title: 'Places',
    caption: 'listing stuff',
    icon: 'place',
    link: '/',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
