<template>
    <HeaderPage/>
    <div class="container-fluid pt-5">
        <div class="row px-xl-5 pb-3">
            <div v-for="category in categories" :key="category.id" class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
                    <img :src="category.image" alt="Category Image" style="width: 30%;">
                    <router-link :to="{name: 'detail_category', params:{slug: category.slug }}" class="font-weight-semi-bold m-0 ml-2">{{ category.name }}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import HeaderPage from "../../components/HeaderPage.vue";
    import {computed, onMounted} from 'vue';
    import {useStore} from 'vuex';
    export default {
        name: 'CategoryListComponent',
        components: {
            HeaderPage
        },
        setup(){
            //gunakan useStore dari vuex
            const store = useStore();

            //panggil action getCategories dari module store category
            onMounted(() => {
                store.dispatch('category/getCategories');
            })

            //dapatkan data dari state category di module
            const categories = computed ( ()=> store.state.category.categories)

            return {
                store,
                categories
            }
        }
    }

</script>