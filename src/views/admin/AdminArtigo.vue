<template>
  <div>
    <admin-artigo-novo v-if="param === 'novo'"></admin-artigo-novo>
    <admin-artigo-editar v-else :param="param"></admin-artigo-editar>
  </div>
</template>

<script>
import AdminArtigoNovo from "./AdminArtigoNovo.vue";
import AdminArtigoEditar from "./AdminArtigoEditar.vue";

export default {
  name: "AdminArtigo",
  props: ["param"],
  components: {
    AdminArtigoNovo,
    AdminArtigoEditar,
  },
};
</script>

<style></style>
