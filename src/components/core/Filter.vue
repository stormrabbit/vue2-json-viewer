<template>
  <v-menu
    :close-on-content-click="false"
    bottom
    left
    min-width="300"
    max-width="300"
    nudge-left="12"
    offset-x
    transition="slide-y-transition"
  >
    <template v-slot:activator="{on}">
      <v-btn
        v-on="on"
        class="elevation-0"
        color="grey"
        dark
        fab
        fixed
        style="top: 96px;"
        top
      >
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-container grid-list-xl>
        <v-layout wrap>
          <v-flex xs12>
            <div class="text-xs-center body-2 text-uppercase sidebar-filter">Sidebar Filters</div>

            <v-layout justify-center>
              <v-avatar
                v-for="c in colors"
                :key="c"
                :class="[c === color ? 'color-active color-' + c: 'color-' + c]"
                size="23"
                @click="innerColor(c)"
              />
            </v-layout>
            <v-divider class="mt-3" />
          </v-flex>

        </v-layout>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data: () => ({
    colors: [
      'primary',
      'info',
      'success',
      'warning',
      'danger'
    ],
  }),

  computed: {
    ...mapState('app', ['image', 'color']),
    color () {
      return this.color
    }
  },

  methods: {
    ...mapMutations('app', ['setColor']),
    innerColor (color) {
      this.setColor(color)
    }
  }
}
</script>

<style lang="scss">
.v-avatar,
.v-responsive {
  cursor: pointer;
}
</style>
