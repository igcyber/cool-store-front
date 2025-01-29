<template>
    <!-- Cart Start -->
    <div class="container-fluid pt-5">
        <div class="row px-xl-5">
            <div class="col-lg-8 table-responsive mb-5">
                <table class="table table-bordered text-center mb-0">
                    <thead class="bg-secondary text-dark">
                        <tr>
                            <th>Products</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody class="align-middle">
                        <tr v-for="cart in carts" :key="cart.id">
                            <td class="align-middle">
                                <img :src="cart.product.image" alt="" style="width: 50px;">
                                {{ cart.product.title }}
                            </td>
                            <td class="align-middle">Rp. {{ moneyFormat(calcDiscount(cart.product)) }}</td>
                            <td class="align-middle">
                                <div class="input-group quantity mx-auto" style="width: 100px;">
                                    <div class="input-group-btn">
                                        <button class="btn btn-sm btn-primary btn-minus" >
                                        <i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input type="text" class="form-control form-control-sm bg-secondary text-center" :value="cart.qty">
                                    <div class="input-group-btn">
                                        <button class="btn btn-sm btn-primary btn-plus">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td class="align-middle">Rp. {{ moneyFormat(calcDiscount(cart.product) * cart.qty) }}</td>
                            <td class="align-middle">
                                <button @click.prevent="removeCart(cart.id)" class="btn btn-sm btn-primary">
                                    <i class="fa fa-times"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-4">
                <div class="card border-secondary mb-5">
                    <div class="card-header bg-secondary border-0">
                        <h4 class="font-weight-semi-bold m-0">Ringkasan Keranjang</h4>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-3 pt-1">
                            <h6 class="font-weight-medium">Subtotal</h6>
                            <h6 class="font-weight-medium">Rp. {{ moneyFormat(cartTotal) }}</h6>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-medium">Ongkos Kirim ({{ cartWeight }} gram)</h6>
                            <h6 class="font-weight-medium">Rp. </h6>
                        </div>
                    </div>
                    <div class="card-footer border-secondary bg-transparent">
                        <div class="d-flex justify-content-between mt-2">
                            <h5 class="font-weight-bold">Total</h5>
                            <h5 class="font-weight-bold">Rp. </h5>
                        </div>
                        <button class="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Cart End -->
</template>
<script>
    import { onMounted, computed } from 'vue';
    import {useStore} from 'vuex';
    export default{
        name: 'CartComponent',
        setup(){
            //store vuex
            const store = useStore()

            //mounted cart
            onMounted(() => {
                //menjalankan beberap actions dari module cart
                store.dispatch('cart/cartCount')
                store.dispatch('cart/cartTotal')
                store.dispatch('cart/cartWeight')
            })

            //get data cart dari getters module cart
            const carts = computed(() => {
                return store.getters['cart/getCart']
            })

            //get total cart dari state cartTotal module cart
            const cartTotal = computed(() => {
                return store.state.cart.cartTotal
            })

            //get cart weight dari state cartWeight module cart
            const cartWeight = computed(() => {
                return store.state.cart.cartWeight
            })

            function removeCart(cart_id){
                store.dispatch('cart/removeCart', cart_id)
            }

            return {
                carts,
                cartTotal,
                cartWeight,
                removeCart
            }
        }
    }
</script>