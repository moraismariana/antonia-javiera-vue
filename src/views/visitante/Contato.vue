<template>
  <div>
    <componente-header :header-bg="true"></componente-header>
    <section class="contato-conteudo">
      <h1 v-html="compContato.textos.contatoTitulo"></h1>
      <form>
        <div>
          <div class="contato-form-element">
            <label for="nome">Nome</label>
            <input
              v-model="formularioContato.nome"
              type="text"
              id="nome"
              name="nome"
              required
              autocomplete="off"
            />
          </div>
          <div class="contato-form-element">
            <label for="email">Email</label>
            <input
              v-model="formularioContato.email"
              type="email"
              id="email"
              name="email"
              required
              autocomplete="off"
            />
          </div>
        </div>
        <div class="contato-form-element">
          <label for="mensagem">Mensagem</label>
          <textarea
            v-model="formularioContato.mensagem"
            name="mensagem"
            id="mensagem"
            rows="5"
            required
          ></textarea>
        </div>
        <button @click.prevent="enviarEmail">Enviar</button>
      </form>
    </section>

    <componente-footer class="w2"></componente-footer>
  </div>
</template>

<script>
import { api } from "@/axios/index.js";
import { mapState, mapActions } from "vuex";

import ComponenteFooter from "@/components/ComponenteFooter.vue";
import ComponenteHeader from "@/components/ComponenteHeader.vue";

export default {
  name: "Contato",
  components: {
    ComponenteHeader,
    ComponenteFooter,
  },
  data() {
    return {
      formularioContato: {
        nome: "",
        email: "",
        mensagem: "",
      },
    };
  },
  computed: {
    ...mapState(["compContato"]),
  },
  methods: {
    ...mapActions(["getCompContato"]),
    enviarEmail() {
      api
        .post("/contato/", this.formularioContato)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          if (response.status === 200) {
            window.alert("Email enviado com sucesso.");
            this.formularioContato.nome = "";
            this.formularioContato.email = "";
            this.formularioContato.mensagem = "";
          }
        })
        .catch((erro) => {
          console.log(erro);
          switch (erro.status) {
            case 400:
              if (erro.response.data.nome) {
                window.alert(`${erro.response.data.nome[0]}`);
              } else if (erro.response.data.email) {
                window.alert(`${erro.response.data.email[0]}`);
              } else if (erro.response.data.mensagem) {
                window.alert(`${erro.response.data.mensagem[0]}`);
              }
              break;
            default:
              window.alert(
                "Não foi possível enviar o email no momento. Tente novamente mais tarde."
              );
          }
        });
    },
  },
  created() {
    this.getCompContato();
  },
};
</script>

<style></style>
