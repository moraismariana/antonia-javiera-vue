<template>
  <div id="login">
    <header class="admin-header">
      <img src="@/assets-admin/img/logo.svg" alt="Logo Mariana Morais" />
    </header>
    <article class="login-conteudo">
      <h1>Login</h1>
      <form id="login-form">
        <div class="login-conteudo-inputs">
          <div>
            <label for="username">Usuário</label>
            <input
              autocomplete="off"
              type="text"
              id="username"
              name="username"
              required
            />
          </div>
          <div>
            <label for="password">Senha</label>
            <input type="password" id="password" name="password" required />
          </div>
          <p class="form-alert"></p>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </article>
    <footer class="admin-footer">
      <p>Desenvolvido por Mariana Morais © 2024.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AdminLogin",
};
</script>

<style lang="scss" scoped>
@import "@/assets-admin/style/scss/style.scss";
</style>
