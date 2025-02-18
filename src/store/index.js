import Vue from "vue";
import Vuex from "vuex";

import { api } from "@/axios/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pagInicio: {
      textos: {
        introducaoTitulo: "",
        introducaoSubtitulo: "",
        sobreTitulo: "",
        sobreDescricao: "",
        artigosTitulo: "",
        artigosDescricao: "",
      },
      imagens: {
        imagem1: "",
      },
    },
    pagSobre: {
      textos: {
        titulo: "",
        paragrafo1: "",
        paragrafo2: "",
      },
    },
    compContato: {
      textos: {
        contatoTitulo: "",
        contatoDescricao: "",
      },
    },
  },
  getters: {},
  mutations: {
    MUDAR_PAG_INICIO(state, payload) {
      state.pagInicio.textos.introducaoTitulo = payload.textos.introducaoTitulo;
      state.pagInicio.textos.introducaoSubtitulo =
        payload.textos.introducaoSubtitulo;
      state.pagInicio.textos.sobreTitulo = payload.textos.sobreTitulo;
      state.pagInicio.textos.sobreDescricao = payload.textos.sobreDescricao;
      state.pagInicio.textos.artigosTitulo = payload.textos.artigosTitulo;
      state.pagInicio.textos.artigosDescricao = payload.textos.artigosDescricao;
      state.pagInicio.imagens.imagem1 = payload.imagens.imagem1;
    },
    MUDAR_COMP_CONTATO(state, payload) {
      state.compContato.textos.contatoTitulo = payload.textos.contatoTitulo;
      state.compContato.textos.contatoDescricao =
        payload.textos.contatoDescricao;
    },
  },
  actions: {
    // IMPORTANTE: NÃO HÁ CATCH PARA A REQUISIÇÃO
    getPagInicio(context) {
      api.get("/paginainicio/1/").then((response) => {
        if (response.status === 200) {
          let dados = {
            textos: {
              introducaoTitulo: response.data.introducaoTitulo,
              introducaoSubtitulo: response.data.introducaoSubtitulo,
              sobreTitulo: response.data.sobreTitulo,
              sobreDescricao: response.data.sobreDescricao,
              artigosTitulo: response.data.artigosTitulo,
              artigosDescricao: response.data.artigosDescricao,
            },
            imagens: {
              imagem1: response.data.imagem1,
            },
          };
          context.commit("MUDAR_PAG_INICIO", dados);
        }
      });
    },
    getCompContato(context) {
      api.get("/componentecontato/1/").then((response) => {
        if (response.status === 200) {
          let dados = {
            textos: {
              contatoTitulo: response.data.contatoTitulo,
              contatoDescricao: response.data.contatoDescricao,
            },
          };
          context.commit("MUDAR_COMP_CONTATO", dados);
        }
      });
    },
  },
  modules: {},
});
