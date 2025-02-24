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

    <componente-header :header-bg="true" :cms="true"></componente-header>

    <article class="sobre-conteudo">
      <h1>
        <textarea v-model="pagSobre.textos.titulo" rows="1" required></textarea>
      </h1>
      <div class="sobre-conteudo-grid">
        <div class="sobre-conteudo-grid-img">
          <img
            :src="pagSobre.imagens.imagem1"
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
        <div>
          <p>
            <textarea
              v-model="pagSobre.textos.paragrafo1"
              rows="6"
              required
            ></textarea>
          </p>
        </div>
        <div class="sobre-conteudo-grid-img">
          <img
            :src="pagSobre.imagens.imagem2"
            alt="Violino"
            width="582"
            height="529"
            data-imagem="2"
            @click="armazenarImagem"
          />
          <input
            type="file"
            data-imagem-input="2"
            accept="image/png, image/jpeg, image/webp"
            style="display: none"
          />
        </div>
        <div>
          <p>
            <textarea
              v-model="pagSobre.textos.paragrafo2"
              rows="6"
              required
            ></textarea>
          </p>
        </div>
      </div>
    </article>

    <componente-contato :cms="true"></componente-contato>

    <componente-footer :cms="true" class="w2"></componente-footer>
  </form>
</template>

<script>
import { api } from "@/axios/index.js";
import { mapState, mapActions } from "vuex";

import ComponenteContato from "@/components/ComponenteContato.vue";
import ComponenteFooter from "@/components/ComponenteFooter.vue";
import ComponenteHeader from "@/components/ComponenteHeader.vue";

export default {
  name: "SobreCMS",
  components: {
    ComponenteHeader,
    ComponenteContato,
    ComponenteFooter,
  },
  data() {
    return {
      novasImgs: new FormData(),
    };
  },
  computed: {
    ...mapState(["pagSobre", "compContato"]),
  },
  methods: {
    ...mapActions(["getPagSobre"]),

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

    enviarDadosParaAPI() {
      api
        .patch("/paginasobre/1/", this.pagSobre.textos)
        .then((response) => {
          console.log(response);
        })
        .catch(() => {
          console.log(
            "Não foi possível enviar textos para a rota /paginasobre/1/. Patch CMS."
          );
        });
      api
        .patch("/componentecontato/1/", this.compContato.textos)
        .then((response) => {
          console.log(response);
        })
        .catch(() => {
          console.log(
            "Não foi possível enviar textos para a rota /componentecontato/1/. Patch CMS."
          );
        });

      if (Array.from(this.novasImgs.entries()).length > 0) {
        api
          .patch("/paginasobre/1/", this.novasImgs)
          .then((response) => console.log(response))
          .catch(() => {
            console.log(
              "Não foi possível enviar imagens para a rota /paginasobre/1/. Patch CMS."
            );
          });
      }

      window.alert("Página atualizada com sucesso!");
    },
  },
  created() {
    this.getPagSobre();
  },
};
</script>

<style></style>
