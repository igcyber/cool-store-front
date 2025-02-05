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

                
                <div class="card border-secondary mb-5">
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-3 pt-1">
                            <h6 class="font-weight-medium">Subtotal</h6>
                            <h6 class="font-weight-medium">Rp. {{ moneyFormat(cartTotal) }}</h6>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-medium">Ongkos Kirim ({{ cartWeight }} gram)</h6>
                            <h6 class="font-weight-medium">Rp. {{ moneyFormat(state.courier_cost) }}</h6>
                        </div>
                    </div>
                    <div class="card-footer border-secondary bg-transparent">
                        <div class="d-flex justify-content-between mt-2">
                            <h5 class="font-weight-bold">Total Akhir</h5>
                            <h5 class="font-weight-bold">Rp. {{ moneyFormat(state.grandTotal) }}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card border-secondary mb-5">
                    <div class="card-header bg-secondary border-0">
                        <h4 class="font-weight-semi-bold m-0">Rincian Pengiriman</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" class="form-control" id="nama_lengkap" placeholder="Isi nama lengkap" v-model="state.name">
                                    <div v-if="validation.name" class="mt-2 alert alert-danger">
                                        Masukkan Nama Lengkap
                                    </div>
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control" id="phone" placeholder="Isi nomor hp / WhatsApp" v-model="state.phone">
                                    <div v-if="validation.phone" class="mt-2 alert alert-danger">
                                        Masukkan No. Telp
                                    </div>
                                </div>

                                <div class="form-group">
                                    <select class="form-control" v-model="state.province_id" @change="getCities">
                                        <option value="">-- Pilih Provinsi --</option>
                                        <option v-for="province in state.provinces" :key="province.id" :value="province.province_id">
                                            {{ province.name }}
                                        </option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <select class="form-control" v-model="state.city_id" @change="getCourier">
                                        <option value="">-- Pilih Kota/Kabupaten --</option>
                                        <option v-for="city in state.cities" :key="city.id" :value="city.city_id">
                                            {{ city.name }}
                                        </option>
                                    </select>
                                </div>

                                <div class="form-group" v-if="state.courier">
                                    <label class="font-weight-bold">KURIR PENGIRIMAN</label>
                                    <br>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input select-courier" type="radio" name="courier"
                                            id="ongkos_kirim-jne" value="jne" v-model="state.courier_type" @change="getOngkir">
                                        <label class="form-check-label font-weight-bold mr-4" for="ongkos_kirim-jne">
                                            JNE</label>
                                        <input class="form-check-input select-courier" type="radio" name="courier"
                                            id="ongkos_kirim-tiki" value="tiki" v-model="state.courier_type" @change="getOngkir">
                                        <label class="form-check-label font-weight-bold mr-4"
                                            for="ongkos_kirim-jnt">TIKI</label>
                                        <input class="form-check-input select-courier" type="radio" name="courier"
                                            id="ongkos_kirim-pos" value="pos" v-model="state.courier_type" @change="getOngkir">
                                        <label class="form-check-label font-weight-bold" for="ongkos_kirim-jnt">POS</label>
                                    </div>
                                </div>

                                <div class="form-group" v-if="state.cost">
                                    <hr>
                                    <label class="font-weight-bold">SERVICE KURIR</label>
                                    <br>
                                    <div v-for="value in state.costs" :key="value.service" class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="cost" :id="value.service"
                                            :value="value.cost[0].value+'|'+value.service" v-model="state.costService"
                                            @change="getCostService">
                                        <label class="form-check-label font-weight-normal mr-5" :for="value.service">
                                            {{ value.service }} - Rp. {{ moneyFormat(value.cost[0].value) }}</label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <textarea class="form-control" id="alamat" rows="3"
                                        placeholder="Isi Alamat Lengkap&#10;&#10;Contoh: Perum. Griya Palem Indah, B-17 Jombang Jawa Timur 61419"
                                        v-model="state.address"></textarea>
                                    <div v-if="validation.address" class="mt-2 alert alert-danger">
                                        Masukkan Alamat Lengkap
                                    </div>
                                </div>

                                <button v-if="state.buttonCheckout" @click.prevent="checkout" class="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    </div>
    <!-- Cart End -->
