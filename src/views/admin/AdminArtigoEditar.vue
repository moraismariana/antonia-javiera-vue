<template>
  <div>
    <header class="admin-header">
      <router-link :to="{ name: 'AdminConteudos' }">
        <img src="@/assets-admin/img/left-arrow.svg" alt="Voltar" />
        <p>Artigos</p>
      </router-link>
      <img src="@/assets-admin/img/logo.svg" alt="Logo Mariana Morais" />
    </header>

    <form class="admin-artigo-conteudo" autocomplete="off">
      <h1>Editar artigo</h1>
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

        <div class="botoes-editar-artigo">
          <button @click.prevent="modalAtivo = true">
            <img src="@/assets-admin/img/delete2.svg" alt="Lixeira" />
            Deletar artigo
          </button>
          <button @click.prevent="atualizarArtigo">
            <img src="@/assets-admin/img/confirm.svg" alt="Check" />
            Atualizar
          </button>
        </div>
      </div>
    </form>

    <footer class="admin-footer">
      <p>Desenvolvido por Mariana Morais © 2024.</p>
    </footer>

    <section v-if="modalAtivo" class="api-modal-container">
      <div class="api-modal">
        <h2>Você tem certeza?</h2>
        <p>Após deletar, não será possível restaurar o conteúdo.</p>
        <form id="delete-categoria">
          <div class="api-buttons">
            <button
              @click.prevent="modalAtivo = false"
              class="cancel-button"
              type="button"
            >
              Cancelar
            </button>
            <button @click.prevent="deletarArtigo" class="send-button">
              Deletar
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import "@/assets-admin/style/scss/style.scss";
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
      api
        .get(`/artigos/${this.param}/`)
        .then((response) => {
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
        })
        .catch((erro) => {
          console.log(erro);
          console.log("Não foi possível fazer a requisição GET do artigo.");
        });
    },
    atualizarArtigo() {
      api
        .put(`/artigos/${this.param}/`, this.artigo)
        .then(() => {
          window.alert("Artigo atualizado com sucesso!");
          this.$router.push({ name: "AdminConteudos" });
        })
        .catch((erro) => {
          console.log(erro);
          console.log("Não foi possível fazer a requisição PUT.");
        });
    },
    deletarArtigo() {
      api
        .delete(`/artigos/${this.param}/`)
        .then(() => {
          window.alert("Artigo deletado com sucesso.");
          this.$router.push({ name: "AdminConteudos" });
        })
        .catch((erro) => {
          console.log(erro);
          console.log("Não foi possível fazer a requisição DELETE.");
        });
    },
  },
  created() {
    this.colocarDadosNoForm();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets-admin/style/scss/style.scss";
</style>
