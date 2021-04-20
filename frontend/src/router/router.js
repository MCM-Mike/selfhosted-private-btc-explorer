import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        alias: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;