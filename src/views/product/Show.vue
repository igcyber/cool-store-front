<template>
     <!-- Shop Detail Start -->
     <div class="container-fluid py-5">
        <div class="row px-xl-5">
            <div class="col-lg-5 pb-5">
                <div id="product-carousel" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner border">
                        <div class="carousel-item active">
                            <!-- <img class="w-100 h-100" src="img/product-1.jpg" alt="Image"> -->
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
                <h3 class="font-weight-semi-bold mb-4">Rp. {{ moneyFormat(product.price) }}</h3>
                <p class="mb-4" v-html="product.content"></p>
                <div class="d-flex mb-3">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
                    <div v-for="size in product.product_sizes" :key="size.id" class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" :id="'size-' + size.id" name="size">
                        <label class="custom-control-label" :for="'size-' + size.id">{{ size.size }}</label>
                    </div>
                </div>
                <div class="d-flex mb-4">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
                    <div v-for="color in product.product_images" :key="color.id" class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" :id="'color-' + color.color.id" name="color">
                        <label class="custom-control-label" :for="'color-' + color.color.id">{{ color.color.name }}</label>
                    </div>
                </div>
                <div class="d-flex align-items-center mb-4 pt-2">
                    <div class="input-group quantity mr-3" style="width: 130px;">
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
                    </div>
                    <button class="btn btn-primary px-3"><i class="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
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

            return {
                route,
                store,
                router,
                product
            }
        }
    }
</script>