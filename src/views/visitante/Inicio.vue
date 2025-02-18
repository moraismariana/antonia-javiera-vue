<template>
  <div>
    <div class="inicio-introducao-bg">
      <componente-header></componente-header>

      <article class="inicio-introducao">
        <h1 v-html="inicioTextosCMS.introducao_titulo"></h1>
        <p v-html="inicioTextosCMS.introducao_subtitulo"></p>
      </article>
    </div>

    <div class="inicio-sobre-bg">
      <section class="inicio-sobre">
        <div>
          <h2 v-html="inicioTextosCMS.sobre_titulo"></h2>
          <div class="img-container img-mobile">
            <img
              src="@/assets/img/inicio/Antonia-Javiera.webp"
              alt="Imagem da professora Antonia sorrindo."
              width="582"
              height="529"
            />
          </div>
          <p v-html="inicioTextosCMS.sobre_descricao"></p>
          <router-link to="/sobre">Saiba mais</router-link>
        </div>
        <div class="img-container">
          <img
            src="@/assets/img/inicio/Antonia-Javiera.webp"
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
          <h2 v-html="componenteArtigosTextoCMS.artigos_titulo"></h2>
          <p v-html="componenteArtigosTextoCMS.artigos_descricao"></p>
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
import { api } from "@/axios/index.js";

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
  data() {
    return {
      inicioTextosCMS: {
        introducao_titulo: "",
        introducao_subtitulo: "",
        sobre_titulo: "",
        sobre_descricao: "",
      },
      componenteArtigosTextoCMS: {
        artigos_titulo: "",
        artigos_descricao: "",
      },
    };
  },
  methods: {
    getConteudosCMS() {
      // FALTA FAZER O CATCH
      api.get("/iniciotexto/1/").then((response) => {
        if (response.status === 200) {
          this.inicioTextosCMS.introducao_titulo =
            response.data.introducao_titulo;
          this.inicioTextosCMS.introducao_subtitulo =
            response.data.introducao_subtitulo;
          this.inicioTextosCMS.sobre_titulo = response.data.sobre_titulo;
          this.inicioTextosCMS.sobre_descricao = response.data.sobre_descricao;
        }
      });
      api.get("/componenteartigostexto/1/").then((response) => {
        if (response.status === 200) {
          this.componenteArtigosTextoCMS.artigos_titulo =
            response.data.artigos_titulo;
          this.componenteArtigosTextoCMS.artigos_descricao =
            response.data.artigos_descricao;
        }
      });
    },
  },
  created() {
    this.getConteudosCMS();
  },
};
</script>
