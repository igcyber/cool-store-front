<template>
    <!-- Topbar Start -->
    <div class="container-fluid">
        <!-- <div class="row bg-secondary py-2 px-xl-5">
            <div class="col-lg-6 d-none d-lg-block">
                <div class="d-inline-flex align-items-center">
                    <a class="text-dark" href="">FAQs</a>
                    <span class="text-muted px-2">|</span>
                    <a class="text-dark" href="">Help</a>
                    <span class="text-muted px-2">|</span>
                    <a class="text-dark" href="">Support</a>
                </div>
            </div>
            <div class="col-lg-6 text-center text-lg-right">
                <div class="d-inline-flex align-items-center">
                    <a class="text-dark px-2" href="#">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a class="text-dark px-2" href="#">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a class="text-dark px-2" href="#">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a class="text-dark px-2" href="#">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a class="text-dark pl-2" href="#">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
        </div> -->
        <div class="row align-items-center py-3 px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <router-link :to="{name: 'home'}" class="text-decoration-none">
                    <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">Cool</span>Shop</h1>
                </router-link>
            </div>
            <div class="col-lg-5 col-5 text-left">
                <form action="">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for products">
                        <div class="input-group-append">
                            <span class="input-group-text bg-transparent text-primary">
                                <i class="fa fa-search"></i>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-lg-4 col-7 text-right">
                <div v-if="isLoggedIn">
                    <router-link :to="{name: 'cart'}" class="btn border ml-2">
                        <i class="fas fa-shopping-cart text-primary"></i>
                        <span class="badge">{{ cartCount }} | Rp. {{ moneyFormat(cartTotal) }}</span>
                    </router-link>
                    <router-link :to="{name: 'dashboard'}" class="btn border ml-2">
                        <i class="fa fa-tachometer-alt text-primary"></i>
                        <span class="badge">Dashboard</span>
                    </router-link>
                    <button class="btn btn-md btn-danger ml-2" @click="logout">
                        <i class="fas fa-sign-out-alt"></i>
                        Logout
                    </button>
                </div>
                <div v-else>
                    <router-link :to="{name: 'login'}" class="btn">
                        <span class="badge">Login</span>
                    </router-link>
                    <router-link :to="{name: 'register'}" class="btn">
                        <span class="badge">Register</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <!-- Topbar End -->
</template>

<script>
    import {useStore} from 'vuex';
    import { onMounted, computed } from 'vue';
    import {useRouter} from 'vue-router';
    export default{
        name: 'HeaderComponent',
        // computed: {
        //     ...mapGetters('auth', ['isLoggedIn'])
        // },
        setup(){
            const store = useStore();
            const router = useRouter();

            //computed current logged in user
            const isLoggedIn = computed(() => {
                return store.getters['auth/isLoggedIn']
            })

            //computed amount of item in cart
            const cartCount = computed(() => {
                return store.getters['cart/cartCount']
            })

            const cartTotal = computed(() => {
                return store.getters['cart/cartTotal']
            })


            onMounted(() => {
                //check state token
                const token = store.state.auth.token

                if(!token){
                    return
                }

                //saat mounted jalankan action cartCount di module cart
                store.dispatch('cart/cartCount');

                //saat mounted jalankan action cartTotal di module cart
                store.dispatch('cart/cartTotal');
            })

            function logout(){
                //panggil action "logout" di dalam module "auth"
                store.dispatch('auth/logout')  
                .then(() => {

                    //jika berhasil, akan di arahkan ke route login
                    router.push({
                        name: 'login'
                    })
                    
                })
            }

            return {
                store,
                router,
                logout,
                isLoggedIn,
                cartCount,
                cartTotal
            }
        }
       
    }
</script>