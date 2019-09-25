import 'core-js/es/array';
import Vue from 'vue';
import App from './containers/App.vue';

import './styles.styl';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

new Vue({
  render: h => h(App)
}).$mount('#app');
