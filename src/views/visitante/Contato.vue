<template>
  <div>
    <div class="header-bg">
      <componente-header></componente-header>
    </div>
    <componente-footer class="w2"></componente-footer>
  </div>
</template>

<script>
import ComponenteFooter from "@/components/ComponenteFooter.vue";
import ComponenteHeader from "@/components/ComponenteHeader.vue";

export default {
  name: "Contato",
  components: {
    ComponenteHeader,
    ComponenteFooter,
  },
};
</script>

<style></style>
