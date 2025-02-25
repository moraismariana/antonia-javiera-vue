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
      backgrounds: {
        bg1: "",
        bg2: "",
      },
      carregando: false,
    },
    pagSobre: {
      textos: {
        titulo: "",
        paragrafo1: "",
        paragrafo2: "",
      },
      imagens: {
        imagem1: "",
        imagem2: "",
      },
      carregando: false,
    },
    compContato: {
      textos: {
        contatoTitulo: "",
        contatoDescricao: "",
      },
      carregando: false,
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
      state.pagInicio.backgrounds.bg1 = payload.backgrounds.bg1;
      state.pagInicio.backgrounds.bg2 = payload.backgrounds.bg2;
    },
    MUDAR_PAG_SOBRE(state, payload) {
      state.pagSobre.textos.titulo = payload.textos.titulo;
      state.pagSobre.textos.paragrafo1 = payload.textos.paragrafo1;
      state.pagSobre.textos.paragrafo2 = payload.textos.paragrafo2;
      state.pagSobre.imagens.imagem1 = payload.imagens.imagem1;
      state.pagSobre.imagens.imagem2 = payload.imagens.imagem2;
    },
    MUDAR_COMP_CONTATO(state, payload) {
      state.compContato.textos.contatoTitulo = payload.textos.contatoTitulo;
      state.compContato.textos.contatoDescricao =
        payload.textos.contatoDescricao;
    },
    SET_PAG_INICIO_CARREGANDO(state, payload) {
      state.pagInicio.carregando = payload;
    },
    SET_PAG_SOBRE_CARREGANDO(state, payload) {
      state.pagSobre.carregando = payload;
    },
    SET_COMP_CONTATO_CARREGANDO(state, payload) {
      state.compContato.carregando = payload;
    },
  },
  actions: {
    getPagInicio({ commit, state }) {
      // Caso não tenha nada escrito em todos os elementos do state (isso significa menos requisicoes)
      if (
        state.pagInicio.carregando ||
        (state.pagInicio.textos.introducaoTitulo &&
          state.pagInicio.textos.introducaoSubtitulo &&
          state.pagInicio.textos.sobreTitulo &&
          state.pagInicio.textos.sobreDescricao &&
          state.pagInicio.textos.artigosTitulo &&
          state.pagInicio.textos.artigosDescricao &&
          state.pagInicio.imagens.imagem1 &&
          state.pagInicio.backgrounds.bg1 &&
          state.pagInicio.backgrounds.bg2)
      ) {
        return;
      }

      commit("SET_PAG_INICIO_CARREGANDO", true);

      api
        .get("/paginainicio/1/")
        .then((response) => {
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
              backgrounds: {
                bg1: response.data.bg1,
                bg2: response.data.bg2,
              },
            };
            commit("MUDAR_PAG_INICIO", dados);
          }
        })
        .catch((erro) => {
          console.log(erro);
          console.log("Não foi possível capturar os dados do CMS no servidor.");
        })
        .finally(() => {
          commit("SET_PAG_INICIO_CARREGANDO", false);
        });
    },
    getPagSobre({ commit, state }) {
      if (
        state.pagSobre.carregando ||
        (state.pagSobre.textos.titulo &&
          state.pagSobre.textos.paragrafo1 &&
          state.pagSobre.textos.paragrafo2 &&
          state.pagSobre.imagens.imagem1 &&
          state.pagSobre.imagens.imagem2)
      ) {
        return;
      }

      commit("SET_PAG_SOBRE_CARREGANDO", true);

      api
        .get("/paginasobre/1/")
        .then((response) => {
          if (response.status === 200) {
            let dados = {
              textos: {
                titulo: response.data.titulo,
                paragrafo1: response.data.paragrafo1,
                paragrafo2: response.data.paragrafo2,
              },
              imagens: {
                imagem1: response.data.imagem1,
                imagem2: response.data.imagem2,
              },
            };
            commit("MUDAR_PAG_SOBRE", dados);
          }
        })
        .catch((erro) => {
          console.log(erro);
          console.log("Não foi possível capturar os dados do CMS no servidor.");
        })
        .finally(() => {
          commit("SET_PAG_SOBRE_CARREGANDO", false);
        });
    },
    getCompContato({ commit, state }) {
      if (
        state.compContato.carregando ||
        (state.compContato.textos.contatoTitulo &&
          state.compContato.textos.contatoDescricao)
      ) {
        return;
      }

      commit("SET_COMP_CONTATO_CARREGANDO", true);

      api
        .get("/componentecontato/1/")
        .then((response) => {
          if (response.status === 200) {
            let dados = {
              textos: {
                contatoTitulo: response.data.contatoTitulo,
                contatoDescricao: response.data.contatoDescricao,
              },
            };
            commit("MUDAR_COMP_CONTATO", dados);
          }
        })
        .catch((erro) => {
          console.log(erro);
          console.log("Não foi possível capturar os dados do CMS no servidor.");
        })
        .finally(() => {
          commit("SET_COMP_CONTATO_CARREGANDO", false);
        });
    },
  },
  modules: {},
});
