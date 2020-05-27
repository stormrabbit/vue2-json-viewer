<template lang="pug">
  v-app-bar(id="core-toolbar" app flat prominent style="background: #fff;")
    div(style="display: flex;align-items: center;")
      v-toolbar-title(style="padding-bottom: 0" class="tertiary--text font-weight-light")
        v-btn(class="default v-btn--simple" dark icon @click.stop="onClickBtn")
          v-icon mdi-view-list
      v-breadcrumbs(:items="breadcrumbs")
    v-spacer
</template>

<script>

import {
  mapMutations
} from 'vuex'

export default {
  data: () => ({
    notifications: [
    ],
    title: null,
    responsive: false
  }),

  watch: {
    '$route' (val) {
      this.title = val.name
    }
  },

  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  computed:{
    breadcrumbs() {
      const temp = {text:this.title ? this.title: ''}
      return [temp]
    }
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>

<style>
#core-toolbar a {
  text-decoration: none;
}
</style>
