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

    <div class="cardapio-conteudo">
      <article class="cardapio-intro">
        <h1>Artigos / Blog</h1>
      </article>

      <section class="cardapio-nav">
        <form class="admin-busca">
          <input size="1" name="busca" id="busca" type="text" v-model="busca" />
          <button
            type="submit"
            id="lupa"
            value="Buscar"
            @click.prevent="buscarProdutos"
          >
            <img src="@/assets-admin/img/lupa.svg" alt="Buscar" />
          </button>
        </form>

        <ul v-if="artigos">
          <li v-for="artigo in artigos" :key="artigo.id">
            <router-link
              :to="{ name: 'AdminArtigo', params: { param: artigo.id } }"
            >
              <div>
                <p>{{ artigo.titulo }}</p>
                <p>{{ artigo.descricao }}</p>
              </div>
              <img
                v-if="artigo.fixado"
                src="@/assets-admin/img/pin.svg"
                alt="Artigo fixado"
              />
            </router-link>
          </li>
        </ul>

        <div v-else class="cardapio-aviso">
          <p>Ainda não há nenhum artigo.</p>
          <p>
            Crie o primeiro artigo com o botão no canto superior à direita 😉
          </p>
        </div>

        <div class="admin-paginacao">
          <p>Total de artigos: {{ apiCount }}</p>
          <div>
            <div v-if="apiPrevious" @click.prevent="alterarPagina(apiPrevious)">
              <img
                src="@/assets-admin/img/left-arrow.svg"
                alt="Seta para a esquerda"
              />
            </div>
            <div v-if="apiNext" @click.prevent="alterarPagina(apiNext)">
              <p>Próxima página</p>
              <img
                src="@/assets-admin/img/right-arrow-dark.svg"
                alt="Seta para a direita"
              />
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="admin-footer">
      <p>Desenvolvido por Mariana Morais © 2024.</p>
    </footer>
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
      busca: "",
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
      api
        .get(`/artigos/${this.url}`)
        .then((response) => {
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
        })
        .catch((erro) => {
          console.log(erro);
          console.log("Não foi possível fazer a requisição GET de artigos.");
        });
    },
    alterarPagina(link) {
      api
        .get(link)
        .then((response) => {
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
        })
        .catch((erro) => {
          console.log(erro);
          console.log("Não foi possível fazer a requigição GET da página.");
        });
    },
    buscarProdutos() {
      if (this.$route.query.q !== this.busca) {
        this.$router.push({ query: { q: this.busca } });
      }
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
