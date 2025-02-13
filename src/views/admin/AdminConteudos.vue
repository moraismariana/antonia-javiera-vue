<template>
  <div id="cardapio">
    <header class="admin-header">
      <router-link :to="{ name: 'AdminPainel' }">
        <img
          src="@/assets-admin/img/left-arrow.svg"
          alt="Voltar para o painel de administração"
        />
        <p>Painel de Administração</p>
      </router-link>
      <img src="@/assets-admin/img/logo.svg" alt="Logo Mariana Morais" />
      <router-link
        class="botao-novo"
        :to="{ name: 'AdminArtigo', params: { param: 'novo' } }"
      >
        <img src="@/assets-admin/img/add.svg" alt="Novo artigo" />
        <p>Novo artigo</p>
      </router-link>
    </header>

    <div class="cardapio-conteudo" data-list-size data-list-size-tam="3">
      <article class="cardapio-intro">
        <h1>Artigos / Blog</h1>
        <p>Aqui você pode criar, editar ou deletar seus artigos.</p>
      </article>

      <section class="cardapio-nav">
        <componente-busca></componente-busca>

        <ul v-if="artigos">
          <li v-for="artigo in artigos" :key="artigo.id">
            <router-link
              :to="{ name: 'AdminArtigo', params: { param: artigo.id } }"
            >
              <p>{{ artigo.titulo }}</p>
              <p>{{ artigo.descricao }}</p>
            </router-link>
          </li>
        </ul>

        <div v-else class="cardapio-aviso">
          <p>Ainda não há nenhum artigo.</p>
          <p>
            Crie o primeiro artigo com o botão no canto superior à direita 😉
          </p>
        </div>

        <div v-if="apiPrevious">
          <button @click.prevent="alterarPagina(apiPrevious)">
            Página anterior
          </button>
        </div>
        <div v-if="apiNext">
          <button @click.prevent="alterarPagina(apiNext)">
            Próxima página
          </button>
        </div>
        <p>Total de artigos: {{ apiCount }}</p>
      </section>
    </div>

    <footer class="admin-footer">
      <p>Desenvolvido por Mariana Morais © 2024.</p>
    </footer>

    <section
      class="api-modal-container"
      data-modal="container"
      data-modal-type="create-categoria"
    >
      <div class="api-modal">
        <h2>Nova categoria</h2>
        <form id="create-categoria" action="">
          <label for="create-categoria-nome">Nome</label>
          <input
            type="text"
            for="create-categoria-nome"
            id="create-categoria-nome"
            name="create-categoria-nome"
            required
          />
          <p class="form-alert"></p>
          <div class="api-buttons">
            <button
              data-modal="fechar"
              data-modal-type="create-categoria"
              class="cancel-button"
              type="button"
            >
              Cancelar
            </button>
            <button class="send-button" type="submit">Criar</button>
          </div>
        </form>
      </div>
    </section>

    <section
      class="api-modal-container"
      data-modal="container"
      data-modal-type="update-categoria"
    >
      <div class="api-modal">
        <h2>Editar categoria</h2>
        <form id="update-categoria" action="">
          <label for="update-categoria-nome">Nome</label>
          <input
            type="text"
            for="update-categoria-nome"
            id="update-categoria-nome"
            required
          />
          <p class="form-alert"></p>
          <div class="api-buttons">
            <button
              data-modal="fechar"
              data-modal-type="update-categoria"
              class="cancel-button"
              type="button"
            >
              Cancelar
            </button>
            <button class="send-button" type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </section>

    <section
      class="api-modal-container"
      data-modal="container"
      data-modal-type="delete-categoria"
    >
      <div class="api-modal">
        <h2>Excluir categoria?</h2>
        <p>Essa ação irá deletar todos os pratos dessa categoria.</p>
        <form id="delete-categoria" action="">
          <div class="api-buttons">
            <button
              data-modal="fechar"
              data-modal-type="delete-categoria"
              class="cancel-button"
              type="button"
            >
              Cancelar
            </button>
            <button class="send-button" type="submit">Excluir</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { api } from "@/axios/index.js";
import ComponenteBusca from "@/components/ComponenteBusca.vue";

export default {
  name: "AdminConteudos",
  components: {
    ComponenteBusca,
  },
  data() {
    return {
      artigos: null,
      apiNext: null,
      apiPrevious: null,
      apiCount: null,
    };
  },
  computed: {
    url() {
      let queryString = "";
      for (let key in this.$route.query) {
        queryString += `&${key}=${this.$route.query[key]}`;
      }
      return `?${queryString.slice(1)}`;
    },
  },
  methods: {
    getArtigos() {
      api.get(`/artigos/${this.url}`).then((response) => {
        if (response.data.results) {
          this.artigos = response.data.results;
        }
        if (response.data.next) {
          this.apiNext = response.data.next;
        }
        if (response.data.previous) {
          this.apiPrevious = response.data.previous;
        }
        if (response.data.count) {
          this.apiCount = response.data.count;
        }
      });
    },
    alterarPagina(link) {
      api.get(link).then((response) => {
        if (response.data.results) {
          this.artigos = response.data.results;
        }
        if (response.data.next) {
          this.apiNext = response.data.next;
        } else {
          this.apiNext = null;
        }
        if (response.data.previous) {
          this.apiPrevious = response.data.previous;
        } else {
          this.apiPrevious = null;
        }
        if (response.data.count) {
          this.apiCount = response.data.count;
        }
      });
    },
  },
  watch: {
    url() {
      this.getArtigos();
    },
  },
  created() {
    this.getArtigos();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets-admin/style/scss/style.scss";
</style>
