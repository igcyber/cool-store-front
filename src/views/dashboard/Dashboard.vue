<template>
    <div class="container-fluid mb-5">
        <div class="row border-top px-xl-5">
            <CustomerMenu/>

            <div class="col-lg-9 mt-3">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h5 class="font-weight-medium"> <i class="fas fa-tachometer-alt"></i> DASHBOARD</h5>
                        <hr>
                        Selamat Datang <strong>{{ user.name }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CustomerMenu from "../../components/CustomerMenu.vue";
    import {computed, onMounted, reactive} from 'vue'
    import {useStore} from 'vuex'
    export default {
        name: 'DashboardComponent',

        components :{
            CustomerMenu
        },

        setup(){
            //store vuex
            const store = useStore()

            //mounted
            onMounted(() => {
                //panggil acion getUser dari module auth
                store.dispatch('auth/getUser')
            })

            //computed
            const user = computed(() => {
                //panggil getters dengan nama 'currentUser' dari module auth
                return store.getters['auth/currentUser']
            })

            return {
                store,
                user
            }
        }


    }
</script>