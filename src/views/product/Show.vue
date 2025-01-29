<template>
    <HeaderPage/>
    <!-- Shop Detail Start -->
    <div class="container-fluid py-5">
        <div class="row px-xl-5">
            <div class="col-lg-5 pb-5">
                <div id="product-carousel" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner border">
                        <!-- Gambar Utama -->
                        <div class="carousel-item active">
                            <img class="w-100 h-100" :src="product.image" alt="Gambar Utama Produk">
                        </div>
                        <!-- Gambar Tambahan -->
                        <div class="carousel-item" v-for="img in product.product_images" :key="img.id">
                            <img class="w-100 h-100" :src="img.image" alt="Gambar Tambahan">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#product-carousel" data-slide="prev">
                        <i class="fa fa-2x fa-angle-left text-dark"></i>
                    </a>
                    <a class="carousel-control-next" href="#product-carousel" data-slide="next">
                        <i class="fa fa-2x fa-angle-right text-dark"></i>
                    </a>
                </div>
            </div>

            <div class="col-lg-7 pb-5">

                <h3 class="font-weight-semi-bold">{{ product.title }}</h3>
                <span v-if="product.discount > 0">
                    <h3 class="ml-2">
                        <s class="text-muted mr-2">Rp. {{ moneyFormat(product.price) }} </s>
                        <span>Rp {{ moneyFormat(calcDiscount(product)) }}</span>
                    </h3>
                </span>
                <span v-else>
                    <h3 class="ml-2">Rp {{ moneyFormat(product.price) }}</h3>
                </span>

                <p class="mb-4" v-html="product.content"></p>
                <div class="d-flex mb-3">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Ukuran :</p>
                    <div v-for="size in product?.product_sizes" :key="size.id" class="custom-control custom-radio custom-control-inline">
                        <span v-if="product?.product_sizes && product.product_sizes.length > 0 "> 
                            <input type="radio" class="custom-control-input" :id="'size-' + size.id" name="size">
                            <label class="custom-control-label" :for="'size-' + size.id">{{ size.size }}</label>
                        </span>
                    </div>
                </div>
                <div class="d-flex mb-4">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Warna :</p>
                    <div v-for="color in product.product_images" :key="color.id" class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" :id="'color-' + color.color.id" name="color">
                        <label class="custom-control-label" :for="'color-' + color.color.id">{{ color.color.name }}</label>
                    </div>
                </div>
                <div class="d-flex align-items-center mb-4 pt-2">
                    <!-- <div class="input-group quantity mr-3" style="width: 130px;">
                        <div class="input-group-btn">
                            <button class="btn btn-primary btn-minus" >
                            <i class="fa fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" class="form-control bg-secondary text-center" value="1">
                        <div class="input-group-btn">
                            <button class="btn btn-primary btn-plus">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div> -->
                    <button @click.prevent="addToCart(product.id, calcDiscount(product), product.weight)" class="btn btn-primary px-3"><i class="fa fa-shopping-cart mr-1"></i> Masukkan Keranjang</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Shop Detail End -->
</template>
<script>
    import HeaderPage from '../../components/HeaderPage.vue';
    import {computed, onMounted} from 'vue';
    import {useStore} from 'vuex';
    import {useRoute,useRouter} from 'vue-router';

    export default {
        name: 'ProductDetailComponent',
        components: {
            HeaderPage
        },
        setup() {
            //vue route
            const route = useRoute();
            //vue router
            const router = useRouter();
            //store vuex
            const store = useStore();

            //onMounted data dari module store product
            onMounted( () => {
                store.dispatch('product/getDetailProduct', route.params.slug);
            });

            //computed state dari module store product
            const product = computed( () => {
                return store.state.product.product
            });

            //function addToCart
            function addToCart(product_id, price, weight){
                //check token terlebih dahulu
                const token = store.state.auth.token;
                //jika tidak ada maka arahkan ke halaman login
                if(!token) {
                    return router.push({name: 'login'})
                }
                //panggil action addToCart dari module cart
                store.dispatch('cart/addToCart', {
                    product_id: product_id,
                    price: price,
                    weight: weight,
                    qty: 1
                })

            }

            return {
                route,
                store,
                router,
                product,
                addToCart
            }
        }
    }
</script>