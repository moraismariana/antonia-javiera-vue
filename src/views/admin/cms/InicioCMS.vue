<template>
  <div>
    <div class="inicio-introducao-bg">
      <componente-header :cms="true"></componente-header>

      <article class="inicio-introducao">
        <h1>Antonia Javiera</h1>
        <p>Literatura, Música e a beleza da Língua Espanhola</p>
      </article>
    </div>

    <div class="inicio-sobre-bg">
      <section class="inicio-sobre">
        <div>
          <h2>Conheça a professora</h2>
          <div class="img-container img-mobile">
            <img
              src="@/assets/img/inicio/Antonia-Javiera.webp"
              alt="Imagem da professora Antonia sorrindo."
              width="582"
              height="529"
            />
          </div>
          <p>
            Antonia Javiera é atualmente professora na UFVJM e conta com
            diversas contribuições na área da Literatura, da Música e do
            Espanhol.
          </p>
          <router-link to="/sobre">Saiba mais</router-link>
        </div>
        <div class="img-container">
          <img
            src="@/assets/img/inicio/Antonia-Javiera.webp"
            alt="Imagem da professora Antonia sorrindo."
            width="582"
            height="529"
          />
        </div>
      </section>
    </div>

    <div class="inicio-conteudos-bg">
      <section class="inicio-conteudos">
        <div>
          <h2>Artigos, projetos e conteúdos</h2>
          <p>
            Aqui você consegue encontrar artigos, conteúdos e projetos
            elaborados pela professora.
          </p>
          <router-link to="/conteudos"
            >Conferir<img
              src="@/assets/img/geral/seta-direita.svg"
              alt="Seta para a direita"
          /></router-link>
        </div>
      </section>
    </div>

    <componente-contato class="contato-bg"></componente-contato>

    <componente-footer class="w1"></componente-footer>
  </div>
</template>

<script>
import ComponenteContato from "@/components/ComponenteContato.vue";
import ComponenteFooter from "@/components/ComponenteFooter.vue";
import ComponenteHeader from "@/components/ComponenteHeader.vue";

export default {
  name: "InicioCMS",
  components: {
    ComponenteHeader,
    ComponenteContato,
    ComponenteFooter,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets-admin/style/scss/style.scss";
</style>
