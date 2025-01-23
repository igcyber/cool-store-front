<template>
    <HeaderPage/>
    <div class="container-fluid pt-5">
        <div class="row px-xl-5">
            <div class="col-lg-12 col-md-12">
                <div class="row pb-3">
                    <div class="col-lg-12 pb-1">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <form action="">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search by name">
                                    <div class="input-group-append">
                                        <span class="input-group-text bg-transparent text-primary">
                                            <i class="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <!-- product -->
                    <div v-for="product in productInSubCategory" :key="product.id" class="col-lg-4 col-md-6 col-sm-12 pb-1">
                        <div class="card product-item border-0 mb-4">
                            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                <img class="img-fluid w-100" :src="product.image" alt="Product Image">
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
                                <router-link :to="{name: 'detail_product', params:{slug: product.slug}}" href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</router-link>
                                <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                            </div>
                        </div>
                    </div>

                    <!-- navigation -->
                    <NavPage/>
                </div>
            </div>
        </div>
    </div>   
</template>
<script>
    import {computed, onMounted} from 'vue';
    import {useStore} from 'vuex';
    import {useRoute} from 'vue-router';
    import HeaderPage from '../../../components/HeaderPage.vue';
    import NavPage from '../../../components/NavPage.vue';
    export default {
        name: 'SubCategoryProductComponent',
        components : {
            HeaderPage,
            NavPage,
        },
        setup(){
            //store vuex
            const store = useStore();

            //vue route
            const route = useRoute();

            //onMounted akan menjalakan action getProductInCategory di module category vuex
            onMounted(() => {
                store.dispatch('category/getProductInSubCategory', route.params.slug)
            })

            //computed properti yang digunakan untuk mendapatkan data products dari state productInSubCategory di module category vuex
            const productInSubCategory = computed(() => {
                return store.state.category.productInSubcategory
            });

            return {
                store,
                route,
                productInSubCategory
            }
        }
    }
</script>