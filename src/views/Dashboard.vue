<template>
  <div>
    <v-btn @click="format">格式化</v-btn>
    <div style="display: flex;">
      <div style="flex:1">
        <json-editor v-model="test" />
      </div>
      <div style="flex:1">
        <json-viewer :value="viewerData" :expand-depth="10" copyable boxed :expanded="true"></json-viewer>
      </div>
    </div>
  </div>
</template>

<script>
import JsonEditor from "../components/editor/index";
import JsonViewer from "vue-json-viewer";
export default {
  components: {
    JsonEditor,
    JsonViewer,
  },
  data: () => ({
    test: {
      a: 1,
      b: {
        c: 2,
        d: 3,
        e: {
          f: 4,
          g: {
            h: 5,
          },
        },
        i: 6,
        j: {
          k: 7,
        },
        l: 8,
      },
      m: 9,
      n: {
        o: 0,
        p: {
          q: 1,
        },
      },
    },
  }),
  computed: {
    viewerData () {
      return typeof this.test === 'object' ? this.test : JSON.parse(this.test);
    }
  },
  methods: {
    format() {
      if (typeof this.test === "string") {
        this.test = JSON.parse(this.test);
      }
    },

  },
};
</script>

<style>
</style>