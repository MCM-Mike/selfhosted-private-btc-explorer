import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard';
import Transaction from "@/views/Transaction";
import BlockDetails from "@/views/BlockDetails";
import Blocks from "@/views/Blocks";
import AddressDetails from "@/views/AddressDetails";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        alias: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/transactions/:id',
        name: 'Transaction details',
        component: Transaction
    },
    {
        path: '/blocks/:id',
        name: 'Block details',
        component: BlockDetails
    },
    {
        path: '/blocks',
        name: 'All blocks',
        component: Blocks
    },
    {
        path: '/address/:id',
        name: 'Address details',
        component: AddressDetails
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
