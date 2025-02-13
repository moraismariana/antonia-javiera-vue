<template>
  <div>
    <form class="container" autocomplete="off">
      <h1>Novo Artigo</h1>
      <div>
        <label for="titulo">Título do artigo</label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          v-model="artigo.titulo"
          required
        />
      </div>
      <div>
        <label for="descricao">Descrição</label>
        <textarea
          name="descricao"
          id="descricao"
          v-model="artigo.descricao"
          required
        ></textarea>
      </div>
      <div>
        <label for="fixado">Fixado</label>
        <input
          type="checkbox"
          id="fixado"
          name="fixado"
          v-model="artigo.fixado"
        />
      </div>

      <div class="quill-editor">
        <quill-editor
          v-model="artigo.conteudo"
          :options="quillOptions"
        ></quill-editor>
      </div>

      <button @click.prevent="enviarArtigo">Enviar</button>
    </form>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.snow.css";
import { api } from "@/axios";

export default {
  name: "AdminArtigoNovo",
  components: {
    quillEditor,
  },
  data() {
    return {
      artigo: {
        titulo: "",
        descricao: "",
        conteudo: "",
        fixado: false,
      },
      quillOptions: {
        placeholder: "Comece o seu artigo aqui...",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
          ],
        },
      },
    };
  },
  methods: {
    enviarArtigo() {
      api.post("/artigos/", this.artigo).then(() => {
        window.alert("Artigo criado com sucesso!");
        this.$router.push("/admin/conteudos");
      });
    },
  },
};
</script>

<style>
.quill-editor {
  max-width: 1000px;
  height: 400px;
  margin-bottom: 50px;
}
</style>
