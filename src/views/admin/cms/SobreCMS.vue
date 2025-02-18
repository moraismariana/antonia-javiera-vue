<template>
  <div>
    <div class="header-bg">
      <componente-header :cms="true"></componente-header>
    </div>

    <article class="sobre-conteudo">
      <h1>Conheça a professora</h1>
      <div class="sobre-conteudo-grid">
        <div class="sobre-conteudo-grid-img">
          <img
            src="@/assets/img/sobre/Antonia-Javiera.webp"
            alt="Imagem da professora Antonia sorrindo."
            width="582"
            height="529"
          />
        </div>
        <div>
          <p>
            Antonia Javiera é professora na UFVJM, com especialidade em espanhol
            e uma trajetória marcada pela paixão pela literatura, pela música e
            pela educação. Desde cedo, Antonia se encantou com a riqueza
            cultural dos países hispânicos, o que a levou a construir uma
            carreira dedicada ao ensino e à pesquisa.
          </p>
        </div>
        <div class="sobre-conteudo-grid-img">
          <img
            src="@/assets/img/sobre/sobre-imagem-2.webp"
            alt="Violino"
            width="582"
            height="529"
          />
        </div>
        <div>
          <p>
            Ao longo dos anos, ela participou de diversos projetos acadêmicos e
            culturais, promovendo o aprendizado da língua espanhola e da música
            através de abordagens inovadoras e criativas.
          </p>
        </div>
      </div>
    </article>

    <componente-contato></componente-contato>

    <componente-footer class="w2"></componente-footer>
  </div>
</template>

<script>
import ComponenteContato from "@/components/ComponenteContato.vue";
import ComponenteFooter from "@/components/ComponenteFooter.vue";
import ComponenteHeader from "@/components/ComponenteHeader.vue";

export default {
  name: "SobreCMS",
  components: {
    ComponenteHeader,
    ComponenteContato,
    ComponenteFooter,
  },
};
</script>

<style></style>
