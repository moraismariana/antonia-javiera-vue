<template>
  <div>
    <div class="inicio-introducao-bg">
      <componente-header></componente-header>

      <article class="inicio-introducao">
        <h1 v-html="pagInicio.textos.introducaoTitulo"></h1>
        <p v-html="pagInicio.textos.introducaoSubtitulo"></p>
      </article>
    </div>

    <div class="inicio-sobre-bg">
      <section class="inicio-sobre">
        <div>
          <h2 v-html="pagInicio.textos.sobreTitulo"></h2>
          <div class="img-container img-mobile">
            <img
              :src="pagInicio.imagens.imagem1"
              alt="Imagem da professora Antonia sorrindo."
              width="582"
              height="529"
            />
          </div>
          <p v-html="pagInicio.textos.sobreDescricao"></p>
          <router-link to="/sobre">Saiba mais</router-link>
        </div>
        <div class="img-container">
          <img
            :src="pagInicio.imagens.imagem1"
            alt="Imagem da professora Antonia sorrindo."
            width="582"
            height="529"
          />
        </div>
      </section>
    </div>

    <div class="inicio-conteudos-bg">
      <section class="inicio-conteudos">
        <div>
          <h2 v-html="pagInicio.textos.artigosTitulo"></h2>
          <p v-html="pagInicio.textos.artigosDescricao"></p>
          <router-link to="/conteudos"
            >Conferir<img
              src="@/assets/img/geral/seta-direita.svg"
              alt="Seta para a direita"
          /></router-link>
        </div>
      </section>
    </div>

    <componente-contato class="contato-bg"></componente-contato>

    <componente-footer class="w1"></componente-footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import ComponenteContato from "@/components/ComponenteContato.vue";
import ComponenteFooter from "@/components/ComponenteFooter.vue";
import ComponenteHeader from "@/components/ComponenteHeader.vue";

export default {
  name: "Inicio",
  components: {
    ComponenteHeader,
    ComponenteContato,
    ComponenteFooter,
  },
  computed: {
    ...mapState(["pagInicio"]),
  },
  methods: {
    ...mapActions(["getPagInicio"]),
  },
  created() {
    this.getPagInicio();
  },
};
</script>
