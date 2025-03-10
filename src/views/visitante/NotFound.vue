<template>
  <div class="notfound">
    <componente-header :header-bg="true"></componente-header>

    <article class="notfound-conteudo">
      <h1>Página não encontrada</h1>
      <p>Ops! A página que você buscou não existe.</p>
    </article>

    <componente-footer class="w2"></componente-footer>
  </div>
</template>

<script>
import ComponenteFooter from "@/components/ComponenteFooter.vue";
import ComponenteHeader from "@/components/ComponenteHeader.vue";

export default {
  name: "NotFound",
  components: {
    ComponenteHeader,
    ComponenteFooter,
  },
};
</script>

<style></style>
