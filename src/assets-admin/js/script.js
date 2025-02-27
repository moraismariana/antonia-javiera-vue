import initListSizeStyle from "./modules/list-size-style.js";
import initIsLogged from "./modules/is-logged.js";
import initLogin from "./modules/login.js";
import initLogout from "./modules/logout.js";
import initGetObjectsAPI from "./modules/get-objects-api.js";
import initCreateObjectsAPI from "./modules/create-objects-api.js";
import initUpdateObjectsAPI from "./modules/update-objects-api.js";
import initDeleteObjectsAPI from "./modules/delete-objects-api.js";
import initHasFileInput from "./modules/has-file-input.js";
import initGetEstatisticas from "./modules/get-estatisticas.js";
import initPatchCms from "./modules/patch-cms.js";
import initLinkExternoCMS from "./modules/link-externo-cms.js";

initGetObjectsAPI();

initCreateObjectsAPI();
initUpdateObjectsAPI();
initDeleteObjectsAPI();
initListSizeStyle();
initIsLogged();
initLogin();
initLogout();
initHasFileInput();
initGetEstatisticas();
initPatchCms();
initLinkExternoCMS();
