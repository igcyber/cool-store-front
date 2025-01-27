<template>
    <!-- Navbar Start -->
    <div class="container-fluid">
        <div class="row border-top px-xl-5">
            <div class="col-lg-9">
                <NavComponent/>
            </div>
        </div>
    </div>
    <!-- Navbar End -->

    <!-- Page Header Start -->
    <div class="container-fluid bg-secondary mb-5">
        <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 300px">
            <h1 class="font-weight-semi-bold text-uppercase mb-3">Cool Shop</h1>
            <div class="d-inline-flex">
                <p class="m-0"><router-link :to="{name: 'home'}">Beranda</router-link></p>
                <p class="m-0 px-2">-</p>
                <p class="m-0">{{ titlePage }}</p>
            </div>
        </div>
    </div>
<!-- Page Header End -->
</template>
<script>
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import NavComponent from "./Nav.vue";
export default{
    name: 'HeaderPageComponent',
    components : {
        NavComponent
    },
    setup(){
        //use route
        const route = useRoute();
        
        //slug dari url
        const slug = route.params.slug;

        //title case slug
        const formatSlug = (slug) => {
            return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }

        //simpan nama halaman dari route yang di akses
        const titlePage = computed( ()=> 
        {
            if(route.name == 'detail_category'){
                return formatSlug(slug);
            }else if(route.name == 'detail_subcategory'){
                return formatSlug(slug);
            }
            return route.meta.title;
        })

        return {
            route,
            titlePage
        }
    }
}
</script>