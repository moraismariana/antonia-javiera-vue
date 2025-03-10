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
      class="inicio-introducao-bg admin-cms-bg"
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
            required
          ></textarea>
        </h1>
        <p>
          <textarea
            v-model="pagInicio.textos.introducaoSubtitulo"
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
              required
            ></textarea>
          </h2>
          <div class="img-container img-mobile">
            <img
              :src="pagInicio.imagens.imagem1"
              alt="Imagem"
              class="admin-cms-img"
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
              required
            ></textarea>
          </p>
          <router-link to="/sobre">Saiba mais</router-link>
        </div>
        <div class="img-container">
          <img
            :src="pagInicio.imagens.imagem1"
            alt="Imagem"
            class="admin-cms-img"
            width="582"
            height="529"
            data-imagem="1"
            @click="armazenarImagem"
          />
        </div>
      </section>
    </div>

    <div
      class="inicio-conteudos-bg admin-cms-bg"
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
              required
            ></textarea>
          </h2>
          <p>
            <textarea
              v-model="pagInicio.textos.artigosDescricao"
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

    <componente-footer :cms="true" class="w1"></componente-footer>
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
  watch: {
    "pagInicio.textos": {
      handler: function () {
        this.ajustarAlturaTextarea();
      },
      deep: true,
    },
    "compContato.textos": {
      handler: function () {
        this.ajustarAlturaTextarea();
      },
      deep: true,
    },
  },

  methods: {
    ...mapActions(["getPagInicio"]),

    ajustarAlturaTextarea() {
      this.$nextTick(() => {
        const textareas = document.querySelectorAll("textarea");
        if (textareas.length > 0) {
          textareas.forEach((item) => {
            item.style.minHeight = "0";
            item.style.height = "1em";
            item.style.height = item.scrollHeight + "px";
          });
        }
      });
    },

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
                    `imagem${chave}-${Math.floor(Math.random() * 1000)}.webp`
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
              `bg${chave}-${Math.floor(Math.random() * 1000)}.webp`
            );
          }
        });
      }
    },

    enviarDadosParaAPI() {
      let promises = [];

      // Requisição para atualizar textos da página inicial
      promises.push(
        api
          .patch("/paginainicio/1/", this.pagInicio.textos)
          .then((response) => {
            console.log(response);
          })
          .catch(() => {
            console.log(
              "Não foi possível enviar textos para a rota /paginainicio/1/. Patch CMS."
            );
          })
      );

      // Requisição para atualizar textos do componente de contato
      promises.push(
        api
          .patch("/componentecontato/1/", this.compContato.textos)
          .then((response) => {
            console.log(response);
          })
          .catch(() => {
            console.log(
              "Não foi possível enviar textos para a rota /componentecontato/1/. Patch CMS."
            );
          })
      );

      // Requisição condicional para imagens da página inicial
      if (Array.from(this.novasImgs.entries()).length > 0) {
        promises.push(
          api
            .patch("/paginainicio/1/", this.novasImgs)
            .then((response) => console.log(response))
            .catch(() => {
              console.log(
                "Não foi possível enviar imagens para a rota /paginainicio/1/. Patch CMS."
              );
            })
        );
      }

      // Requisição condicional para backgrounds da página inicial
      if (Array.from(this.novosBgs.entries()).length > 0) {
        promises.push(
          api
            .patch("/paginainicio/1/", this.novosBgs)
            .then((response) => console.log(response))
            .catch(() => {
              console.log(
                "Não foi possível enviar backgrounds para a rota /paginainicio/1/. Patch CMS."
              );
            })
        );
      }

      Promise.all(promises)
        .then(() => {
          window.alert("Página atualizada com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao atualizar a página:", error);
        });
    },
  },
  created() {
    this.getPagInicio();
    this.ajustarAlturaTextarea();
  },
};
</script>

<!-- <style lang="scss" scoped>
@import "@/assets-admin/style/scss/style.scss";
</style> -->
