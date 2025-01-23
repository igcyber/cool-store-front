<template>
    <div class="container-fluid pt-5">
        <div class="text-center mb-4">
            <h2 class="section-title px-5"><span class="px-2">Just Arrived</span></h2>
        </div>
        <div class="row px-xl-5 pb-3">
            <div v-for="product in products" :key="product.id"  class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="card product-item border-0 mb-4">
                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img class="img-fluid w-100" :src="product.image" alt="">
                    </div>
                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 class="text-truncate mb-3">{{ product.title }}</h6>
                        <div class="d-flex justify-content-center">
                            <span v-if="product.discount > 0">
                                <h6 class="text-muted ml-2">
                                    <s>Rp. {{ moneyFormat(product.price) }} </s>
                                    <span class="badge rounded-pill badge-success text-white ml-1">DISKON {{ product.discount }} %</span>
                                </h6>
                                <h6>Rp {{ moneyFormat(calcDiscount(product)) }}</h6>
                            </span>
                            <span v-else>
                                <h6>Rp {{ moneyFormat(product.price) }}</h6>
                            </span>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light border">
                        <router-link :to="{name: 'detail_product', params:{slug: product.slug }}" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</router-link>
                        <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {computed, onMounted} from 'vue';
    import {useStore} from 'vuex';

    export default {
        name: 'NewProductComponent',
        setup() {
            //store vuex
            const store = useStore();

            //dapatkan data dari menjalankan action getPorducts di module product
            onMounted(() => {
                store.dispatch('product/getProducts')
            })

            //computed data yang akan digunakan
            const products = computed(() => store.state.product.products)

            return {
                store,
                products
            }
        }
    }

</script>