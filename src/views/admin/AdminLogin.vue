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
              v-model="dadosLogin.username"
              required
            />
          </div>
          <div>
            <label for="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              v-model="dadosLogin.password"
              required
            />
          </div>
          <p v-if="alertaErro" class="form-alert">{{ alertaErro }}</p>
        </div>
        <button type="submit" @click.prevent="fazerLogin">Entrar</button>
      </form>
    </article>
    <footer class="admin-footer">
      <p>Desenvolvido por Mariana Morais © 2024.</p>
    </footer>
  </div>
</template>

<script>
import { apiToken, api } from "@/axios/index.js";

export default {
  name: "AdminLogin",
  data() {
    return {
      dadosLogin: {
        username: "",
        password: "",
      },
      alertaErro: null,
    };
  },
  methods: {
    fazerLogin() {
      apiToken
        .post("/token/", this.dadosLogin)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.access);

            api.get("/userdetails/").then((response) => {
              if (response.status === 200) {
                localStorage.setItem(
                  "userGroups",
                  JSON.stringify(response.data.groups)
                );
                if (
                  JSON.parse(localStorage.userGroups).includes("Admin Javiera")
                ) {
                  this.$router.push("/admin/");
                } else {
                  localStorage.removeItem("userGroups");
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  console.log(
                    "Usuário não faz parte do grupo de admins, ou não foi possível verificar."
                  );
                }
              }
            });
          }
        })
        .catch((erro) => {
          console.log(erro);
          if (erro.response.data.detail) {
            this.alertaErro = `${erro.response.data.detail}`;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets-admin/style/scss/style.scss";
</style>
