<template>
    <div class="container-fluid mb-5">
        <div class="row border-top px-xl-5">
            <CustomerMenu/>

            <div class="col-lg-9 mt-3">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h5 class="font-weight-bold"> <i class="fas fa-shopping-cart"></i> DETAIL ORDER</h5>
                        <hr>
                        <table class="table table-bordered">
                            <tr>
                                <td style="width: 25%">
                                    NO. INVOICE
                                </td>
                                <td style="width: 1%">:</td>
                                <td>
                                    {{ detailOrder.invoice }}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    NAMA LENGKAP
                                </td>
                                <td>:</td>
                                <td>
                                    {{ detailOrder.name }}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    NO. TELP / WA
                                </td>
                                <td>:</td>
                                <td>
                                    0{{ detailOrder.phone }}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    KURIR / SERVICE / COST
                                </td>
                                <td>:</td>
                                <td>
                                    {{ detailOrder.courier }} / {{ detailOrder.service }} / Rp.
                                    {{ moneyFormat(detailOrder.cost_courier)  }}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    ALAMAT LENGKAP
                                </td>
                                <td>:</td>
                                <td>
                                    {{ detailOrder.address }}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    TOTAL PEMBELIAN
                                </td>
                                <td>:</td>
                                <td>
                                    Rp. {{ moneyFormat(detailOrder.grand_total)  }}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    STATUS
                                </td>
                                <td>:</td>
                                <td>
                                    <button @click="payment(detailOrder.snap_token)"
                                        v-if="detailOrder.status == 'pending'" class="btn btn-primary">BAYAR SEKARANG</button>
                                    <button v-else-if="detailOrder.status == 'success'"
                                        class="btn btn-success">{{ detailOrder.status }}</button>
                                    <button v-else-if="detailOrder.status == 'expired'"
                                        class="btn btn-warning">{{ detailOrder.status }}</button>
                                    <button v-else-if="detailOrder.status == 'failed'"
                                        class="btn btn-danger">{{ detailOrder.status }}</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="card border-0 rounded shadow mt-4">
                    <div class="card-body">
                        <h5><i class="fa fa-shopping-cart"></i> DETAIL ORDER</h5>
                        <hr>
                        <table class="table"
                            style="border-style: solid !important;border-color: rgb(198, 206, 214) !important;">
                            <tbody>

                                <tr v-for="product in productInOrder" :key="product.id" style="background: #edf2f7;">
                                    <td class="b-none" width="25%">
                                        <div class="wrapper-image-cart">
                                            <img :src="product.image" style="width: 100%;border-radius: .5rem">
                                        </div>
                                    </td>
                                    <td class="b-none" width="50%">
                                        <h5><b>{{ product.product_name }}</b></h5>
                                        <table class="table-borderless" style="font-size: 14px">
                                            <tr>
                                                <td style="padding: .20rem">QTY</td>
                                                <td style="padding: .20rem">:</td>
                                                <td style="padding: .20rem"><b>{{ product.qty }}</b></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td class="b-none text-right">
                                        <p class="m-0 font-weight-bold">Rp. {{ moneyFormat(product.price) }}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CustomerMenu from '../../components/CustomerMenu.vue';
    import { computed, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';

    export default {
        name: "OrderShowComponent",
        components: {
            CustomerMenu
        },
        setup(){
            //store vuex
            const store = useStore();

            //router dan route vue-router
            const route = useRoute();
            const router = useRouter();

            //mounted
            onMounted(()=> {
                //panggil action detailOrder pada module order
                store.dispatch('order/detailOrder', route.params.snap_token)
            })

            //computed detail order
            const detailOrder = computed(() => {
                //panggil getter detailOrder pada module order
                return store.getters['order/detailOrder']
            })

            //computed product order
            const productInOrder = computed(() => {
                //panggil getter producInOrder pada module order
                return store.getters['order/productInOrder']
            })

            // function payment midtrans
            function payment(snap_token){
                window.snap.pay(snap_token, {
                    onSuccess: function(){
                        router.push({name: 'detail_order', params:{snap_token: snap_token}})
                    },
                    onPending: function(){
                        router.push({name: 'detail_order', params:{snap_token: snap_token}})
                    },
                    onError: function(){
                        router.push({name: 'detail_order', params:{snap_token: snap_token}})
                    }
                })
            }

            return {
                store,
                router,
                route,
                detailOrder,
                productInOrder,
                payment
            }
        }
    }
</script>