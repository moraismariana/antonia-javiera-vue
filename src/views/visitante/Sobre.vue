<template>
  <div>
    <componente-header :header-bg="true"></componente-header>

    <article class="sobre-conteudo">
      <h1 v-html="sobreTextoCMS.titulo"></h1>
      <div class="sobre-conteudo-grid">
        <div class="sobre-conteudo-grid-img">
          <img
            :src="sobreImgCMS.imagem_1"
            alt="Imagem da professora Antonia sorrindo."
            width="582"
            height="529"
          />
        </div>
        <div>
          <p v-html="sobreTextoCMS.paragrafo_1"></p>
        </div>
        <div class="sobre-conteudo-grid-img">
          <img
            :src="sobreImgCMS.imagem_2"
            alt="Violino"
            width="582"
            height="529"
          />
        </div>
        <div>
          <p v-html="sobreTextoCMS.paragrafo_2"></p>
        </div>
      </div>
    </article>

    <componente-contato></componente-contato>

    <componente-footer class="w2"></componente-footer>
  </div>
</template>

<script>
import { api } from "@/axios/index.js";

import ComponenteContato from "@/components/ComponenteContato.vue";
import ComponenteFooter from "@/components/ComponenteFooter.vue";
import ComponenteHeader from "@/components/ComponenteHeader.vue";

export default {
  name: "Sobre",
  components: {
    ComponenteHeader,
    ComponenteContato,
    ComponenteFooter,
  },
  data() {
    return {
      sobreTextoCMS: {
        titulo: "",
        paragrafo_1: "",
        paragrafo_2: "",
      },
      sobreImgCMS: {
        imagem_1: "",
        imagem_2: "",
      },
    };
  },
  methods: {
    getConteudosCMS() {
      api.get("/sobretexto/1/").then((response) => {
        if (response.status === 200) {
          this.sobreTextoCMS.titulo = response.data.titulo;
          this.sobreTextoCMS.paragrafo_1 = response.data.paragrafo_1;
          this.sobreTextoCMS.paragrafo_2 = response.data.paragrafo_2;
        }
      });
      api.get("sobreimg/1/").then((response) => {
        if (response.status === 200) {
          this.sobreImgCMS.imagem_1 = response.data.imagem_1;
          this.sobreImgCMS.imagem_2 = response.data.imagem_2;
        }
      });
    },
  },
  created() {
    this.getConteudosCMS();
  },
};
</script>
