<template>
  <div>
    <section v-if="!cms" class="contato">
      <h2 v-html="compContato.textos.contatoTitulo"></h2>
      <div>
        <p v-html="compContato.textos.contatoDescricao"></p>
        <router-link to="/contato"
          >Email
          <img
            src="@/assets/img/geral/seta-direita.svg"
            alt="Seta para a direita"
        /></router-link>
      </div>
    </section>
    <section v-else class="contato">
      <h2>
        <textarea
          v-model="compContato.textos.contatoTitulo"
          rows="1"
          required
        ></textarea>
      </h2>
      <div>
        <p>
          <textarea
            v-model="compContato.textos.contatoDescricao"
            rows="2"
            required
          ></textarea>
        </p>
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
import { mapState, mapActions } from "vuex";

export default {
  name: "ComponenteContato",
  props: ["cms"],
  computed: {
    ...mapState(["compContato"]),
  },
  methods: {
    ...mapActions(["getCompContato"]),
  },
  created() {
    this.getCompContato();
  },
};
</script>

<!-- <style lang="scss" scoped>
@import "@/assets-admin/style/scss/style.scss";
</style> -->
