<template>
  <div id="admin-artigo">
    <header class="admin-header">
      <router-link :to="{ name: 'AdminConteudos' }">
        <img src="@/assets-admin/img/left-arrow.svg" alt="Voltar" />
        <p>Artigos</p>
      </router-link>
      <img src="@/assets-admin/img/logo.svg" alt="Logo Mariana Morais" />
    </header>

    <form class="admin-artigo-conteudo" autocomplete="off">
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
          rows="1"
        ></textarea>
      </div>

      <div class="quill-editor">
        <label for="editor"> Conteúdo</label>
        <quill-editor
          id="editor"
          v-model="artigo.conteudo"
          :options="quillOptions"
        ></quill-editor>
      </div>

      <div class="admin-artigo-fim">
        <div class="admin-artigo-fixado">
          <label class="container-checkbox" for="fixado">
            <p>Fixado</p>
            <input
              type="checkbox"
              id="fixado"
              name="fixado"
              v-model="artigo.fixado"
            />
            <span class="checkmark"></span>
          </label>
        </div>

        <button @click.prevent="enviarArtigo">Enviar</button>
      </div>
    </form>

    <footer class="admin-footer">
      <p>Desenvolvido por Mariana Morais © 2024.</p>
    </footer>
  </div>
</template>

<script>
import "@/assets-admin/style/scss/style.scss";
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

<style lang="scss" scoped>
@import "@/assets-admin/style/scss/style.scss";
</style>
