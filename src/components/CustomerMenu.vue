<template>
   <div class="col-lg-3 d-none d-lg-block mt-3">
        <h5 class="font-weight-bold">MAIN MENU</h5>
        <hr>
        <ul class="list-group">
            <router-link :to="{name: 'dashboard'}" class="list-group-item text-decoration-none">
                <i class="fas fa-tachometer-alt"></i> Dashboard
            </router-link>
            <router-link :to="{name: 'order'}" class="list-group-item text-decoration-none"><i class="fas fa-shopping-cart"></i> My Order</router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'CustomerMenuComponent'
    }
</script>