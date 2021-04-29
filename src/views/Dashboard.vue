<template>
  <div>
    <div>
      <v-btn @click="format" depressed color="primary">格式化</v-btn>
      <v-btn @click="zip" depressed color="primary">压缩</v-btn>
      <v-btn depressed color="primary" @click="toDev">toDev</v-btn>
      <v-btn depressed color="primary" @click="toPro">toPro</v-btn>
    </div>

    <div ref="jsonContainer" class="json-container">
      <div :style="flexWidth" ref="jsonContainerLeft">
        <json-editor class="json-left" v-model="jsonData"  />
      </div>
      <div class="json-right" :style="flexWidth">
        <json-viewer
          :value="viewerData"
          :expand-depth="4"
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
const OBJ_MODE = 0;
const STR_MODE = 1;
export default {
  components: {
    JsonEditor,
    JsonViewer,
  },
  data: () => ({
    eWidth: 0,
    dHeight: 0,
    jsonData: {},
    postData:"",
    status: OBJ_MODE
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
    const config = await get("http://angrykitty.link:40439/v1/events");
    this.jsonData = config[3];
    //  this.jsonData = JSON.parse({config});
    // if(config) {
    //   this.jsonData = JSON.parse(config);
    // }
  },
  computed: {
    viewerData() {
      if(this.status === OBJ_MODE) {
             if(!this.jsonData)
        return "";
      return typeof this.jsonData === "object" ? this.jsonData : JSON.parse(this.jsonData);
      }
      if(this.status === STR_MODE) {
        return this.postData;
      }
      return ""
    },
    flexWidth() {
      const width = `${this.eWidth / 2}px`;
      const height = `${this.dHeight}px`;
      return { maxWidth: width, flex: 1, height, maxHeight: height };
    },
  },
  watch: {
    jsonData: {
      handler(val) {
             this.postData = this.json2line(val).replaceAll("\"", "\\\"")
      },
      deep: true,
      immediate: true,
    },

  },
  methods: {
    toDev() {
      console.log(this.postData)
      // this.temp =  this.json2line(this.jsonData).replaceAll("\"", "\\\"")
      // // console.log(this.temp)
      // console.log(this.temp.replaceAll("\"", "\\\""))
      // // this.json2line(this.jsonData);
      // // console.log(this.json2line(this.jsonData));
      // // console.log(typeof this.jsonData);
      // // if(typeof this.jsonData === 'string') {
      // //   console.log(JSON.parse(this.jsonData))
      // // }
      // // console.log(JSON.stringify(this.jsonData).replace("\n", ""));
    },
    json2line(json) {
      if(typeof json === 'number') {
        return json
      }
      try {
        let _json = (typeof json === "string") ? JSON.parse(json) : json;
        if (Array.isArray(_json)) {
          return `[${_json.map((item) => {
            return this.json2line(item);
          })}]`;
        }
        if(typeof _json === 'object') {
          const val =  Object.keys(_json)
          .map((key) => `"${key}": ${this.json2line(_json[key])}`)
          .join(",");
          return `{${val}}`;
        }
        return `"${`${_json}`.replaceAll("\"", "'")}"`
      } catch (error) {
        return `"${`${json}`.replaceAll("\"", "'")}"`
      }
    },
    zip() {
      this.status = STR_MODE
    },
    toPro() {},
    // handleResize() {
    //   const eWidth = this.$refs.jsonContainer.clientWidth;
    //   const eWidthY = this.$refs.jsonContainerLeft.clientWidth;
    // },
    format() {
      if ( !!this.jsonData && typeof this.jsonData === "string") {
        this.jsonData = JSON.parse(this.jsonData);
      }
      this.postData = this.json2line(this.jsonData).replaceAll("\"", "\\\"")
      this.status = OBJ_MODE
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