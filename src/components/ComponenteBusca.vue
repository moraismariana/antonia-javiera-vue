<template>
  <form class="conteudos-busca">
    <input name="busca" id="busca" type="text" v-model="busca" />
    <button
      type="submit"
      id="lupa"
      value="Buscar"
      @click.prevent="buscarProdutos"
    >
      <img src="@/assets/img/geral/lupa.svg" alt="Buscar" />
    </button>
  </form>
</template>

<script>
export default {
  name: "ComponenteBusca",
  data() {
    return {
      busca: "",
    };
  },
  methods: {
    buscarProdutos() {
      if (this.$route.query.q !== this.busca) {
        this.$router.push({ query: { q: this.busca } });
      }
    },
  },
};
</script>

<style></style>
