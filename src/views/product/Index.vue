<template>
    <HeaderPage/>
    <!-- Shop Start -->
    <div class="container-fluid pt-5">
        <div class="row px-xl-5">
            <!-- Shop Product Start -->
            <div class="col-lg-12 col-md-12">
                <div class="row pb-3">
                    <div class="col-12 pb-1">
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
                    <div v-for="product in products" :key="product.id"  class="col-lg-4 col-md-6 col-sm-12 pb-1">
                        <div class="card product-item border-0 mb-4">
                            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                <img class="img-fluid w-100" :src="product.image" alt="Product Image">
                            </div>
                            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                <h6 class="text-truncate mb-3">{{ product.title }}</h6>
                                <div class="d-flex justify-content-center">
                                    <span v-if="product.discount > 0">
                                        <h6 class="text-muted ml-2">
                                            <del>Rp. {{ moneyFormat(product.price) }}</del>
                                            <span class="badge rounded-pill badge-success text-white ml-1">DISKON {{ product.discount }} %</span>
                                        </h6>
                                        <h6>Rp. {{ moneyFormat(calcDiscount(product)) }}</h6>
                                    </span>
                                    <span v-else>
                                        <h6>Rp. {{ moneyFormat(product.price) }}</h6>
                                    </span>
                                </div>
                            </div>
                            <div class="card-footer d-flex justify-content-between bg-light border">
                                <router-link :to="{name: 'detail_product', params:{slug: product.slug}}" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</router-link>
                                <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Masukkan Keranjang</a>
                            </div>
                        </div>
                    </div>
                   
                    <div class="col-12 pb-1">
                        <nav aria-label="Page navigation">
                          <ul class="pagination justify-content-center mb-3">
                            <li class="page-item disabled">
                              <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                              </a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                              <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <!-- Shop Product End -->
        </div>
    </div>
    <!-- Shop End -->
</template>
<script>
    import HeaderPage from "../../components/HeaderPage.vue";
    import {computed, onMounted} from "vue";
    import {useStore} from "vuex";
    export default {
        name: "ProductComponent",
        components: {
            HeaderPage
        },
        setup(){
            //gunakan useStore dari vuex
            const store = useStore();

            //panggil action getProducts dari module store product
            onMounted( () => {
                store.dispatch('product/getProducts');
            })

            //dapatkan data dari state product di module
            const products = computed ( () => store.state.product.products);

            return {
                store,
                products
            }
        }
    }
</script>