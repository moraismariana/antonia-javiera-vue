<template>
  <div>
    <div class="header-bg">
      <componente-header></componente-header>
    </div>

    <section class="contato-conteudo">
      <h1>Contato</h1>
      <form>
        <div>
          <div class="contato-form-element">
            <label for="nome">Nome</label>
            <input type="text" id="nome" name="nome" />
          </div>
          <div class="contato-form-element">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
        </div>
        <div class="contato-form-element">
          <label for="mensagem">Mensagem</label>
          <textarea name="mensagem" id="mensagem" rows="5"></textarea>
        </div>
        <button>Enviar</button>
      </form>
    </section>

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
