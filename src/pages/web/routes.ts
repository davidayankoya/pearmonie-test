import React from "react";
const Login = React.lazy(() => import('./login'));
const Dashboard = React.lazy(() => import('./dashboard'));

const routes = [
    {
        auth: false,
        component: Dashboard,
        path: '/',
        redirect: '/login'
    },
    {
        auth: false,
        component: Login,
        path: '/login',
    },
    {
        auth: true,
        component: Dashboard,
        path: '/dashboard',
    },
]

export default routes