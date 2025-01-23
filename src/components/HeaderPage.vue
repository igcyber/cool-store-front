<template>
    <!-- Navbar Start -->
    <div class="container-fluid">
        <div class="row border-top px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <a class="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style="height: 65px; margin-top: -1px; padding: 0 30px;">
                    <h6 class="m-0">Kategori Produk</h6>
                    <i class="fa fa-angle-down text-dark"></i>
                </a>
                <nav class="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light" id="navbar-vertical" style="width: calc(100% - 30px); z-index: 1;">
                    <div class="navbar-nav w-100 overflow-hidden" style="height: 410px">
                         <!-- iterasi kategori -->
                        <div v-for="category in categories" :key="category.id" class="nav-item">
                            <!-- jika memiliki subkategori -->
                            <div v-if="category.sub_categories.length > 0"  class="dropdown">
                                <a class="nav-link" data-toggle="dropdown">
                                    {{ category.name }}
                                    <i class="fa fa-angle-down float-right mt-1"></i>
                                </a>
                                <div class="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                    <router-link v-for="sub in category.sub_categories" :key="sub.id" :to="{name: 'detail_subcategory', params:{slug: sub.slug}}" class="dropdown-item">{{ sub.name }}</router-link>
                                </div>
                            </div>

                            <!-- jika tidak memiliki subkategori -->
                            <router-link v-else :to="{name: 'detail_category', params:{slug: category.slug}}" class="nav-link">
                                {{ category.name }}
                            </router-link>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="col-lg-9">
                <NavComponent/>
            </div>
        </div>
    </div>
    <!-- Navbar End -->

    <!-- Page Header Start -->
    <div class="container-fluid bg-secondary mb-5">
        <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 300px">
            <h1 class="font-weight-semi-bold text-uppercase mb-3">Our Shop</h1>
            <div class="d-inline-flex">
                <p class="m-0"><a href="">Home</a></p>
                <p class="m-0 px-2">-</p>
                <p class="m-0">Shop</p>
            </div>
        </div>
    </div>
<!-- Page Header End -->
</template>
<script>
import {computed, onMounted} from 'vue';
import {useStore} from 'vuex';
import NavComponent from "./Nav.vue";
export default{
    name: 'HeaderPageComponent',
    components : {
        NavComponent
    },
    setup(){
        //store vuex
        const store = useStore();

        //panggil action getCategories dari module store category
        onMounted(() => {
            store.dispatch('category/getCategories');
        })

        //simpan dan dapatkan data dari getCategories
        const categories = computed( ()=> store.state.category.categories )

        return {
            categories,
        }
    }
}
</script>