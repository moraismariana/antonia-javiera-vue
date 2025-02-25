<template>
  <div class="artigo-flex">
    <componente-header :header-bg="true"></componente-header>

    <article v-if="artigo" class="artigo">
      <router-link class="artigo-voltar" to="/conteudos"
        ><img
          src="@/assets/img/geral/seta-esquerda-claro.svg"
          alt="Seta para esquerda"
        />Voltar</router-link
      >
      <h1>{{ artigo.titulo }}</h1>
      <div class="artigo-conteudo" v-html="artigo.conteudo"></div>
    </article>

    <componente-footer class="w2"></componente-footer>
  </div>
</template>

<script>
import { api } from "@/axios/index.js";

import ComponenteFooter from "@/components/ComponenteFooter.vue";
import ComponenteHeader from "@/components/ComponenteHeader.vue";

export default {
  name: "Artigo",
  components: {
    ComponenteHeader,
    ComponenteFooter,
  },
  props: ["artigoId"],
  data() {
    return {
      artigo: null,
    };
  },
  methods: {
    getArtigo() {
      api
        .get(`/artigos/${this.artigoId}`)
        .then((response) => {
          this.artigo = response.data;
        })
        .catch((erro) => {
          console.log(erro);
          console.log("Não foi possível fazer a requisição GET do artigo.");
        });
    },
  },
  created() {
    this.getArtigo();
  },
};
</script>

<style></style>
