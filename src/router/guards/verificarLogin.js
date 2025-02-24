// Função para verificar se usuário está logado e/ou tem permissão para entrar nas rotas de admin

import apiToken from "@/axios/index.js";

const verificarLogin = async (to, from, next) => {
  // Torne-a assíncrona para usar await
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const userGroups = localStorage.getItem("userGroups");

  if (!accessToken) {
    alert("Faça o login para acessar o Painel de Administração.");
    return next({ name: "AdminLogin" });
  }

  if (!userGroups || !JSON.parse(userGroups).includes("Admin Javiera")) {
    alert("Você não tem permissão para acessar o Painel de Administração");
    return next("/");
  }

  // Função para decodificar JWT (decodificação básica, sem verificação de assinatura no frontend)
  const decodeJWT = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null; // Token é inválido ou não pode ser decodificado
    }
  };

  const decodedAccessToken = decodeJWT(accessToken);

  if (decodedAccessToken && decodedAccessToken.exp) {
    const isExpired = decodedAccessToken.exp * 1000 < Date.now();

    if (isExpired) {
      if (refreshToken) {
        try {
          const refreshResponse = await apiToken.post("/token/refresh/", {
            refresh: refreshToken,
          });
          const newAccessToken = refreshResponse.data.access;
          localStorage.setItem("accessToken", newAccessToken);
          // Token refreshed com sucesso, continue para a rota
          return next();
        } catch (refreshError) {
          // Refresh token falhou ou também está expirado
          console.error("Refresh de token falhou:", refreshError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userGroups"); // Limpe os dados do usuário ao deslogar
          alert(
            "Tempo de login expirado. Faça o login novamente para acessar o Painel de Administração."
          );
          return next({ name: "AdminLogin" });
        }
      } else {
        // Access token expirou, mas não há refresh token disponível
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userGroups"); // Limpe os dados do usuário ao deslogar
        alert(
          "Tempo de login expirado. Faça o login novamente para acessar o Painel de Administração."
        );
        return next({ name: "AdminLogin" });
      }
    } else {
      // Access token ainda é válido, continue para a rota
      return next();
    }
  } else {
    // Não foi possível decodificar o token ou não há claim exp, trate como inválido
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userGroups"); // Limpe os dados do usuário ao deslogar
    alert(
      "Token inválido. Faça o login novamente para acessar o Painel de Administração."
    );
    return next({ name: "AdminLogin" });
  }
};

export default verificarLogin;
