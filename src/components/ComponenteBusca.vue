<template>
  <form>
    <input name="busca" id="busca" type="text" v-model="busca" />
    <input
      type="submit"
      id="lupa"
      value="Buscar"
      @click.prevent="buscarProdutos"
    />
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
