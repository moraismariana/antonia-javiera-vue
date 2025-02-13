<template>
  <div>
    <form class="container" autocomplete="off">
      <h1>Editar artigo</h1>
      <p>{{ param }}</p>
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

      <button @click.prevent="modalAtivo = true">Deletar artigo</button>
      <button @click.prevent="atualizarArtigo">Atualizar</button>

      <div v-if="modalAtivo">
        <p>Você tem certeza que deseja deletar o artigo?</p>
        <button @click.prevent="modalAtivo = false">Cancelar</button>
        <button @click.prevent="deletarArtigo">Sim</button>
      </div>
    </form>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.snow.css";
import { api } from "@/axios";

export default {
  name: "AdminArtigoEditar",
  props: ["param"],
  components: {
    quillEditor,
  },
  data() {
    return {
      modalAtivo: false,
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
    colocarDadosNoForm() {
      api.get(`/artigos/${this.param}/`).then((response) => {
        if (response.data.titulo) {
          this.artigo.titulo = response.data.titulo;
        }
        if (response.data.descricao) {
          this.artigo.descricao = response.data.descricao;
        }
        if (response.data.conteudo) {
          this.artigo.conteudo = response.data.conteudo;
        }
        if (response.data.fixado) {
          this.artigo.fixado = response.data.fixado;
        }
      });
    },
    atualizarArtigo() {
      api.put(`/artigos/${this.param}/`, this.artigo).then(() => {
        window.alert("Artigo atualizado com sucesso!");
      });
    },
    deletarArtigo() {
      api.delete(`/artigos/${this.param}/`).then(() => {
        window.alert("O artigo foi deletado.");
        this.$router.push("/admin/conteudos");
      });
    },
  },
  created() {
    this.colocarDadosNoForm();
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
