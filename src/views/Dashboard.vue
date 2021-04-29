<template>
  <div>
    <div>
      <v-btn @click="format" depressed color="primary">格式化</v-btn>
      <v-btn depressed color="primary" @click="toDev"
        >toDev</v-btn
      >
      <v-btn depressed color="primary" @click="toPro"
        >toPro</v-btn
      >
    </div>

    <div ref="jsonContainer" class="json-container">
      <div :style="flexWidth" ref="jsonContainerLeft">
        <json-editor class="json-left" v-model="test" v-resize="handleResize" />
      </div>
      <div class="json-right" :style="flexWidth">
        <json-viewer
          :value="viewerData"
          :expand-depth="2"
          copyable
          :expanded="true"
        ></json-viewer>
      </div>
    </div>
  </div>
</template>

<script>
import JsonEditor from "../components/editor/index";
import JsonViewer from "vue-json-viewer";
import { get } from "../utils/http";
export default {
  components: {
    JsonEditor,
    JsonViewer,
  },
  data: () => ({
    eWidth: 0,
    dHeight: 0,
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
  
  async mounted() {
    const eWidth = this.$refs.jsonContainer.clientWidth;
    this.eWidth = eWidth;
    const dHeight = document.documentElement.clientHeight;
    this.dHeight = dHeight;
    this.$refs.jsonContainer.onresize = function () {
      const eWidth = this.$refs.jsonContainer.clientWidth;
      this.eWidth = eWidth;
      const dHeight = document.jsonContainer.clientHeight;
      this.dHeight = dHeight;
    };
    const config = await get("http://localhost:3000/app");
    console.log({ config });
    this.test = config;
    //  this.test = JSON.parse({config});
    // if(config) {
    //   this.test = JSON.parse(config);
    // }
  },
  computed: {
    viewerData() {
      return typeof this.test === "object" ? this.test : JSON.parse(this.test);
    },
    flexWidth() {
      const width = `${this.eWidth / 2}px`;
      const height = `${this.dHeight}px`;
      return { maxWidth: width, flex: 1, height, maxHeight: height };
    },
  },
  methods: {
    toDev() {
      console.log(this.test);
      console.log(JSON.stringify(this.test).replace("\n", ""));
    },
    toPro() {},
    // http://www.fly63.com/article/detial/6654
    formatJson2Line(txt) {
      /*格式化JSON源码(对象转换为JSON文本,是否为压缩模式)*/
      if (/^\s*$/.test(txt)) {
        return txt;
      }
    },
    handleResize() {
      const eWidth = this.$refs.jsonContainer.clientWidth;
      console.log(eWidth);
      const eWidthY = this.$refs.jsonContainerLeft.clientWidth;
      console.log(eWidthY);
    },
    format() {
      if (typeof this.test === "string") {
        this.test = JSON.parse(this.test);
      }
    },
  },
};
</script>

<style lang="scss">
.json-left {
  .CodeMirror {
    height: 100%;
  }
}
.json-right {
  overflow-y: scroll;

  .jv-container {
    height: 100%;
  }
}
.json-container {
  margin: 10px;
  border: 1px solid #000;
  display: flex;
  overflow-y: hidden;
}
</style>