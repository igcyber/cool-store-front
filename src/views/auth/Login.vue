<template>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-8 col-xl-6">
            <div class="card">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
                    class="w-100" style="border-top-left-radius: .3rem; border-top-right-radius: .3rem;"
                    alt="Sample photo">
                <div class="card-body p-4 p-md-5">
                    <div v-if="validation.message" class="mt-2 alert alert-danger">
                        {{ validation.message }}
                    </div>
                    <h3 class="mb-2 pb-0 pb-md-0 mb-md-4 px-md-2">Login Pembeli</h3>
                    <form class="px-md-1" @submit.prevent="login">
                        <div class="row">
                         
                            <div class="col-md-12 mb-2">
                                <div class="form-outline mb-2">
                                    <input type="email" v-model="user.email" class="form-control" placeholder="Alamat email" />
                                </div>
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>

                            <div class="col-md-12 mb-2">
                                <div class="form-outline mb-2">
                                    <input type="password" v-model="user.password" class="form-control" placeholder="Password" />
                                </div>
                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{ validation.password[0] }}
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-sm btn-success btn-lg mb-1 rounded">
                            <i class="fas fa-sign-in-alt"></i>
                            Login
                        </button>

                    </form>

                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import {ref, reactive} from 'vue';
    import {useStore} from 'vuex';
    import {useRouter} from 'vue-router';
    export default {
        name: 'LoginComponent',
        setup(){
            const user = reactive({
                email: '',
                password: ''
            })

            //validation state
            const validation = ref([])

            //store vuex
            const store = useStore()

            //route
            const router = useRouter()

            function login(){
                let email = user.email;
                let password = user.password;

                //panggil action 'login' dari module auth 
                store.dispatch('auth/login', {
                    email,
                    password
                })
                .then(() => {
                    router.push({name: 'dashboard'})
                })
                .catch(error => {
                    validation.value = error
                })
            }

            return {
                user,
                validation,
                login
            }
        }
    }
</script>