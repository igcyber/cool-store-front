<template>
    <!-- Category Top Start -->
    <Category/>

    <!-- Featured Start -->
    <Featured/>

    <!-- Categories Body -->
    <CategoryBody/>

    <!-- Offer Start -->
    <Offer/>

    <!-- Trend Products Start -->
    <TrendProduct/>

</template>

<script>
    import Category from "../../components/Category.vue";
    import Featured from "../../components/home/Featured.vue";
    import CategoryBody from "../../components/home/CategoryBody.vue";
    import Offer from "../../components/home/Offer.vue";
    import TrendProduct from "../../components/home/TrendProduct.vue";
    export default{
        name: 'HomeComponent',
        components: {
            Category,
            Featured,
            CategoryBody,
            Offer,
            TrendProduct,
        }

    }
</script>