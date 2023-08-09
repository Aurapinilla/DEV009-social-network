// Este es el punto de entrada de tu aplicacion
import home from './components/home.js';
import login from './components/login.js';
import error from './components/error.js';
import register from './components/register.js';
import feed from './components/feed.js';

const root = document.getElementById('root');

const routes = [
  { path: '/', component: home },
  { path: '/login', component: login },
  { path: '/register', component: register },
  { path: '/feed', component: feed },
  { path: '/error', component: error },
];

const defaultRoute = '/';

function navigateTo(hash) {
  const route = routes.find((routeSearched) => routeSearched.path === hash);

  // verifica si existe la ruta y que esté importada
  if (route && route.component) {
    // history.pushState() agrega los elementos al historial? revisar doc
    // revisar diferencia con history.replaceState()
    window.history.pushState(
      {},
      route.path,
      // location.origin es la "pagina principal"
      window.location.origin + route.path,
    );
    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navigateTo));
  } else {
    navigateTo('/error');
  }
}

window.onpopstate = () => {
  // console.log('Hubo un cambio');
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
