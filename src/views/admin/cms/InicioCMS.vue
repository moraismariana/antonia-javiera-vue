<template>
  <form class="cms-form">
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
        <button @click.prevent="enviarDadosParaAPI">Salvar página</button>
      </div>
    </header>

    <div
      class="inicio-introducao-bg"
      :style="{ backgroundImage: `url(${pagInicio.backgrounds.bg1})` }"
      @click="armazenarBackground"
      data-bg="1"
    >
      <input
        type="file"
        data-bg-input="1"
        accept="image/png, image/jpeg, image/webp"
        style="display: none"
      />
      <componente-header :cms="true"></componente-header>

      <article class="inicio-introducao">
        <h1>
          <textarea
            v-model="pagInicio.textos.introducaoTitulo"
            rows="1"
            required
          ></textarea>
        </h1>
        <p>
          <textarea
            v-model="pagInicio.textos.introducaoSubtitulo"
            rows="1"
            required
          ></textarea>
        </p>
      </article>
    </div>

    <div class="inicio-sobre-bg">
      <section class="inicio-sobre">
        <div>
          <h2>
            <textarea
              v-model="pagInicio.textos.sobreTitulo"
              rows="2"
              required
            ></textarea>
          </h2>
          <div class="img-container img-mobile">
            <img
              :src="pagInicio.imagens.imagem1"
              alt="Imagem da professora Antonia sorrindo."
              width="582"
              height="529"
              data-imagem="1"
              @click="armazenarImagem"
            />
            <input
              type="file"
              data-imagem-input="1"
              accept="image/png, image/jpeg, image/webp"
              style="display: none"
            />
          </div>
          <p>
            <textarea
              v-model="pagInicio.textos.sobreDescricao"
              rows="3"
              required
            ></textarea>
          </p>
          <router-link to="/sobre">Saiba mais</router-link>
        </div>
        <div class="img-container">
          <img
            :src="pagInicio.imagens.imagem1"
            alt="Imagem da professora Antonia sorrindo."
            width="582"
            height="529"
            data-imagem="1"
            @click="armazenarImagem"
          />
        </div>
      </section>
    </div>

    <div
      class="inicio-conteudos-bg"
      :style="{ backgroundImage: `url(${pagInicio.backgrounds.bg2})` }"
      @click="armazenarBackground"
      data-bg="2"
    >
      <input
        type="file"
        data-bg-input="2"
        accept="image/png, image/jpeg, image/webp"
        style="display: none"
      />
      <section class="inicio-conteudos">
        <div>
          <h2>
            <textarea
              v-model="pagInicio.textos.artigosTitulo"
              rows="1"
              required
            ></textarea>
          </h2>
          <p>
            <textarea
              v-model="pagInicio.textos.artigosDescricao"
              rows="1"
              required
            ></textarea>
          </p>
          <router-link to="/conteudos"
            >Conferir<img
              src="@/assets/img/geral/seta-direita.svg"
              alt="Seta para a direita"
          /></router-link>
        </div>
      </section>
    </div>

    <componente-contato :cms="true" class="contato-bg"></componente-contato>

    <componente-footer class="w1"></componente-footer>
  </form>
</template>

<script>
import { api } from "@/axios/index.js";
import { mapState, mapActions } from "vuex";

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
  data() {
    return {
      novasImgs: new FormData(),
      novosBgs: new FormData(),
    };
  },
  computed: {
    ...mapState(["pagInicio", "compContato"]),
  },
  methods: {
    ...mapActions(["getPagInicio"]),

    armazenarImagem(event) {
      const imagem = event.target;
      const chave = imagem.getAttribute("data-imagem");
      const imgInput = document.querySelector(`[data-imagem-input="${chave}"]`);

      imgInput.click();

      imgInput.addEventListener("change", (event) => {
        let file = event.target.files[0];
        if (file) {
          let reader = new FileReader();
          reader.onload = (e) => {
            let img = new Image();
            img.onload = () => {
              let canvas = document.createElement("canvas");
              let ctx = canvas.getContext("2d");

              let width = parseInt(imagem.getAttribute("width"));
              let height = parseInt(imagem.getAttribute("height"));

              let aspectRatio = Math.max(
                width / img.width,
                height / img.height
              );

              let newWidth = img.width * aspectRatio;
              let newHeight = img.height * aspectRatio;
              let offsetX = (newWidth - width) / 2;
              let offsetY = (newHeight - height) / 2;

              canvas.width = width;
              canvas.height = height;

              ctx.drawImage(img, -offsetX, -offsetY, newWidth, newHeight);

              const urlImagem = canvas.toDataURL("image/webp");

              imagem.src = urlImagem;

              fetch(urlImagem)
                .then((response) => response.blob())
                .then((blob) => {
                  this.novasImgs.set(
                    `imagem${chave}`,
                    blob,
                    `imagem${chave}-${new Date().getTime()}.webp`
                  );
                });
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    },

    armazenarBackground(event) {
      if (event.target === event.currentTarget) {
        const bg = event.target;
        const chave = bg.getAttribute("data-bg");
        const bgInput = document.querySelector(`[data-bg-input="${chave}"]`);

        bgInput.click();

        bgInput.addEventListener("change", (event) => {
          let file = event.target.files[0];
          if (file) {
            let reader = new FileReader();
            reader.onload = (e) => {
              bg.style.backgroundImage = `url(${e.target.result})`;
              this.pagInicio.backgrounds[`bg${chave}`] = `${e.target.result}`;
            };
            reader.readAsDataURL(file);
            this.novosBgs.set(
              `bg${chave}`,
              bgInput.files[0],
              `bg${chave}-${new Date().getTime()}.webp`
            );
          }
        });
      }
    },

    enviarDadosParaAPI() {
      api.patch("/paginainicio/1/", this.pagInicio.textos).then((response) => {
        console.log(response);
      });
      api
        .patch("/componentecontato/1/", this.compContato.textos)
        .then((response) => {
          console.log(response);
        });

      if (Array.from(this.novasImgs.entries()).length > 0) {
        api
          .patch("/paginainicio/1/", this.novasImgs)
          .then((response) => console.log(response));
      }

      if (Array.from(this.novosBgs.entries()).length > 0) {
        api
          .patch("/paginainicio/1/", this.novosBgs)
          .then((response) => console.log(response));
      }

      window.alert("Página atualizada com sucesso!");
    },
  },
  created() {
    this.getPagInicio();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets-admin/style/scss/style.scss";
</style>
