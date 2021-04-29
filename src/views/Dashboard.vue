<template>
  <div>
    <v-btn @click="format" depressed color="primary">格式化</v-btn>
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
  directives: {
    // 使用局部注册指令的方式
    resize: {
      // 指令的名称
      bind(el, binding) {
        // el为绑定的元素，binding为绑定给指令的对象
        let width = "",
          height = "";
        function isReize() {
          const style = document.defaultView.getComputedStyle(el);
          if (width !== style.width || height !== style.height) {
            binding.value(); // 关键
          }
          width = style.width;
          height = style.height;
        }
        el.__vueSetInterval__ = setInterval(isReize, 300);
      },
      unbind(el) {
        clearInterval(el.__vueSetInterval__);
      },
    },
  },
  mounted() {
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
  },
  computed: {
    viewerData() {
      return typeof this.test === "object" ? this.test : JSON.parse(this.test);
    },
    flexWidth() {
      const width = `${this.eWidth / 2}px`;
      const height = `${this.dHeight}px`
      return { maxWidth: width, flex: 1, height, maxHeight:height };
    },
  },
  methods: {
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
 
  .jv-container{
    height: 100%;
  }
}
.json-container{
  margin: 10px;
   border: 1px solid #000;
  display: flex;
  overflow-y: hidden;
}
</style>