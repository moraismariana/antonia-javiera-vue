<template>
  <div id="painel-admin">
    <header class="admin-header">
      <router-link to="/admin/login"
        ><img src="@/assets-admin/img/logout.svg" alt="Deslogar"
      /></router-link>
      <img src="@/assets-admin/img/logo.svg" alt="Logo Mariana Morais" />
    </header>
    <div class="painel-admin-conteudo" data-list-size data-list-size-tam="3">
      <article class="painel-admin-intro">
        <h1>Olá, Antonia!</h1>
        <p>Bem-vinda ao Painel de Administração.</p>
      </article>
      <section class="painel-admin-nav">
        <ul>
          <li data-list-size-item>
            <router-link :to="{ name: 'InicioCMS' }">
              Editar conteúdo do site
              <img
                src="@/assets-admin/img/right-arrow.svg"
                alt="Seta para abrir edição de conteúdo"
              />
            </router-link>
          </li>
          <li data-list-size-item>
            <router-link :to="{ name: 'AdminConteudos' }">
              Artigos / Blog
              <img
                src="@/assets-admin/img/right-arrow.svg"
                alt="Seta para abrir edição de cardápio"
              />
            </router-link>
          </li>
          <li data-list-size-item>
            <router-link :to="{ name: 'AdminEstatisticas' }">
              Estatísticas de visitantes
              <img
                src="@/assets-admin/img/right-arrow.svg"
                alt="Seta para abrir estatísticas de visitantes"
              />
            </router-link>
          </li>
        </ul>
      </section>
    </div>
    <footer class="admin-footer">
      <p>Desenvolvido por Mariana Morais © 2024.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AdminPainel",
};
</script>

<style lang="scss" scoped>
@import "@/assets-admin/style/scss/style.scss";
</style>
