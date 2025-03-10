<template>
  <div id="painel-admin">
    <header class="admin-header">
      <div @click.prevent="deslogar" class="admin-header-botao">
        <img src="@/assets-admin/img/logout.svg" alt="Deslogar" />
      </div>
      <img src="@/assets-admin/img/logo.svg" alt="Logo Mariana Morais" />
    </header>
    <div class="painel-admin-conteudo">
      <article class="painel-admin-intro">
        <h1>Olá, Antonia!</h1>
        <p>Bem-vinda ao Painel de Administração.</p>
      </article>
      <section class="painel-admin-nav">
        <ul>
          <li>
            <router-link :to="{ name: 'InicioCMS' }">
              Editar conteúdo do site
              <img
                src="@/assets-admin/img/right-arrow.svg"
                alt="Seta para abrir edição de conteúdo"
              />
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'AdminConteudos' }">
              Artigos / Blog
              <img
                src="@/assets-admin/img/right-arrow.svg"
                alt="Seta para abrir edição de cardápio"
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
  methods: {
    deslogar() {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const userGroups = localStorage.getItem("userGroups");
      if (accessToken) {
        localStorage.removeItem("accessToken");
      }
      if (refreshToken) {
        localStorage.removeItem("refreshToken");
      }
      if (userGroups) {
        localStorage.removeItem("userGroups");
      }
      this.$router.push({ name: "AdminLogin" });
    },
  },
};
</script>
