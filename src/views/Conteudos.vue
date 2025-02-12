<template>
  <div>
    <div class="header-bg">
      <componente-header></componente-header>
    </div>

    <router-view></router-view>

    <section class="conteudos-conteudo">
      <h1>Artigos, projetos e conteúdos</h1>
      <componente-busca></componente-busca>
      <div v-if="artigos" class="conteudos-artigos">
        <router-link
          v-for="artigo in artigos"
          :key="artigo.id"
          :to="{ name: 'Artigo', params: { artigoId: artigo.id } }"
          class="conteudos-artigos-item"
        >
          <div>
            <h4>{{ artigo.titulo }}</h4>
            <img
              src="@/assets/img/geral/seta-direita.svg"
              alt="Seta para a direita"
            />
          </div>
          <p>{{ artigo.descricao }}</p>
        </router-link>
      </div>
      <div v-if="apiPrevious">
        <button @click.prevent="alterarPagina(apiPrevious)">
          Página anterior
        </button>
      </div>
      <div v-if="apiNext">
        <button @click.prevent="alterarPagina(apiNext)">Próxima página</button>
      </div>
      <p>Total de artigos: {{ apiCount }}</p>
    </section>

    <componente-footer class="w2"></componente-footer>
  </div>
</template>

<script>
import { api } from "@/axios/index.js";

import ComponenteFooter from "@/components/ComponenteFooter.vue";
import ComponenteHeader from "@/components/ComponenteHeader.vue";
import ComponenteBusca from "@/components/ComponenteBusca.vue";

export default {
  name: "Conteudos",
  components: {
    ComponenteHeader,
    ComponenteFooter,
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
        }
        if (response.data.previous) {
          this.apiPrevious = response.data.previous;
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

<style></style>