</template>
<script>
    import { onMounted, computed, reactive } from 'vue';
    import {useStore} from 'vuex';
    import {useRouter} from 'vue-router';
    import Api from '../../api/Api';
    export default{
        name: 'CartComponent',
        setup(){
            //store vuex
            const store = useStore()

            //vue router
            const router = useRouter();

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

            //define state untuk form rincian pengiriman
            const state = reactive({
                name: '',
                phone: '',
                address: '',
                provinces: [],
                province_id: '',
                cities: [],
                city_id: '',
                courier: false,
                courier_type: '',
                cost: false,
                costs: '',
                costService: '',
                courier_cost: 0,
                courier_service: '',
                buttonCheckout: false,
                grandTotal: 0
            })

            //define state validation form
            const validation = reactive({
                name: false,
                phone: false,
                address: false 
            })

            //mounted data provinces
            const provinces = onMounted(() => {
                Api.get('/rajaongkir/provinces')
                .then(response => {
                    state.provinces = response.data.data
                })
                .catch(error => {
                    console.log(error)
                })
            })

            //function untuk mendapatkan pilihan kota berdasarkan ID Provinsi
            function getCities()
            {
                Api.get('/rajaongkir/cities', {
                    params: {
                        province_id: state.province_id
                    }
                })
                .then(response => {
                    state.cities = response.data.data
                })
                .catch(error => {
                    console.log(error)
                })
            }

            //function untuk menampilkan pilihan kurir
            function getCourier(){
                state.courier = true;
            }

            //function untuk menampilkan biaya ongkir
            function getOngkir(){
                //check berat produk
                if(cartWeight.value == 0){
                    alert('Silahkan pilih produk terlebih dahulu')
                    return
                }

                Api.post('/rajaongkir/cek-ongkir', {
                    city_destination: state.city_id,
                    weight: cartWeight.value,
                    courier: state.courier_type
                })
                .then(response => {
                    //set state cost menjadi true, untuk menampilkan pilihan biaya pengiriman
                    state.cost = true

                    //assign states costs dengan hasil response
                    state.costs = response.data.data.costs
                })
                .catch(error => {
                    console.log(error)
                })
            }

            //function untuk mendapatkan biaya ongkir dan servis kurir
            function getCostService(){
                let shipping = state.costService.split('|')

                //set state cost dan service
                state.courier_cost = shipping[0]
                state.courier_service = shipping[1] 

                //dapatkan token user
                const token = store.state.auth.token

                //cek authentication token
                Api.defaults.headers.common['Authorization'] = "Bearer " + token

                //hitung total akhir
                Api.get('cart/total-price')
                .then(response => {
                    //jumlahkan total cart dan cost pengiriman
                    state.grandTotal = parseInt(response.data.total) + parseInt(state.courier_cost)
                })

                //tampilkan tombol checkout
                state.buttonCheckout = true;
            }

            //function untuk melakukan proses checkout
            function checkout(){
                if(state.name && state.phone && state.address && cartWeight.value){
                    //define data yang akan dicheckout
                    let data = {
                        name: state.name,
                        phone: state.phone,
                        province_id: state.province_id,
                        city_id: state.city_id,
                        courier_type: state.courier_type,
                        courier_service: state.courier_service,
                        courier_cost: state.courier_cost,
                        weight: cartWeight.value,
                        address: state.address,
                        grandTotal: state.grandTotal
                    }

                    //jalankan action checkout di module store ny cart
                    store.dispatch('cart/checkout', data)
                        .then(response => {
                            //jika berhasil arahkan ke detail order dengan snap_token midtrans
                            router.push({
                                name: 'detail_order',
                                params: {
                                    snap_token: response[0].snap_token
                                }
                            })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }

                //check validasi name, phone, address
                if(!state.name){
                    validation.name = true
                }
                if(!state.phone){
                    validation.phone = true
                }
                if(!state.address){
                    validation.address = true
                }
            }

            return {
                carts,
                cartTotal,
                cartWeight,
                removeCart,
                state,
                validation,
                // provinces,
                getCities,
                getCourier,
                getOngkir,
                getCostService,
                checkout
            }
        }
    }
</script>