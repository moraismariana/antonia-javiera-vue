<template>
  <div>
    <div class="header-bg">
      <componente-header></componente-header>
    </div>

    <router-view></router-view>

    <section class="conteudos-conteudo">
      <h1>Artigos, projetos e conteúdos</h1>
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
    </section>

    <componente-footer class="w2"></componente-footer>
  </div>
</template>

<script>
import { api } from "@/axios/index.js";

import ComponenteFooter from "@/components/ComponenteFooter.vue";
import ComponenteHeader from "@/components/ComponenteHeader.vue";

export default {
  name: "Conteudos",
  components: {
    ComponenteHeader,
    ComponenteFooter,
  },
  data() {
    return {
      artigos: null,
    };
  },
  methods: {
    getArtigos() {
      api.get("/artigos/").then((response) => (this.artigos = response.data));
    },
  },
  created() {
    this.getArtigos();
  },
};
</script>

<style></style>
