<template>
  <div>
    <div class="header-bg">
      <componente-header></componente-header>
    </div>

    <section class="conteudos-conteudo">
      <h1>Artigos, projetos e conteúdos</h1>
      <div class="conteudos-artigos">
        <router-link to="/artigo" class="conteudos-artigos-item">
          <div>
            <h4>Apostilas para estudantes</h4>
            <img
              src="@/assets/img/geral/seta-direita.svg"
              alt="Seta para a direita"
            />
          </div>
          <p>
            Confira aqui os materiais elaborados para os estudantes. Livros e
            apostilas sobre literatura e espanhol.
          </p>
        </router-link>
        <router-link to="/artigo" class="conteudos-artigos-item">
          <div>
            <h4>Apostilas para estudantes</h4>
            <img
              src="@/assets/img/geral/seta-direita.svg"
              alt="Seta para a direita"
            />
          </div>
          <p>
            Confira aqui os materiais elaborados para os estudantes. Livros e
            apostilas sobre literatura e espanhol.
          </p>
        </router-link>
        <router-link to="/artigo" class="conteudos-artigos-item">
          <div>
            <h4>Apostilas para estudantes</h4>
            <img
              src="@/assets/img/geral/seta-direita.svg"
              alt="Seta para a direita"
            />
          </div>
          <p>
            Confira aqui os materiais elaborados para os estudantes. Livros e
            apostilas sobre literatura e espanhol.
          </p>
        </router-link>
        <router-link to="/artigo" class="conteudos-artigos-item">
          <div>
            <h4>Apostilas para estudantes</h4>
            <img
              src="@/assets/img/geral/seta-direita.svg"
              alt="Seta para a direita"
            />
          </div>
          <p>
            Confira aqui os materiais elaborados para os estudantes. Livros e
            apostilas sobre literatura e espanhol.
          </p>
        </router-link>
        <router-link to="/artigo" class="conteudos-artigos-item">
          <div>
            <h4>Apostilas para estudantes</h4>
            <img
              src="@/assets/img/geral/seta-direita.svg"
              alt="Seta para a direita"
            />
          </div>
          <p>
            Confira aqui os materiais elaborados para os estudantes. Livros e
            apostilas sobre literatura e espanhol.
          </p>
        </router-link>
      </div>
    </section>

    <componente-footer class="w2"></componente-footer>
  </div>
</template>

<script>
import ComponenteFooter from "@/components/ComponenteFooter.vue";
import ComponenteHeader from "@/components/ComponenteHeader.vue";

export default {
  name: "Conteudos",
  components: {
    ComponenteHeader,
    ComponenteFooter,
  },
};
</script>

<style></style>
