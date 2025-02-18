import Vue from "vue";
import VueRouter from "vue-router";

import Inicio from "../views/visitante/Inicio.vue";
import Sobre from "../views/visitante/Sobre.vue";
import Conteudos from "../views/visitante/Conteudos.vue";
import Artigo from "../views/visitante/Artigo.vue";
import Contato from "../views/visitante/Contato.vue";

import Admin from "../views/admin/Admin.vue";
import AdminPainel from "../views/admin/AdminPainel.vue";
import AdminArtigo from "../views/admin/AdminArtigo.vue";
import AdminConteudos from "../views/admin/AdminConteudos.vue";
import AdminLogin from "../views/admin/AdminLogin.vue";
import AdminEstatisticas from "../views/admin/AdminEstatisticas.vue";
import AdminCMS from "../views/admin/cms/AdminCMS.vue";
import InicioCMS from "../views/admin/cms/InicioCMS.vue";
import SobreCMS from "../views/admin/cms/SobreCMS.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: Inicio,
  },
  {
    path: "/sobre",
    name: "Sobre",
    component: Sobre,
  },
  {
    path: "/conteudos",
    name: "Conteudos",
    component: Conteudos,
  },
  {
    path: "/artigo/:artigoId",
    name: "Artigo",
    component: Artigo,
    props: true,
  },
  {
    path: "/contato",
    name: "Contato",
    component: Contato,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    redirect: "/admin/painel",
    children: [
      {
        path: "painel",
        name: "AdminPainel",
        component: AdminPainel,
      },
      {
        path: "login",
        name: "AdminLogin",
        component: AdminLogin,
      },
      {
        path: "artigo/:param",
        name: "AdminArtigo",
        component: AdminArtigo,
        props: true,
      },
      {
        path: "cms",
        name: "AdminCMS",
        component: AdminCMS,
        redirect: "/admin/cms/inicio",
        children: [
          {
            path: "inicio",
            name: "InicioCMS",
            component: InicioCMS,
          },
          {
            path: "sobre",
            name: "SobreCMS",
            component: SobreCMS,
          },
        ],
      },
      {
        path: "conteudos",
        name: "AdminConteudos",
        component: AdminConteudos,
      },
      {
        path: "estatisticas",
        name: "AdminEstatisticas",
        component: AdminEstatisticas,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
