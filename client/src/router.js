import VueRouter from 'vue-router';
import TodoComponent from './components/TodoComponent';
import SignupComponent from './components/SignupComponent';
import LoginComponent from './components/LoginComponent';

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/', name: 'Signup', component: SignupComponent
    },
    {
      path: '/login', name: 'Login', component: LoginComponent
    },
    {
      path: '/todo', name: 'TodoRoute', component: TodoComponent
    }
  ]
})