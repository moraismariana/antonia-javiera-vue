<template>
  <div>
    <componente-header :header-bg="true"></componente-header>

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
            <h4>
              <img
                v-if="artigo.fixado"
                src="@/assets/img/geral/pin.svg"
                alt="Artigo fixado"
              />{{ artigo.titulo }}
            </h4>
            <img
              src="@/assets/img/geral/seta-direita.svg"
              alt="Seta para a direita"
            />
          </div>
          <p>{{ artigo.descricao }}</p>
        </router-link>
      </div>

      <div class="conteudos-paginacao">
        <p>Total de artigos: {{ apiCount }}</p>
        <div>
          <div v-if="apiPrevious" @click.prevent="alterarPagina(apiPrevious)">
            <img
              src="@/assets/img/geral/seta-esquerda-claro.svg"
              alt="Seta para a esquerda"
            />
            <p>Página anterior</p>
          </div>
          <div v-if="apiNext" @click.prevent="alterarPagina(apiNext)">
            <p>Próxima página</p>
            <img
              src="@/assets/img/geral/seta-direita-claro.svg"
              alt="Seta para a direita"
            />
          </div>
        </div>
      </div>
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

<style></style>
