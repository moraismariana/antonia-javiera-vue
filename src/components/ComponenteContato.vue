<template>
  <div>
    <section class="contato">
      <h2 v-html="componenteContatoTextoCMS.contato_titulo"></h2>
      <div>
        <p v-html="componenteContatoTextoCMS.contato_descricao"></p>
        <p></p>
        <router-link to="/contato"
          >Email
          <img
            src="@/assets/img/geral/seta-direita.svg"
            alt="Seta para a direita"
        /></router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { api } from "@/axios/index.js";

export default {
  name: "ComponenteContato",
  data() {
    return {
      componenteContatoTextoCMS: {
        contato_titulo: "",
        contato_descricao: "",
      },
    };
  },
  methods: {
    getConteudosCMS() {
      api.get("/componentecontatotexto/1/").then((response) => {
        if (response.status === 200) {
          this.componenteContatoTextoCMS.contato_titulo =
            response.data.contato_titulo;
          this.componenteContatoTextoCMS.contato_descricao =
            response.data.contato_descricao;
        }
      });
    },
  },
  created() {
    this.getConteudosCMS();
  },
};
</script>

<style></style>
