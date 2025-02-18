<template>
  <div>
    <header class="cms-header">
      <div class="cms-header-content">
        <div>
          <router-link :to="{ name: 'AdminPainel' }">
            <img
              src="@/assets-admin/img/left-arrow.svg"
              alt="Voltar para o painel de administração"
            />
          </router-link>
          <p>Você está no modo de edição de conteúdo.</p>
        </div>
        <button>Salvar página</button>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AdminCMS",
};
</script>

<style></style>
