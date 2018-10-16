import Vue from 'vue'; 
import VueRouter from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2';
import router from './router';
import App from './components/App';

Vue.use(VueRouter);
Vue.use(VueSweetalert2);

new Vue({
  el: 'app',
  router,
  components: { App }
})
