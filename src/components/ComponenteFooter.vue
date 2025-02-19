<template>
  <div class="footer">
    <footer v-if="!cms" class="footer">
      <div>
        <img
          src="@/assets/img/geral/logo-footer.svg"
          alt="Antonia Javiera Logo"
          width="120"
          height="52"
        />
        <div class="footer-links">
          <ul>
            <li><router-link to="/">Início</router-link></li>
            <li><router-link to="/sobre">Sobre</router-link></li>
            <li>
              <router-link to="/conteudos">Conteúdos</router-link>
            </li>
            <li><router-link to="/contato">Contato</router-link></li>
          </ul>
          <ul>
            <li><a href="tel:+5538998082804" target="_blank">Telefone</a></li>
            <li>
              <a
                href="https://www.instagram.com/antoniajavieracabreramunoz/"
                target="_blank"
                >Instagram</a
              >
            </li>
            <li><router-link to="/contato">Email</router-link></li>
          </ul>
        </div>
      </div>
      <div>
        <p>Desenvolvido por Mariana Morais © 2025.</p>
      </div>
    </footer>
    <footer v-else class="footer">
      <div>
        <img
          src="@/assets/img/geral/logo-footer.svg"
          alt="Antonia Javiera Logo"
          width="120"
          height="52"
        />
        <div class="footer-links">
          <ul>
            <li>
              <router-link :to="{ name: 'InicioCMS' }">Início</router-link>
            </li>
            <li><router-link :to="{ name: 'SobreCMS' }">Sobre</router-link></li>
          </ul>
          <ul>
            <li><a href="tel:+5538998082804" target="_blank">Telefone</a></li>
            <li>
              <a
                href="https://www.instagram.com/antoniajavieracabreramunoz/"
                target="_blank"
                >Instagram</a
              >
            </li>
            <li><router-link to="/contato">Email</router-link></li>
          </ul>
        </div>
      </div>
      <div>
        <p>Desenvolvido por Mariana Morais © 2025.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "ComponenteFooter",
  props: ["cms"],
};
</script>

<style></style>
