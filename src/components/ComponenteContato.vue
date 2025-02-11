<template>
  <div>
    <section class="contato">
      <h2>Contato</h2>
      <div>
        <p>
          Quer enviar uma mensagem? <br />
          Entre em contato através do botão abaixo.
        </p>
        <p></p>
        <router-link to="/contato"
          >Email
          <img
            src="@/assets/img/geral/seta-direita.svg"
            alt="Seta para a direita"
        /></router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ComponenteContato",
};
</script>

<style></style>
