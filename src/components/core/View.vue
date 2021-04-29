<template>
  <v-main>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
    <core-footer />
  </v-main>
</template>

<script>
export default {
  metaInfo () {
    return {
      title: 'Vuetify_Quick_Start'
    }
  }
}
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
