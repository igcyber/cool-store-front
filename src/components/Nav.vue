<template>
    <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
        <a href="" class="text-decoration-none d-block d-lg-none">
            <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
        </a>
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div class="navbar-nav mr-auto py-0">
                <router-link :to="{ name: 'home' }" class="nav-item nav-link" active-class="active">Beranda </router-link>
               
                <router-link :to="{ name: 'category' }" class="nav-item nav-link" :class="{ active: isCategoryActive }" >Kategori</router-link>

                <a href="" class="nav-tiem nav-link">Produk</a>

                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Transaksi</a>
                    <div class="dropdown-menu rounded-0 m-0">
                        <a href="cart.html" class="dropdown-item">Keranjang Belanja</a>
                        <a href="checkout.html" class="dropdown-item">Checkout</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
    import {computed} from 'vue';
    import {useRoute} from 'vue-router';
    export default {
        name: 'NavComponent',
        setup()
        {
            const route = useRoute();

            //cek apakah user sedang mengakses path /category || /category/:slug || /sub-category/:slug
            const isCategoryActive = computed(() => {
                return route.name === 'category' || route.name === 'detail_category' || route.name === 'detail_subcategory'
            })

            return {
                isCategoryActive
            }
        }
    }
</script>