import { createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import cart from '../views/cart.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/cart',
            name: 'Cart',
            component: cart
        }
    ]
})

export default router
