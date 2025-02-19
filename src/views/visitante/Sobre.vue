<template>
  <div>
    <componente-header :header-bg="true"></componente-header>

    <article class="sobre-conteudo">
      <h1 v-html="pagSobre.textos.titulo"></h1>
      <div class="sobre-conteudo-grid">
        <div class="sobre-conteudo-grid-img">
          <img
            :src="pagSobre.imagens.imagem1"
            alt="Imagem da professora Antonia sorrindo."
            width="582"
            height="529"
          />
        </div>
        <div>
          <p v-html="pagSobre.textos.paragrafo1"></p>
        </div>
        <div class="sobre-conteudo-grid-img">
          <img
            :src="pagSobre.imagens.imagem2"
            alt="Violino"
            width="582"
            height="529"
          />
        </div>
        <div>
          <p v-html="pagSobre.textos.paragrafo2"></p>
        </div>
      </div>
    </article>

    <componente-contato></componente-contato>

    <componente-footer class="w2"></componente-footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
  computed: {
    ...mapState(["pagSobre"]),
  },
  methods: {
    ...mapActions(["getPagSobre"]),
  },
  created() {
    this.getPagSobre();
  },
};
</script>
