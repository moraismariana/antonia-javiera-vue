import Vue from "vue";
import VueRouter from "vue-router";
import Inicio from "../views/Inicio.vue";
import Sobre from "../views/Sobre.vue";
import Conteudos from "../views/Conteudos.vue";
import Artigo from "../views/Artigo.vue";
import Contato from "../views/Contato.vue";

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
    path: "/artigo",
    name: "Artigo",
    component: Artigo,
  },
  {
    path: "/contato",
    name: "Contato",
    component: Contato,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
