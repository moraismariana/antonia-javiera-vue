<template>
  <div>
    <div class="quill-editor">
      <quill-editor id="editor" v-model="conteudo"></quill-editor>
      {{ conteudo }}
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.snow.css";

export default {
  name: "AdminArtigo",
  props: ["param"],
  components: {
    quillEditor,
  },
  data() {
    return {
      conteudo: "",
    };
  },
};
</script>

<style>
.quill-editor {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50vh;
  transform: translateY(-30%);
  height: 500px;
}
</style>
