import {createRouter, createWebHistory} from 'vue-router';
import store from '../store/Index';

//define the routes
const routes = [
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/Register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/Login.vue')
    },
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home/Index.vue')
    },
    {
        path: '/customer/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/Dashboard.vue'),
        meta : {
            requiresAuth: true
        }
    },
    {
        path: '/customer/order',
        name: 'order',
        component: () => import('../views/order/Index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/customer/order/:snap_token',
        name: 'detail_order',
        component: () => import('../views/order/Show.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/product',
        name: 'product',
        component: () => import('../views/product/Index.vue'),
        meta: {
            title: 'Produk'
        }
    },
    {
        path: '/product/:slug',
        name: 'detail_product',
        component: () => import('../views/product/Show.vue'),
    },
    {
        path: '/category',
        name: 'category',
        component: () => import('../views/category/Index.vue'),
        meta: {
            title: 'Kategori'
        }
    },
    {
        path: '/category/:slug',
        name: 'detail_category',
        component: () => import('../views/category/Show.vue'),
    },
    {
        path: '/sub-category/:slug',
        name: 'detail_subcategory',
        component: () => import('../views/category/subcategory/Show.vue'),
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/cart/Index.vue'),
        meta: {
            requiresAuth: true
        }
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes
});

//define route for handle auth
router.beforeEach((to, from, next) =>{

    if(to.matched.some(record => record.meta.requiresAuth)){
        //cek nilai dari getters isLoggedIn di moudle/auth
        if(store.getters['auth/isLoggedIn']){
            next()
            return
        }
        next('/login')
    }else{
        next()
    }
    
})

export default router;