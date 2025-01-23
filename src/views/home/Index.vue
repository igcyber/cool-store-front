<template>
    <!-- Category Top Start -->
    <Category/>

    <!-- Trandy Product -->
    <TrandyProduct/>

    <!-- New Product -->
    <NewProduct/>

</template>

<script>
    import Category from "../../components/Category.vue";
    import TrandyProduct from "../../components/home/TrandyProduct.vue";
    import NewProduct from "../../components/home/NewProduct.vue";
    export default{
        name: 'HomeComponent',
        components: {
            Category,
            TrandyProduct,
            NewProduct
        }

    }
</script>