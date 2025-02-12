<template>
  <div id="estatisticas">
    <header class="admin-header">
      <router-link :to="{ name: 'AdminPainel' }">
        <img
          src="@/assets-admin/img/left-arrow.svg"
          alt="Voltar para o painel de administração"
        />
        <p>Painel de Administração</p>
      </router-link>
      <img src="@/assets-admin/img/logo.svg" alt="Logo Mariana Morais" />
    </header>
    <article class="estatisticas-intro">
      <h1>Estatísticas de visitantes</h1>
    </article>
    <section class="estatisticas-opcoes">
      <ul>
        <li><button data-filter-button="geral">geral</button></li>
        <li><button data-filter-button="30">últimos 30 dias</button></li>
        <li><button data-filter-button="15">últimos 15 dias</button></li>
        <li><button data-filter-button="7">últimos 7 dias</button></li>
        <li><button data-filter-button="1">hoje</button></li>
      </ul>
    </section>
    <div class="estatisticas-contagem-grid">
      <section class="estatisticas-contagem">
        <h2>Acessos</h2>
        <p data-filter="dados" data-anima-numero></p>
        <p data-filter="dados"></p>
      </section>
      <section class="estatisticas-contagem">
        <h2>Revisitas</h2>
        <p data-filter="dados" data-anima-numero></p>
        <p data-filter="dados"></p>
      </section>
    </div>
    <section class="estatisticas-paginas">
      <h2>Acessos a páginas</h2>
      <ul>
        <li>
          <p>Página inicial</p>
          <p data-filter="dados" data-anima-numero></p>
        </li>
        <li>
          <p>Cardápio</p>
          <p data-filter="dados" data-anima-numero></p>
        </li>
        <li>
          <p>Sobre</p>
          <p data-filter="dados" data-anima-numero></p>
        </li>
      </ul>
    </section>
    <section class="estatisticas-links-externos">
      <h2>Toques em links externos</h2>
      <ul>
        <li>
          <p>Link de contato</p>
          <p data-filter="dados" data-anima-numero></p>
        </li>
      </ul>
    </section>
    <footer class="admin-footer">
      <p>Desenvolvido por Mariana Morais © 2024.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AdminEstatisticas",
};
</script>

<style lang="scss" scoped>
@import "@/assets-admin/style/scss/style.scss";
</style>
